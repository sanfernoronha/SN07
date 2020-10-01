// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
//This has nothing to do with Firebase
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
