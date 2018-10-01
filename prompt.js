var bottoms = document.getElementsByClassName("bottomText");
var count = 0;
for (count = 0; count < bottoms.length; count++) {
  bottoms[count].addEventListener("dblclick", promptUser, false);
}

function promptUser(event) {
  var element = event.srcElement.id;
  element = element - 43;
  if (document.getElementById(element).innerHTML !== null && document.getElementById(element).innerHTML !== "") {
    var eventName = prompt("Event name:");
    if (eventName !== "" && eventName !== null) {
      var eventDescription = prompt("Event description:");
      var eventYear = currentMonth.getYear();
      var eventMonth = currentMonth.getMonth();

      text = document.getElementById(element).innerHTML;
      var eventDay = text;
      var eventTime = prompt("What time (army time) :", ":");
      while (eventTime === "" || eventTime === null) {
        eventTime = prompt("Please enter a valid hour:");
      }

      var eve = new Event(eventName, eventYear, eventMonth, eventDay, eventTime, eventDescription);
      eve.addEventToDatabase();
      updateCalendar();
    }
  }
}