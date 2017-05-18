const TtnAPI = require('./webserver/ttnAPI');
const MessageAPI = require('./webserver/messageBirdAPI');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const messagebird = require('messagebird')('KPfhxZCHW043sIQP8qa6ygYsa');

let ttnApi = null;
let messageApi = null;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/webserver/index.html'));
});

app.get('/blink', function (req, res) {
  ttnApi.sendPayload([1]);
  res.sendFile(path.join(__dirname + '/webserver/index.html'));
});

app.post('/locate', function (req, res) {
  let params = {
    'originator': 'BikeDrunk',
    'recipients': [
      '31614893330'
    ],
    'body': 'Hey, don\'t forget to pick your bike at: http://maps.google.com/maps?z=12&t=m&q=loc:' + req.body.lat + '+' + req.body.lon
  };
  messagebird.messages.create(params, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log(response);
    messagebird.balance.read((err, data) => {
      if (err) {
        return console.log(err);
      }
      console.log('Remaining credit: ' + data.amount + ' ' + data.type);
    });
  });
  res.sendFile(path.join(__dirname + '/webserver/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  ttnApi = new TtnAPI();
  messageApi = new MessageAPI();
  console.log('App started. Listening on ' + port);
});
