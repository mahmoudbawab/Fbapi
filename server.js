var express= require('express');
var app= express();
var S = require('string');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('user1', ['user1']);
app.use(bodyParser.json());
app.use(express.static(__dirname+ "/public"));
//app.get('/', function(req, res){
//	res.send("Hello world");
//});
app.get('/contactlist',function (req,res) {
   db.user.find(function (err, docs) {
	   console.log('db');
    console.log(docs);
    res.json(docs);
	console.log(res);
  });

})

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.user.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.user.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.user.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(4000);
console.log("server js here");