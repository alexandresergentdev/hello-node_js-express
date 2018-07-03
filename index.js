const express = require('express');
const url = require('url');
const leboncoin = require('./puppeteer/leboncoin');
const app = express();

app.get('/', function(req, res) {
  res.end('index leboncoin puppeteer')
});

app.get('/connexion/', function(req, res) {

    var query = url.parse(req.url, true).query;
    let user = query.user === undefined ? 'default' : query.user;
    let pwd = query.pwd === undefined ? 'default' : query.pwd;

    leboncoin.getPseudo(user, pwd, false).then((pseudo) => {
      res.json({pseudo: pseudo});
    })
});

app.listen(process.env.PORT || 5000);

console.log('App start on localhost:5000')
