var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("index nodejs phantomjs")
});

app.get('/connexion', function(req, res) {

  res.send('Connexion leboncoin avec selenium');

  let email = 'alexandre.sergent.dev@outlook.com'
  let pwd = 'password96'

});

app.listen(process.env.PORT || 5000);

console.log('App start on localhost:5000')
