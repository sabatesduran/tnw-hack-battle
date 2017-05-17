const TtnAPI = require('./ttnAPI');
const MessageAPI = require('./messageBirdAPI');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

let ttnApi = null;
let messageApi = null;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/blink', function (req, res) {
  ttnApi.sendPayload('01');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/locate', function (req, res) {
  messageApi.sendSMS(
    '31614893330',
    'http://maps.google.com/maps?z=12&t=m&q=loc:' + req.body.lat + '+' + req.body.lon,
    (err, res) => {
      if (err) {
        return console.log(err);
      }
      console.log(res);
      messageApi.printBalance();
    }
  );
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  ttnApi = new TtnAPI();
  messageApi = new MessageAPI();
  console.log('App started. Listening on 3000');
});
