// Get nickname from Leboncoin

const puppeteer = require('puppeteer');
var colors = require('colors/safe'); // does not alter string prototype

const getPseudo = (async (user, pwd, log) => {

    console.log('user:'+user+', pwd:'+pwd+', log:'+log);


    const print = async (message) => {
      log ? await console.log(message) : null;
    }
    print('### DEBUT DE LA RECUPERATION DU PSEUDO ####');

    const printSuccess = async (message) => {
      await print(colors.green(message));
    }

    const printErr = async (message) => {
      await print(colors.red(message));
    }

    // Syntactic Sugar
    const Navigate = async (url) => {
      await page.goto(url);
      await print('Navigate to: '+url);
    }

    const EnterText = async (selector, text) => {
      await page.click(selector);
      await page.keyboard.type(text);
      await print('Click selector ('+selector+') and enter text: '+text);
    }

    const WaitFor = async (selector) => {
      await page.waitForSelector(selector, { timeout: 10000 }).then(() => print('Element ('+selector+') is present'))
    }

    const ClickNavigate = async (selector, waitFor = -1) => {
      await page.click(selector);
      await print('Click on selector ('+selector+')');
    }

    const GetValue = async (selector) => {
      await print('Get value on selector ('+selector+')');

      return await page.evaluate((selector) => {
        return document.querySelector(selector).value;
      }, selector);
    };

    // Main Flow

    const C_HEADELESS = true
    const C_OPTIMIZE = true
    const C_SLOWMOTION = 0 // slow down by X ms

    const browser = await puppeteer.launch({
      headless: C_HEADELESS,
      slowMo: C_SLOWMOTION,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    page.on('error', err=> {
      console.log('error happen at the page: ', err);
    });

    page.on('pageerror', pageerr=> {
      console.log('pageerror occurred: ', pageerr);
    })

    // Creds
    const USER_EMAIL = user
    const USER_PASSWORD = pwd

    // Home Page constants
    const U_LOGIN_PAGE = 'https://www.leboncoin.fr/compte/part/mes-annonces/'
    const U_USER_PAGE = 'https://www.leboncoin.fr/compte/edit';

    // Go directly to Login Page
    await Navigate(U_LOGIN_PAGE) // USER-ACTION

    // Login Page constants
    const S_EMAIL_TEXT = 'input[name=email]'
    const S_PASSWORD_TEXT = 'input[name=password]'
    const S_SIGNIN_BUTTON = 'button[type=submit]'

    const S_RECHERCHE_TEXT = 'input[name=q]'

    const S_NICKNAME_TEXT = '#lastname'

    // Login - Step 1
    try {
      await EnterText(S_EMAIL_TEXT, USER_EMAIL); // USER-ACTION
      await EnterText(S_PASSWORD_TEXT, USER_PASSWORD); // USER-ACTION
      await ClickNavigate(S_SIGNIN_BUTTON); // USER-ACTION
    } catch(err) {
      console.log('Erreur de connexion: '+err);
      await browser.close();
      return null;
    }


    // User page - Step 2
    try {
      await WaitFor(S_RECHERCHE_TEXT);
      await Navigate(U_USER_PAGE) // USER-ACTION
    } catch(err) {
      console.log('Erreur page utilisateur: '+err);
      await browser.close();
      return null;
    }

    let nickname;
    // Get Niclkname - Step 3
    try {
      await WaitFor(S_NICKNAME_TEXT);
      nickname = await GetValue(S_NICKNAME_TEXT);
      await printSuccess(nickname);
    } catch(err) {
      await printErr('Erreur récupération pseudo: '+err);
      await browser.close();
      return null;
    }
    await setTimeout(function() {
      browser.close();
    }, 10000);

    print('### FIN DE LA RECUPERATION DU PSEUDO ####');
    print('');
    return nickname;
  });


getPseudo('alexandre.sergent.dev@outlook.com', 'password96', true);
