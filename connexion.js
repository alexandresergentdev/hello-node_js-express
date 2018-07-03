var args = require('system').args;
var page = require('webpage').create();

var index = 0, loadInProgress = false;

var email = args[1];
var pwd = args[2];
var url = 'https://comptepro.leboncoin.fr/account/index-pro.html'
var url2 = 'https://www.leboncoin.fr/compte/edit/'

page.viewportSize = { width: 1000, height: 1000 };

console.log("got here");
var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};


page.open(url, function(status) {
    if ( status === "success" ) {
        page.evaluate(function(email, pwd) {
              document.querySelector("input[name='st_username']").value = email;
              document.querySelector("input[name='st_passwd']").value = pwd;
              document.querySelector("#connect").submit();

              console.log("Login submitted!");
        }, email, pwd);
        window.setTimeout(function () {
          page.render('colorwheel.png');
          phantom.exit();
        }, 5000);
   }
});


page.open(url2, function(status) {
  if ( status === "success" ) {
    console.log('account');
  }
}
