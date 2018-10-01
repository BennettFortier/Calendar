(function() {
  "use strict";

  /* Date.prototype.deltaDays(n)
   *
   * Returns a Date object n days in the future.
   */
  Date.prototype.deltaDays = function(n) {
    // relies on the Date object to automatically wrap between months for us
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
  };

  /* Date.prototype.getSunday()
   *
   * Returns the Sunday nearest in the past to this date (inclusive)
   */
  Date.prototype.getSunday = function() {
    return this.deltaDays(-1 * this.getDay());
  };
}());


/** Week
 *
 * Represents a week.
 *
 * Functions (Methods):
 *	.nextWeek() returns a Week object sequentially in the future
 *	.prevWeek() returns a Week object sequentially in the past
 *	.contains(date) returns true if this week's sunday is the same
 *		as date's sunday; false otherwise
 *	.getDates() returns an Array containing 7 Date objects, each representing
 *		one of the seven days in this month
 */
function Week(initial_d) {
  "use strict";

  this.sunday = initial_d.getSunday();


  this.nextWeek = function() {
    return new Week(this.sunday.deltaDays(7));
  };

  this.prevWeek = function() {
    return new Week(this.sunday.deltaDays(-7));
  };

  this.contains = function(d) {
    return (this.sunday.valueOf() === d.getSunday().valueOf());
  };

  this.getDates = function() {
    var dates = [];
    for (var i = 0; i < 7; i++) {
      dates.push(this.sunday.deltaDays(i));
    }
    return dates;
  };
}

/** Month
 *
 * Represents a month.
 *
 * Properties:
 *	.year == the year associated with the month
 *	.month == the month number (January = 0)
 *
 * Functions (Methods):
 *	.nextMonth() returns a Month object sequentially in the future
 *	.prevMonth() returns a Month object sequentially in the past
 *	.getDateObject(d) returns a Date object representing the date
 *		d in the month
 *	.getWeeks() returns an Array containing all weeks spanned by the
 *		month; the weeks are represented as Week objects
 */
function Month(year, month) {
  "use strict";

  this.year = year;
  this.month = month;
  this.getMonth = function() {
    return this.month;
  };
  this.getYear = function() {
    return this.year;
  };
  this.nextMonth = function() {
    return new Month(year + Math.floor((month + 1) / 12), (month + 1) % 12);
  };

  this.prevMonth = function() {
    return new Month(year + Math.floor((month - 1) / 12), (month + 11) % 12);
  };

  this.getDateObject = function(d) {
    return new Date(this.year, this.month, d);
  };

  this.getWeeks = function() {
    var firstDay = this.getDateObject(1);
    var lastDay = this.nextMonth().getDateObject(0);

    var weeks = [];
    var currweek = new Week(firstDay);
    weeks.push(currweek);
    while (!currweek.contains(lastDay)) {
      currweek = currweek.nextWeek();
      weeks.push(currweek);
    }

    return weeks;
  };
}

function eventOnCal(name, description, day, time) {
  this.name = name;
  this.day = day;
  this.time = time;
  this.description = description;

}

function Event(name, year, month, day, time, description) {
  this.name = name;
  this.day = day;
  this.time = time;
  this.description = description;
  this.year = year;
  this.month = month;
  this.getMonth = function() {
    return this.month;
  };
  this.getYear = function() {
    return this.year;
  };
  this.getName = function() {
    return this.name;
  };
  this.getDay = function() {
    return this.day;
  };
  this.getTime = function() {
    return this.time;
  };

  this.getDescription = function() {
    return this.description;
  };
  this.addEventToDatabase = function() {
    var dataString =
      "name=" + encodeURIComponent(this.name) +
      "&year=" + encodeURIComponent(this.year) +
      "&month=" + encodeURIComponent(this.month) +
      "&day=" + encodeURIComponent(this.day) +
      "&time=" + encodeURIComponent(this.time) +
      "&description=" + encodeURIComponent(this.description);

    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "addEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.send(dataString); // Send the data
    xmlHttp.addEventListener("load", function(event) {
      var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
      if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      } else {
        alert("Event could not be added:  " + jsonData.message);
      }
    }, false); // Bind the callback to the load event
  };
}