require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
var cors = require("cors");
const fs = require('fs');

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
app.get("/", (req, res) => {
  fs.writeFileSync('data.json', "Hello");
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));