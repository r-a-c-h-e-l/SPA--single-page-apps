var checkDB = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/check');
  xhr.addEventListener('load', function() {
    var list = JSON.parse(xhr.responseText);
    console.log(list);
    if (list.length > 0) {
      list.forEach(function(user) {
        display(user);
      });
    }
  });
  xhr.send();
}
checkDB();

var display = function(user) {
  var ul = document.getElementById('personList');
  var li = document.createElement('li');
  li.setAttribute("id", user.id);
  li.innerHTML = ''

  var userText = user.name + " is from " + user.hometown + " and is a " + user.sign;
  var userTextNode = document.createTextNode(userText);
  li.appendChild(userTextNode);
  ul.appendChild(li);
}

var captureEnter = function() {
  var name = document.getElementById("name");
  var hometown = document.getElementById('hometown');
  var sign = document.getElementById('sign');
  var area = document.getElementById('inputArea');

  name.setAttribute("type", "hidden")
  hometown.setAttribute("type", "hidden");
  sign.setAttribute("type", "hidden");

  var person = {
    name: name.value,
    hometown: hometown.value,
    sign: sign.value
  }

  var body = document.querySelector("body");
  var welcome = document.createElement("h3");
  welcome.innerHTML = "You have been added to the database!"
  body.appendChild(welcome);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/person');
  xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8")
  xhr.addEventListener('load', function() {
    var newUser = JSON.parse(xhr.responseText);
    display(newUser);
  })
  xhr.send(JSON.stringify(person));
}

var enterButton = document.getElementById('enterButton')
enterButton.addEventListener('click', function () {
  captureEnter();
});
