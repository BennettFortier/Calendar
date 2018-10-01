function updateCalendar() {
  var currMonth = currentMonth.getMonth();
  var actMonth = getMonthString(currMonth) + "   " + currentMonth.getYear();
  document.getElementById("month").innerHTML = actMonth;
  var weeks = currentMonth.getWeeks();
  var daysPage = [];
  if (weeks.length !== 0) {
    for (var w in weeks) {
      if (w !== null) {
        var days = weeks[w].getDates();
        for (var i = 0; i < days.length; i++) {
          var currDay = String(days[i]);
          var words = currDay.split(" ");
          var numb = words[2];
          daysPage.push(numb);
        }
      }

    }
    var startDay = fillDates(daysPage);
    hideDates();
    getEvents(startDay);
  }

}

function getEvents(startDay) {
  var dataString =
    "&year=" + encodeURIComponent(this.year) +
    "&month=" + encodeURIComponent(this.month);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "populateCal.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.send(dataString); // Send the data
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      var nameArray = jsonData.name;
      var descArray = jsonData.desc;
      var dateArray = jsonData.date;
      populateCal(nameArray, descArray, dateArray, startDay);

    } else {
      alert("Events could not be loaded:  " + jsonData.message);
    }
  }, false); // Bind the callback to the load event
}

function populateCal(nameArray, descArray, dateArray, startDay) {
  var acceptableDays = [];
  var eventsOnCalender = [];
  for (var x = 0; x < 42; x++) {
    acceptableDays[x] = 0;
    var lower = x + 43;
    var myNode = document.getElementById(lower);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  if (dateArray !== null) {
    for (var j = 0; j < dateArray.length; j++) {
      var str = String(dateArray[j]);
      var year = parseInt(str.substring(0, 4));
      var month = parseInt(str.substring(5, 7));
      if (year == currentMonth.getYear() && month == currentMonth.getMonth()) {
        var day = parseInt(str.substring(8, 10));
        var time = str.substring(11, 16);
        var dayMonth = day + startDay - 1; //Spot on 42 grid calender where the day is. I,E 4 = first thursday.
        var ev = new eventOnCal(nameArray[j], descArray[j], dayMonth, time);
        eventsOnCalender.push(ev);
        acceptableDays[dayMonth] = 1; //That spot should have elements in it.
        var topElement = dayMonth;
        var bottomElement = topElement + 43;
        var hoverElement = bottomElement + 42;


      }
    }
    for (var y = 0; y < eventsOnCalender.length; y++) {
      var top = eventsOnCalender[y].day;
      var bottom = top + 43;
      var tool = bottom + 42;
      var time2 = eventsOnCalender[y].time;
      var name = eventsOnCalender[y].name;
      var desc = eventsOnCalender[y].description;

      var node = document.createElement("div");
      node.className = "events";
      node.id = "event" + top;
      var node2 = document.createElement("span");
      node2.className = "tooltiptext";
      node2.id = "top" + top;
      node.innerHTML = (time2 + ": " + name);
      node.value = (time2 + ": " + name);
      node2.innerHTML = (desc);
      node2.value = desc;
      document.getElementById(bottom).appendChild(node);
      node.appendChild(node2);
      AddChanges(node, node2, bottom);
    }
  }
}


function fillDates(daysPage) {
  var counter = 0;
  var write = false;
  var firsttime = true;
  var startDay = 0;
  while (counter < daysPage.length) {
    if (daysPage[counter] == "01" && write === false) {
      write = true;
      document.getElementById(counter).value = " ";
    } else if (daysPage[counter] == "01" && write === true) {
      write = false;
    }
    if (write) {
      if (firsttime) {
        startDay = counter;
        firsttime = false;
      }
      document.getElementById(counter).value = daysPage[counter];
      document.getElementById(counter).innerHTML = daysPage[counter];

    } else if (!write) {
      document.getElementById(counter).value = "";
      document.getElementById(counter).innerHTML = "";


    }
    counter++;
  }
  return startDay;
}

function hideDates() {
  if (document.getElementById("28").innerHTML === "") {
    for (var a = 28; a < 35; a++) {
      $("#" + a).hide();
      var b = a + 43;
      $("#" + b).hide();
    }
  }
  if (document.getElementById("35").innerHTML === "") {
    for (var c = 35; c < 42; c++) {
      $("#" + c).hide();
      var d = c + 43;
      $("#" + d).hide();
    }
  }
}

function getMonthString(currMonth) {
  var actMonth = "";
  if (currMonth === 0) {
    actMonth = "January";
  }
  if (currMonth == 1) {
    actMonth = "February";
  }
  if (currMonth == 2) {
    actMonth = "March";
  }
  if (currMonth == 3) {
    actMonth = "April";
  }
  if (currMonth == 4) {
    actMonth = "May";
  }
  if (currMonth == 5) {
    actMonth = "June";
  }
  if (currMonth == 6) {
    actMonth = "July";
  }
  if (currMonth == 7) {
    actMonth = "August";
  }
  if (currMonth == 8) {
    actMonth = "September";
  }
  if (currMonth == 9) {
    actMonth = "October";
  }
  if (currMonth == 10) {
    actMonth = "November";
  }
  if (currMonth == 11) {
    actMonth = "December";
  }

  return actMonth;
}