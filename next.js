document.getElementById("next").addEventListener("click", function(event) {
  currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
  updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);