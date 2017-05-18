const ttn = require('ttn');
const _get = require('lodash/get');
const REGION = 'eu';
const APP_ID = 'bike-lights';
const ACCESS_KEY = 'ttn-account-v2.plUG-8dTQ79tIV_CrQNcCzdREaav3DA3iUqWHxyhlkM';
const DEVICE_ID = 'thethingsuno-didac';


const client = new ttn.Client(REGION, APP_ID, ACCESS_KEY);
let _this = null;

class TtnAPI {
  constructor() {
    this.nextPayload = null;
    _this = this;
    client.on('connect', function(connack) {
      console.log('[DEBUG]', 'Connect:', connack)
    });
    client.on('error', function(err) {
      console.error('[ERROR]', err.message)
    });
    client.on('activation', function(deviceId, data) {
      console.log('[INFO] ', 'Activation:', deviceId, data)
    });
    client.on('message', function(deviceId, data) {
      // console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
      const accelerometer = _get(data, 'payload_fields.accelerometer_1');
      const x = _get(accelerometer, 'x');
      const y = _get(accelerometer, 'y');
      const z = _get(accelerometer, 'z');
      console.info('[INFO]', 'Acceleration: x = ' + x + ', y = ' + y + ', z = ' + z);
      // const payload = {
      //     led: true
      // }
      if (_this.nextPayload) {
        console.log('[DEBUG]', 'Sending:', JSON.stringify(_this.nextPayload), ' to ', deviceId);
        client.send(deviceId, _this.nextPayload);
        _this.nextPayload = null;
      }
    });
  }

  sendPayload(payload) {
    console.info('[INFO]', 'Setting payload: ', JSON.stringify(payload));
    this.nextPayload = payload;
    // return client.send(DEVICE_ID, payload);
  }
}

module.exports = TtnAPI;
