var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

var pets = {
  1: {
    id: 1,
    name: "Smelly Cat",
    type: "cat"
  },
  2: {
    id: 2,
    name: "Marcell",
    type: "monkey"
  }
}

var numPets = 2;

app.get("/pets", function(req,res) {
  var petArray= []
  Object.keys(pets).forEach(function(key) {
    petArray.push(pets[key]);
  })
  res.json(petArray);
});

app.post('/pet', function(req, res) {
  numPets++;
  var newPet = {
    id: numPets,
    name: req.body.name,
    type: req.body.type
  };

  pets[numPets] = newPet;
  res.json(newPet);
});

app.delete('/pet/:id', function(req,res) {
  var id = req.params.id;
  delete pets[id];
  res.json({deleted:true});
});

app.put("/pet/:id", function(req,res) {
  var id = req.params.id;
  pets[id].name = req.body.name;
  pets[id].type = req.body.type;

  res.json(pets[id]);
});

app.listen(3000);
console.log('listening on port 3000');
