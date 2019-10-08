// var app_firebase = {};
(function(){
  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAPP4SJfX9CU6UoEEV-Wmn9MRBt9Tg2eB0",
    authDomain: "synergy-hackathon.firebaseapp.com",
    databaseURL: "https://synergy-hackathon.firebaseio.com",
    projectId: "synergy-hackathon",
    storageBucket: "synergy-hackathon.appspot.com",
    messagingSenderId: "838393129858",
    appId: "1:838393129858:web:92409f044f6a4378"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    // app_firebase = firebase;
    document.getElementById('showyo').style.display= 'none';
    
    document.getElementById('showyo1').style.display= 'none';
  
    var getUid;
    var getEmail,getEmail1;
    count = 0; 

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser)
      {

        // var Home= document.getElementById("coffee");
        // Home.style.display="block";
        
        getUid = firebaseUser.uid;
        getEmail =firebaseUser.email;

        if(count = 0)
        {

        const usersRef = firebase.firestore().collection('authenticatedUsers').doc(getEmail)

        usersRef.get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              window.location.href="dashboard.html";
            } else {

            }
        }); 

        const usersRef1 = firebase.firestore().collection('recruiters').doc(getEmail)

        usersRef1.get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              window.location.href="rdashboard.html";
            } else {

            }
        }); 

        }
          else{}
        
      }
      else
      {
      }
    })
    
    var arr;
    $('#chumma').change(function(){
        arr = $(this).val();
        document.getElementById("phone-number").value=arr;
      console.log(arr);

      })
    // var x = document.getElementById("sign-in-form").elements.length;
    // var x1 = document.getElementById("sign-in-form").elements[0].value;
    // const otpId = document.getElementById("otpId");
    // const sendOtpButton = document.getElementById("sendOtpButton");
    // const otpVerifyButton = document.getElementById("otpVerifyButton");




    
    
    
    // Phone Verification User js start


    var mobileVerifyStatus = "Mobile number verified ✅";
    var phoneVerifyKiya;
    window.onload = function() {
      // Listening for auth state changes.
      phoneVerifyKiya = false;
      console.log("sIGNOUT K PELE phoneVerifyKiya: " + phoneVerifyKiya);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var phoneNumber = user.phoneNumber;
        }
        updateSignInButtonUI();
        updateSignInFormUI();
        // updateSignOutButtonUI();
        updateVerificationCodeFormUI();
      });
      // Event bindings.
      // document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
      document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
      document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
      document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
      document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
      document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
      // document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
      // [START appVerifier]
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });
      // [END appVerifier]
      recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
        updateSignInButtonUI();
      });
    };
    /**
     * Function called when clicking the Login/Logout button.
     */
    function onSignInSubmit() {
      if (isPhoneNumberValid()) {
        window.signingIn = true;
        updateSignInButtonUI();
        var phoneNumber = getPhoneNumberFromUserInput();
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              window.signingIn = false;
              updateSignInButtonUI();
              updateVerificationCodeFormUI();
              updateVerifyCodeButtonUI();
              updateSignInFormUI();
            }).catch(function (error) {
              // Error; SMS not sent
              console.error('Error during signInWithPhoneNumber', error);
              window.alert('Error during signInWithPhoneNumber:\n\n'
                  + error.code + '\n\n' + error.message);
              window.signingIn = false;
              updateSignInFormUI();
              updateSignInButtonUI();
            });
      }
    }
    /**
     * Function called when clicking the "Verify Code" button.
     */
    function onVerifyCodeSubmit(e) {
      e.preventDefault();
      if (!!getCodeFromUserInput()) {
        window.verifyingCode = true;
        updateVerifyCodeButtonUI();
        var code = getCodeFromUserInput();
  
        confirmationResult.confirm(code).then(function (result) {
          // User signed in successfully.
          var user = result.user;
          console.log("hmm= " +confirmationResult.verificationId);
          window.verifyingCode = false;
          window.confirmationResult = null;
          updateVerificationCodeFormUI();
          setTimeout(doSomething, 5000);
          function doSomething() {
            firebase.auth().signOut();
            alert("Your Mobile Number Verified");
            document.getElementById('sign-in-button').style.display = 'none';
            document.getElementById("khedu").innerHTML=mobileVerifyStatus;
            phoneVerifyKiya = true;
            console.log("sIGNOUT K BADD phoneVerifyKiya: " + phoneVerifyKiya);
          } 
        }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          console.error('Error while checking the verification code', error);
          window.alert('Error while checking the verification code:\n\n'
              + error.code + '\n\n' + error.message);
          window.verifyingCode = false;
          // updateSignInButtonUI();
          updateVerifyCodeButtonUI();
        });
      }
  
  
    }
    /**
     * Reads the verification code from the user input.
     */
    function getCodeFromUserInput() {
      return document.getElementById('verification-code').value;
    }
    /**
     * Reads the phone number from the user input.
     */
    function getPhoneNumberFromUserInput() {
      return document.getElementById('phone-number').value;
    }
    /**
     * Returns true if the phone number is valid.
     */
    function isPhoneNumberValid() {
      var pattern = /^\+[0-9\s\-\(\)]+$/;
      var phoneNumber = getPhoneNumberFromUserInput();
      return phoneNumber.search(pattern) !== -1;
    }
    /**
     * Re-initializes the ReCaptacha widget.
     */
    function resetReCaptcha() {
      if (typeof grecaptcha !== 'undefined'
          && typeof window.recaptchaWidgetId !== 'undefined') {
        grecaptcha.reset(window.recaptchaWidgetId);
      }
    }
    /**
     * Updates the Sign-in button state depending on ReCAptcha and form values state.
     */
    function updateSignInButtonUI() {
      document.getElementById('sign-in-button').disabled =
          !isPhoneNumberValid()
          || !!window.signingIn;
    }
    /**
     * Updates the Verify-code button state depending on form values state.
     */
    function updateVerifyCodeButtonUI() {
      document.getElementById('verify-code-button').disabled =
          !!window.verifyingCode
          || !getCodeFromUserInput();
    }
    /**
     * Updates the state of the Sign-in form.
     */
    function updateSignInFormUI() {
      if (firebase.auth().currentUser || window.confirmationResult) {
        document.getElementById('sign-in-form').style.display = 'none';
      } else {
        resetReCaptcha();
        document.getElementById('sign-in-form').style.display = 'block';
      }
    }
    /**
     * Updates the state of the Verify code form.
     */
    function updateVerificationCodeFormUI() {
      if (!firebase.auth().currentUser && window.confirmationResult) {
        document.getElementById('verification-code-form').style.display = 'block';
      } else {
        document.getElementById('verification-code-form').style.display = 'none';
      }
    }


    // Phone Verification User js ends




    
    // const userRegisterBtn = document.getElementById("userRegisterBtn");
    const userEmailVerify = document.getElementById("userEmailVerifyBtn");

    //user email verification variable
    var user;

    // const usernameId = document.getElementById("userNameId");
    // const emailId = document.getElementById("emailId");
    // const passId = document.getElementById("passId");
    // const rPassId =  document.getElementById("rPassId");
    // const locId = document.getElementById("locId");
    // const phoneId = document.getElementById("phone-number");
    // const phoneCode = document.getElementById("phone-code");
    // const cmpnName = document.getElementById("cmpnName");
    // const cmpnWeb = document.getElementById("cmpnWeb");
    // const cmpnDescription = document.getElementById("cmpnDescription");
   
    //const userLoginBtn = document.getElementById("userLoginBtn");
    //const userLogoutBtn = document.getElementById("userLogoutBtn");

    //recuriter elments from form
    const recUsernameId = document.getElementById("userNameId");
    const recEmailId = document.getElementById("emailId");
    const recPassId = document.getElementById("passId");
    const recRenPassId =  document.getElementById("rPassId");
    
    const recCompNameId = document.getElementById("recCompanyName");
   
    const recRegisterBtn = document.getElementById("recRegisterBtn");
    const recEmailVerify = document.getElementById("recEmailVerifyBtn");

    const recPhoneId = document.getElementById("phone-number");
    const phoneCode = document.getElementById("phone-code");
    const chumma = document.getElementById("chumma").value;
    var college= document.getElementById("college")
  
    // const chumma1 = document.getElementById("chumma").value;

    // var arr1;
    // $('#chumma').change(function(){
    //     arr1 = $(this).val();
    //     document.getElementById("phone-number1").value=arr1;
    //   console.log(arr1);

    //   })
    const ckb1 = document.getElementById("ckb1");

    function validatePass(pass)
    {
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(String(pass));

    }


    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
    
    userEmailVerify.addEventListener("click", e=>{

      count = 1

if(cmpnName.value.length != 0 && recEmailId.value.length != 0 && recPassId.value.length != 0 && recRenPassId.value.length != 0)
{

  if(validateEmail(recEmailId.value) == true)
  {

    if(recEmailId.value != recPassId.value)
    {
    

    if(validatePass(recPassId.value) ==  true)
    {

  
  if(recPassId.value == recRenPassId.value)
  {
    if(phoneVerifyKiya != false)
    {
      if(ckb1.checked == true)
      {
        const recEmail = recEmailId.value;
        const recPass = recPassId.value;
        const rauth = firebase.auth();
        //Signup 
  
        const signUp = rauth.createUserWithEmailAndPassword(recEmail, recPass);
        count = 1;
        signUp.catch(e => console.log(e.message));
  
        authn3();
      }
      else
      {
        alert("Please tick the terms and conditions.");
      }
      
    }
    else
    {
      alert("First Verify Your Mobile Number");
    }
  }
  else
  {
    alert("Password and re-enter password do not match.")
  }
    }
    else
    {
      alert("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:");
      

    }
  }
  else
  {
    alert("Email and password cannot be same");
  }
}
else
{
  alert("Improper Email format");
}





}
else
{
  alert("Please fill all the details.");
}


    });
          
                //Sending verification link start
    //  function authn2()
    //  {

      
    //   firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if(firebaseUser)
    //     {  getUid = firebaseUser.uid;
    //        getEmail = firebaseUser.email;

    //        //sendEmailVerification()
    //        console.log("SEND EMAIL VERIFICATION ME GHUSAAAAAAAAA");
    //        console.log(firebase.auth().currentUser);
    //        user = firebase.auth().currentUser;

    //        user.sendEmailVerification().then(function() {
    //          alert("Verification sent");
    //          console.log(user);
    //        }).catch(function(error) {
    //          alert("Error: " + error.message);
    //          console.log("SEND EMAIL VERIFICATION KA CATCH ME GHUSA:" + error.message);
    //        });
         
    //     }
    //     else
    //     {
    //       // checkSignedInWithMessage();
    //       console.log("Else of auth2");
    //     }
    //   })

    //   setTimeout(doSomething, 5000);
    //   function doSomething() {
    //     authn();
    //   } 

    //  }

    //  function authn()
    //  {
    //    firebase.auth().onAuthStateChanged(firebaseUser => {
    //      if(firebaseUser)
    //      {  getUid = firebaseUser.uid;
    //         getEmail = firebaseUser.email;
    //         console.log(firebaseUser.uid);
    //         checkSignedInWithMessage();
    //         saveMessage();
          
    //      }
    //      else
    //      {
    //        checkSignedInWithMessage();
    //        console.log("not logged in");
    //      }
    //    })
    //   //  document.getElementById('yo').style.display= 'none';
    //   var x=document.getElementById('yo');
    //   x.style.display= 'none';
    //   var y=document.getElementById('showyo');
    //   y.style.display= 'block';
    //  }
      
      
   
    // function saveMessage() {

    //   console.log("SAVE MESSAGE ME GHUSA");
    //   firebase.firestore().collection('authenticatedUsers').doc(getEmail).set({
    //     cmpnName: cmpnName.value,
    //     email: emailId.value,
    //     cmpnWeb: cmpnWeb.value,
    //     cmpnDescription: cmpnDescription.value,
    //     location: locId.value,
    //     userId: getUid,
    //     phone: phoneId.value,
    //   }).catch(function(error) {
    //     console.error('Error writing new message to Firebase Database', error);
    //   });
      
    // }




    function saveMessage1() {
      

      firebase.firestore().collection('recruiters').doc(getEmail1).set({
        company: cmpnName.value,
        email: recEmailId.value,
       college:college.value,
        userId: getUid,
        phone: recPhoneId.value,
       
      }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });

      setTimeout(doSomething, 3000);
      function doSomething() {
        firebase.auth().signOut();
        
        var x=document.getElementById('yo');
        x.style.display= 'none';
        var y=document.getElementById('showyo1');
        y.style.display= 'block';
      } 

    }

     function authn1()
     {

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser)
        {  getUid = firebaseUser.uid;
           getEmail1 = firebaseUser.email; 
           console.log(firebaseUser.uid);
           checkSignedInWithMessage();
           saveMessage1();
         
        }
        else
        {
          checkSignedInWithMessage();
          console.log("not logged in");
        }
      })

     }




    // recEmailVerify.addEventListener("click", e=>{

    //   if(recPassId.value == recRenPassId.value)
    //   {
    //     if(phoneVerifyKiya1 != false)
    //     {
    //                 //Get Email and password
    //       // TODO CHECK FOR REAL EMAIL
    //       const recEmail = recEmailId.value;
    //       const recPass = recPassId.value;
    //       const rauth = firebase.auth();
    //       //Signup

    //       const signUp = rauth.createUserWithEmailAndPassword(recEmail, recPass);
    //       signUp.catch(e => console.log(e.message));

    //       authn3();
    //     }
    //     else
    //     {
    //       alert("First Verify Your Mobile Number");
    //     }
    //   }
    //   else
    //   {
    //     alert("Password and re-enter password do not match.")
    //   }

    //  });



     function authn3()
     {

      
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser)
        {  getUid = firebaseUser.uid;
           getEmail1 = firebaseUser.email;

           //sendEmailVerification()
           console.log("SEND EMAIL VERIFICATION ME GHUSAAAAAAAAA");
           console.log(firebase.auth().currentUser);
           user = firebase.auth().currentUser;
           user.sendEmailVerification().then(function() {
             alert("Verification sent");
             console.log(user);
           }).catch(function(error) {
             alert("Error: " + error.message);
             console.log("SEND EMAIL VERIFICATION KA CATCH ME GHUSA:" + error.message);
           });

        }
        else
        {
          // checkSignedInWithMessage();
          console.log("Else of auth2");
        }
      })

      setTimeout(doSomething, 5000);
      function doSomething() {
        authn1();
      } 

     }





    function isUserSignedIn() {
      // TODO 6: Return true if a user is signed-in.
      return !!firebase.auth().currentUser;
    }
    
    function checkSignedInWithMessage() 
    {
      // Return true if the user is signed in Firebase
      if (isUserSignedIn()) {
        console.log(true);
      
      }
      else
      {
          console.log("false");
      }
    }

    
    //Add a realtime listener

})()