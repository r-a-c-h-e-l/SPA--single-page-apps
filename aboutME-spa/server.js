var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("users.db");

var app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/check", function(req,res) {
  //grab database and send contents to client
  db.all("SELECT * FROM persons", function(err, rows) {
    if(err) { throw err; }
    console.log(rows)
    res.json(rows);
  });
});

app.post("/person", function(req,res) {
  //add new user to database
  //send back that new users info to client
  var name = req.body.name
  var hometown = req.body.hometown
  var sign = req.body.sign
  db.run("INSERT INTO persons (name, hometown, sign) VALUES (?,?,?)", name, hometown, sign, function(err) {
    if(err) { throw err ;}
    var id = this.lastID
    db.get("SELECT * FROM persons WHERE id = ?", id, function(err,row) {
      if(err) {throw err;}
      console.log(row);
      res.json(row);
    });
  });

});

app.listen(3000);
console.log("listening on port 3000!")
