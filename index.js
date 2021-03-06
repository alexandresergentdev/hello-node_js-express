const express = require('express');
const url = require('url');
const leboncoin = require('./puppeteer/leboncoin');
const app = express();

const fs = require('fs');

const log4js = require('log4js');
log4js.configure({
  appenders: { puppeteer: { type: 'file', filename: 'puppeteer.log' } },
  categories: { default: { appenders: ['puppeteer'], level: 'trace' } }
});
const logger = log4js.getLogger('puppeteer');


app.get('/', function(req, res) {
  logger.trace('index');
  res.end('index leboncoin puppeteer with log4js')
});

app.get('/log', function(req, res) {
  fs.readFile('puppeteer.log', 'utf8', function(err, data) {
      if (err) throw err;
      res.end(data);
  });
});

app.get('/connexion/', function(req, res) {

    var query = url.parse(req.url, true).query;
    let user = query.user === undefined ? 'default' : query.user;
    let pwd = query.pwd === undefined ? 'default' : query.pwd;

    leboncoin.getPseudo(user, pwd, false).then((pseudo) => {
      console.log(pseudo);
      res.json({pseudo: pseudo});
    })
});

app.listen(process.env.PORT || 5000, '92.222.68.169');

console.log('App start on 92.222.68.169:5000')
