<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type= "text/css" href= "login.css">
  <title>Calender</title>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<body>
  <button id="logout" class="buttons"> Logout</button>

  <div id="login">
    <script>
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "loggedIn.php", false);
    xmlHttp.addEventListener("load", function(event) {
      var jsonData = JSON.parse(event.target.responseText);
      if (jsonData.success) {
        $('#login').show();

      } else {
        $('#login').hide();
      }
    }, false);
    xmlHttp.send();
    </script>
    <h2>
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <button id="login_button" class="buttons"> Login</button>
      <button id="register_button"class="buttons"> Register </button>
    </h2>
  </div>

  <div id="showCal">
    <header>
      <h2><p id="month"></p></h2>
      <button id="prev"class="buttons">Prevous Month</button>
      <span><button id="next"class="buttons">Next Month</button></span>
    </header>
    <table>
      <div id="topDays">
      <tr>
        <td>Sun</td>
        <td>Mon</td>
        <td>Tues</td>
        <td>Wed</td>
        <td>Thur</td>
        <td>Fri</td>
        <td>Sat</td>
      </tr>
    </div>
      <tr>
        <td><div class="topText" id="0"/></div><div class="bottomText"  value="" id="43" ></div></td>
        <td><div class="topText" id="1"/></div><div class="bottomText"  value="" id="44" ></div></td>
        <td><div class="topText" id="2"/></div><div class="bottomText"  value="" id="45" ></div></td>
        <td><div class="topText" id="3"/></div><div class="bottomText"  value="" id="46" ></div></td>
        <td><div class="topText" id="4"/></div><div class="bottomText"  value="" id="47" ></div></td>
        <td><div class="topText" id="5"/></div><div class="bottomText"  value="" id="48" ></div></td>
        <td><div class="topText" id="6"/></div><div class="bottomText"  value="" id="49" ></div></td>
      </tr>
      <tr>
        <td><div class="topText" id="7"/></div><div class="bottomText"  value="" id="50" /></div></td>
        <td><div class="topText" id="8"/></div><div class="bottomText"  value="" id="51" /></div></td>
        <td><div class="topText" id="9"/></div><div class="bottomText"  value="" id="52" /></div></td>
        <td><div class="topText" id="10"/></div><div class="bottomText"  value="" id="53" /></div></td>
        <td><div class="topText" id="11"/></div><div class="bottomText"  value="" id="54" /></div></td>
        <td><div class="topText" id="12"/></div><div class="bottomText"  value="" id="55" /></div></td>
        <td><div class="topText" id="13"/></div><div class="bottomText"  value="" id="56" /></div></td>
      </tr>
      <tr>
        <td><div class="topText" id="14"/></div><div class="bottomText"  value="" id="57" /></div></td>
        <td><div class="topText" id="15"/></div><div class="bottomText"  value="" id="58" /></div></td>
        <td><div class="topText" id="16"/></div><div class="bottomText"  value="" id="59" /></div></td>
        <td><div class="topText" id="17"/></div><div class="bottomText"  value="" id="60" /></div></td>
        <td><div class="topText" id="18"/></div><div class="bottomText"  value="" id="61" /></div></td>
        <td><div class="topText" id="19"/></div><div class="bottomText"  value="" id="62" /></div></td>
        <td><div class="topText" id="20"/></div><div class="bottomText"  value="" id="63" /></div></td>
      </tr>
      <tr>
        <td><div class="topText" id="21"/></div><div class="bottomText"  value="" id="64" /></div></td>
        <td><div class="topText" id="22"/></div><div class="bottomText"  value="" id="65" /></div></td>
        <td><div class="topText" id="23"/></div><div class="bottomText"  value="" id="66" /></div></td>
        <td><div class="topText" id="24"/></div><div class="bottomText"  value="" id="67" /></div></td>
        <td><div class="topText" id="25"/></div><div class="bottomText"  value="" id="68" /></div></td>
        <td><div class="topText" id="26"/></div><div class="bottomText"  value="" id="69" /></div></td>
        <td><div class="topText" id="27"/></div><div class="bottomText"  value="" id="70" /></div></td>
      </tr>
      <tr>
        <td><div class="topText" id="28"/></div><div class="bottomText"  value="" id="71" /></div></td>
        <td><div class="topText" id="29"/></div><div class="bottomText"  value="" id="72" /></div></td>
        <td><div class="topText" id="30"/></div><div class="bottomText"  value="" id="73" /></div></td>
        <td><div class="topText" id="31"/></div><div class="bottomText"  value="" id="74" /></div></td>
        <td><div class="topText" id="32"/></div><div class="bottomText"  value="" id="75" /></div></td>
        <td><div class="topText" id="33"/></div><div class="bottomText"  value="" id="76" /></div></td>
        <td><div class="topText" id="34"/></div><div class="bottomText"  value="" id="77" /></div></td>
      </tr>
      <tr>
        <td><div class="topText" id="35"/></div><div class="bottomText"  value="" id="78" /></div></td>
        <td><div class="topText" id="36"/></div><div class="bottomText"  value="" id="79" /></div></td>
        <td><div class="topText" id="37"/></div><div class="bottomText"  value="" id="80" /></div></td>
        <td><div class="topText" id="38"/></div><div class="bottomText"  value="" id="81" /></div></td>
        <td><div class="topText" id="39"/></div><div class="bottomText"  value="" id="82" /></div></td>
        <td><div class="topText" id="40"/></div><div class="bottomText"  value="" id="83" /></div></td>
        <td><div class="topText" id="41"/></div><div class="bottomText"  value="" id="84" /></div></td>
      </tr>
    </table>
  </div>

  <script type="text/javascript" src="next.js"></script>
  <script type="text/javascript" src="prev.js"></script>
  <script type="text/javascript" src="class.js"></script>
  <script type="text/javascript" src="login_ajax.js"></script>
  <script type="text/javascript" src="register_ajax.js"></script>
  <script type="text/javascript" src="updateCalender.js"></script>
  <script type="text/javascript" src="prompt.js"></script>
  <script type="text/javascript" src="logout.js"></script>
  <script type="text/javascript" src="eventChange.js"></script>



  <script>

  var currentMonth = new Month(2018, 2); // March 2018
  updateCalendar();


</script>
</body>



<html>
