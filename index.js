var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("Page daccueil du serveur Nodejs Leboncoin++.<hr><a href=\"/connexion\">connexion</a>")
});

app.get('/users', function(req, res) {
  res.send('Connexion leboncoin');

  let email = 'alexandre.sergent.dev@outlook.com'
  let pwd = 'password96'
});

app.listen(process.env.PORT || 5000);

console.log('App start on localhost:5000')
