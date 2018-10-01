function AddChanges(parent, descriptionNode, bottom) {
  //Make two buttons and append them to the element clicked :Remove or edit
  //then say node.addEventListener() and have each event listener do stuff on single cl`ick...
  parent.addEventListener("mouseenter", function(event) {
    //Node information
    var eventInfo = parent.value;
    var eventDesc = descriptionNode.value;
    var time = eventInfo.substring(0, 5);
    var name = eventInfo.substring(7, eventInfo.length);
    var top = bottom - 43;
    var day = document.getElementById(top).value;

    var node = document.createElement("i");
    node.className = 'material-icons';
    var text = document.createTextNode('edit');
    node.appendChild(text);
    node.addEventListener("click", function(event) {
      //edit
      var newName = prompt("What would you like to rename your event as: ");
      if (newName !== "" && newName !== null) {
        var newDesc = prompt("What would your new description be: ");
        if (newDesc !== "" && newDesc !== null) {
          var newTime = prompt("What would your new time be: ", ":");
          while (eventTime === "" || eventTime === null) {
            eventTime = prompt("Please enter a valid hour:");
          }

          var dataString =
            "name=" + encodeURIComponent(name) +
            "&year=" + encodeURIComponent(currentMonth.getYear()) +
            "&month=" + encodeURIComponent(currentMonth.getMonth()) +
            "&day=" + encodeURIComponent(day) +
            "&time=" + encodeURIComponent(time) +
            "&newTime=" + encodeURIComponent(newTime) +
            "&newName=" + encodeURIComponent(newName) +
            "&newDesc=" + encodeURIComponent(newDesc) +
            "&description=" + encodeURIComponent(eventDesc);

          var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
          xmlHttp.open("POST", "editEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
          xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
          xmlHttp.send(dataString); // Send the data
          xmlHttp.addEventListener("load", function(event) {
            var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
            if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            } else {
              alert("Event could not be edited:  " + jsonData.message);
            }
          }, false); // Bind the callback to the load event
          updateCalendar();



        }

      }


    });
    parent.appendChild(node);
    var i = document.createElement('i');
    i.className = 'material-icons';
    var text2 = document.createTextNode('delete');
    i.appendChild(text2);

    i.addEventListener("click", function(event) {
      //remove

      var dataString =
        "name=" + encodeURIComponent(name) +
        "&year=" + encodeURIComponent(currentMonth.getYear()) +
        "&month=" + encodeURIComponent(currentMonth.getMonth()) +
        "&day=" + encodeURIComponent(day) +
        "&time=" + encodeURIComponent(time) +
        "&description=" + encodeURIComponent(eventDesc);

      var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
      xmlHttp.open("POST", "removeEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
      xmlHttp.send(dataString); // Send the data
      xmlHttp.addEventListener("load", function(event) {
        var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
        if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
        } else {
          alert("Event could not be removed:  " + jsonData.message);
        }
      }, false); // Bind the callback to the load event
      updateCalendar();

    });
    parent.appendChild(i);
    var node3 = document.createElement("i");
    node3.className = 'material-icons';
    var text3 = document.createTextNode('group');
    node3.appendChild(text3);
    node3.addEventListener("click", function(event) {
      //Invite a friend: If clicked prompt a friend to invite. Query databse to see if name exists, if it doesnt alert back user doesnt exist. If it does, create another event with same information just another user.
      //For remove edit it, must document it as intentional that users can personally edit the group event to name and description of their choice
      var friend = prompt("What is the username of the friend you would like to invite: ");

      var dataString =
        "name=" + encodeURIComponent(name) +
        "&year=" + encodeURIComponent(currentMonth.getYear()) +
        "&month=" + encodeURIComponent(currentMonth.getMonth()) +
        "&day=" + encodeURIComponent(day) +
        "&time=" + encodeURIComponent(time) +
        "&friend=" + encodeURIComponent(friend) +
        "&description=" + encodeURIComponent(eventDesc);

      var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
      xmlHttp.open("POST", "inviteFriend.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
      xmlHttp.send(dataString); // Send the data
      xmlHttp.addEventListener("load", function(event) {
        var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
        if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
          alert("Friend invited:  " + jsonData.message);

        } else {
          alert("Friend could not be invited:  " + jsonData.message);
        }
      }, false); // Bind the callback to the load event


    });
    parent.appendChild(node3);

  });

  parent.addEventListener("mouseleave", function(event) {
    $('.material-icons').remove();


  });
}