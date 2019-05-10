"use strict";
//var global;
var addnode = [];                                        // to add all new node into one array and send it to server
var delnode = [];
var i;

function loginForm(){
  //var usr = form.elements.namedItem("username").value;
  var username = document.getElementById("loginform").elements[0].value;
  var pass = document.getElementById("loginform").elements[1].value;         // xxxx

  window.localStorage.setItem('name', username);
   getHistory(username);
//  form.submit();
}
function signUpForm(form){
    form.submit();
  }
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");

for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    //delnode.push(document.getElementsById("myInput").value);  //xxxx
   alert("first!!");
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function addElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  addnode.push(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
 var k;
  for (k = 0; k < close.length; k++) {
    close[k].onclick = function() {
      alert("Your data will be deleted permanently!!");
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
// this function will be called after user login successfull..
function sendData(username, pass) {

   var xmlhttp = new XMLHttpRequest();
                   //  here AJAX is required to fetch data from server..
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
      //     alert("i am inside readyState");
            showLogInfo(this);            //xxxxx
       }
   };
  var parameters="username="+username[0]+"&pass="+pass;
  xmlhttp.open("POST", "/login", true);       //xxxxxxxx
  xmlhttp.send(parameters);

}

 function getHistory(user) {
   alert(user);
   var xmlhttp = new XMLHttpRequest();
   console.log("just before get history");                         //  here AJAX is required to fetch data from server..
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
        // updateList(this);
           updateList(this);            //xxxxx
       }
   };

   xmlhttp.open("POST", "http://localhost:5000/fetchnote?username="+user, true);       //xxxxxxxx
      xmlhttp.send();
}


function showLogInfo(arr){
   //var str = arr.responseText;
   console.log("from showLogInfo!!");
//  var json = JSON.parse(str);
  //if (str["status"]=="0")
  //alert("Login Successfully!!");
  //else if (json["status"]=="1")
  //alert("Login Failed");
  }




function updateList(arr) {
  var str = arr.responseText;
  var json = JSON.parse(str);
  var out = "";
  var i;
  var input;
  console.log(json.length);

  localStorage["userData"] = JSON.stringify(json);

  for(i = 0; i < json.length; i++) {

    input = json[i].usernote;
    var li = document.createElement("li");
    var t = document.createTextNode(input);

    li.appendChild(t);
    if (input === '') {
     alert("You must write something!");
   } else {
    document.getElementById("myUL").appendChild(li);
    }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);               //
  var j=0;
  for (j = 0; j < close.length; j++) {
    close[j].onclick = function() {
    alert("Your saved data will be deleted permanently!!");
     var div = this.parentElement;

      div.style.display = "none";
    }
  }
 }

}


function myFunction() {

   var json = JSON.parse(localStorage["userData"]);

    //alert("You have no previous data!!");

var p;
   for(p = 0; p < json.length; p++) {

     var input = json[p].usernote;
     var li = document.createElement("li");
     var t = document.createTextNode(input);

     li.appendChild(t);
     if (input === '') {
      alert("You must write something!");
    } else {
     document.getElementById("myUL").appendChild(li);
     }
   document.getElementById("myInput").value = "";

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);               //
   var m=0;
   for (m = 0; m < close.length; m++) {
     close[m].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
  }
alert("You are now Loged In..");

}

function save(){
 var user = window.localStorage.getItem('name');
 alert(user);

//  here AJAX is required to fetch data from server..
for(var p=0; p<addnode.length ; p++)
 {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     // updateList(this);
      console.log(this.responseText);
      alert("Saved Successfully to our server!!");            //xxxxx
    }
};
   xmlhttp.open("POST", "http://localhost:5000/update?user="+user+"&node="+addnode[p], true);       //xxxxxxxx
   xmlhttp.send();

 }
}
