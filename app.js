require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");

const LANGS = [ 'af', 'sq', 'am', 'ar',  'hy',  'az', 'eu',
                'be',    'bn', 'bs', 'bg', 'ca',  'ceb', 'ny', 'zh-cn',
                'zh-tw', 'co', 'hr', 'cs', 'da',  'nl',  'en', 'eo',
                'et',    'tl', 'fi', 'fr', 'fy',  'gl',  'ka', 'de',
                'el',    'gu', 'ht', 'ha', 'haw', 'iw',  'hi', 'hmn',
                'hu',    'is', 'ig', 'id', 'ga',  'it',  'ja', 'jw',
                'kn',    'kk', 'km', 'ko', 'ku',  'ky',  'lo', 'la',
                'lv',    'lt', 'lb', 'mk', 'mg',  'ms',  'ml', 'mt',
                'mi',    'mr', 'mn', 'my', 'ne',  'no',  'ps', 'fa',
                'pl',    'pt', 'pa', 'ro', 'ru',  'sm',  'gd', 'sr',
                'st',    'sn', 'sd', 'si', 'sk',  'sl',  'so', 'es',
                'su',    'sw', 'sv', 'tg', 'ta',  'te',  'th', 'tr',
                'uk',    'ur', 'uz', 'vi', 'cy',  'xh',  'yi', 'zu' ];
const app = express();
const port = process.env.PORT || 3000;
const numTranslations = 10;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// Allow CORS from any origin
app.use(cors());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

// Main route
app.get("/api/search", async (req, res) => {
  try {
    var s = req.query.q;
    var i = 0;
    for (i=0;i<numTranslations;i++) {
      var lang = (i == numTranslations-1) ? 'en' : LANGS[Math.floor(Math.random() * LANGS.length)];
      console.log('https://translation.googleapis.com/language/translate/v2?target='+lang+'&key='+process.env.GOOGLE_API_KEY+'&q='+encodeURI(s));
      var response = await fetch(
        'https://translation.googleapis.com/language/translate/v2?target='+lang+'&key='+process.env.GOOGLE_API_KEY+'&q='+encodeURI(s)
      );
      var json = await response.text();
      s = JSON.parse(json).data.translations[0].translatedText;
    }

    return res.json({
      success: true,
      "results": s,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));