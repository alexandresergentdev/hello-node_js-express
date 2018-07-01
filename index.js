var express = require('express');
var path = require('path');
var app = express();

var exec = require('child_process').exec;

app.get('/', function (req, res) {
  res.send("index nodejs phantomjs")
});

app.get('/connexion', function(req, res) {

  let email = 'alexandre.sergent.dev@outlook.com'
  let pwd = 'password96'

  res.write('Connexion '+email)

  var cmd = ['phantomjs/bin/phantomjs', 'connexion.js', email, pwd].join(' ');
  exec(cmd, function(error, stdout, stderr) {
    res.write('error', error);
    res.write('stdout', stdout);
    res.write('stderr', stderr);
  })

  res.end()

});

app.get('/snap', function (req, res, next) {

        console.log(req.query.url)

        var savePath = path.join(__dirname, 'public', 'screen') + '.png';
        var cmd = ['phantomjs/bin/phantomjs', 'generator.js', req.query.url, savePath, 700, 1].join(' ');


        exec(cmd, function (error) {
            if (error) {
                res.status(422);
                return res.json({ error: error});
                return res.json({ message: 'Something went wrong, try reloading the page' });
            }

            return res.json({ path: '/screenshots/screen'+'.png' });
        });

});

app.get('/screen', function(req, res) {

  var fs = require('fs');
  fs.readFile( __dirname + '/public/screen.png', function (err, data) {
    if (err) {
      throw err;
    }
    res.write(data);
    res.end();
  });

});


app.listen(process.env.PORT || 5000);

console.log('App start on localhost:5000')
