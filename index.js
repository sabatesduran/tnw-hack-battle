const ttn = require('ttn');
const region = 'eu';
const appId = 'bike-lights';
const accessKey = 'ttn-account-v2.plUG-8dTQ79tIV_CrQNcCzdREaav3DA3iUqWHxyhlkM';
    
const client = new ttn.Client(region, appId, accessKey);

client.on('connect', function(connack) {
    console.log('[DEBUG]', 'Connect:', connack);
});
    
client.on('error', function(err) {
    console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
    console.log('[INFO] ', 'Activation:', deviceId, data);
});

client.on('message', function(deviceId, data) {
    console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
    const payload = {
        led: true
    }
    console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
    client.send(deviceId, payload);
});

client.on('message', null, 'led', function(deviceId, led) {
  // Toggle the LED
  var payload = {
    led: !led
  };
    
  // If you don't have an encoder payload function:
  var payload = [led ? 0 : 1];
  console.log(payload);  
  console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
  client.send(deviceId, payload);
});