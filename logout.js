function logout() {
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("GET", "logout.php", false);
  xmlHttp.send();
  $('#login').show();
  updateCalendar();


}

document.getElementById("logout").addEventListener("click", logout, false);