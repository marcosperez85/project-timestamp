// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function(req, res) {
    let tiempo =  new Date()
    res.json({"unix": tiempo.getTime(), "utc": tiempo})
});

const esFechaValida = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date?", function (req, res) {
  let ruta = req.params.date;
  let date = new Date(ruta);

  if(esFechaValida(date)) {
    date = new Date(parseInt(req.params.date))
  }

  if(esFechaValida(date)) {
    res.json({error: "Invalid Date"})
    return
  }

  res.json({"unix": date.getTime(), "utc":  date.toUTCString()})

});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// listen for requests ORIGINAL pero cambiaba de puerto en cada reinicios
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
