var addAllPets= function() {
  //populates the page with all the pets in our petArray(on the server)
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/pets');
  xhr.addEventListener('load', function() {
    var pets = JSON.parse(xhr.responseText);
    pets.forEach(function(pet) {
      addPet(pet);
    });
  });

  xhr.send();
};

addAllPets();

var deletePet = function() {
  var li = this.parentNode;
  var id = li.id.substring(3); //pet1
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/pet/'+ id);
  xhr.addEventListener('load', function() {
    if(JSON.parse(xhr.responseText)['deleted'] === true) {
      li.remove();
    }
  });
  xhr.send();
};

var addPet= function(pet) {
  // create li
  var li= document.createElement('li');
  setLiToPet(li,pet);
  //grab ul. append li to ul
  var ul = document.getElementById("petsList");
  ul.appendChild(li);
};

var setLiToPet= function(li,pet) {
  li.setAttribute('id','pet' + pet.id);
  li.innerHTML = "";

  var petText = pet.name + " is a " + pet.type + " ";
  var petTextNode = document.createTextNode(petText);
  li.appendChild(petTextNode);

  var edit = document.createElement('button');
  edit.innerHTML = "edit";
  edit.addEventListener('click', function() {
    editPet(li, pet.name, pet.type);
  });

  li.appendChild(edit);

  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = "delete";
  deleteButton.addEventListener('click',deletePet);
  li.appendChild(deleteButton);
}

//toggle editing for pet

var editPet = function(li, name, type) {
  li.innerHTML = '';
  var id = li.id.substring(3); //pet3

  //pet name input text field
  var nameField = document.createElement('input');
  nameField.setAttribute('type', 'text');
  nameField.value = name;
  li.appendChild(nameField);

  //filler text
  var isA = document.createTextNode('is a');
  li.appendChild(isA);

  //pet type input text field
  var typeField = document.createElement('input');
  typeField.setAttribute('type', 'text');
  typeField.value = type;
  li.appendChild(typeField);

  //add update button
  var updateButton = document.createElement('button');
  updateButton.innerHTML = "update"
  updateButton.addEventListener('click', function() {
    var newName = nameField.value;
    var newType = typeField.value;
    updatePet(li, newName, newType);
  });
  li.appendChild(updateButton);
}

var updatePet = function(li, newName, newType) {
  var id = li.id.substring(3); // pet3
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", 'http://localhost:3000/pet/'+id);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.addEventListener('load', function() {
    var returnedPet = JSON.parse(xhr.responseText);
    setLiToPet(li, returnedPet);
  });
  var updatedPet = {name: newName, type: newType};
  xhr.send(JSON.stringify(updatedPet));
};

var addNewPetButton = document.getElementById("addNewPet");
addNewPetButton.addEventListener('click', function() {
  var newName = document.getElementById("newPetName");
  var newType = document.getElementById("newPetType");

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/pet');
  xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8")
  xhr.addEventListener('load', function() {
    var returnedPet = JSON.parse(xhr.responseText);
    addPet(returnedPet);
    newName.value = ' ';
    newType.value = ' ';
  });

  var newPet = {name: newName.value, type: newType.value};
  xhr.send(JSON.stringify(newPet));
});
