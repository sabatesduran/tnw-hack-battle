const ttn = require('ttn');
const _get = require('lodash/get');
const REGION = 'eu';
const APP_ID = 'bike-lights';
const ACCESS_KEY = 'ttn-account-v2.plUG-8dTQ79tIV_CrQNcCzdREaav3DA3iUqWHxyhlkM';
const DEVICE_ID = 'thethingsuno-didac';

class TtnAPI {
  constructor() {
    this.client = new ttn.Client(REGION, APP_ID, ACCESS_KEY);
    this.client.on('connect', connack => console.log('[DEBUG]', 'Connect:', connack));
    this.client.on('error', err => console.error('[ERROR]', err.message));
    this.client.on('activation', (deviceId, data) => console.log('[INFO] ', 'Activation:', deviceId, data));
    this.client.on('message', (deviceId, data) => {
      // console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
      const accelerometer = _get(data, 'payload_fields.accelerometer_1');
      const x = _get(accelerometer, 'x');
      const y = _get(accelerometer, 'y');
      const z = _get(accelerometer, 'z');
      console.info('[INFO]', 'Acceleration: x = ' + x + ', y = ' + y + ', z = ' + z);
      // const payload = {
      //     led: true
      // }
      // console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
      // client.send(deviceId, payload);
    });
  }

  sendPayload(payload) {
    console.info('[INFO]', 'Sending: ', JSON.stringify(payload));
    return this.client.send(DEVICE_ID, payload);
  }
}

module.exports = TtnAPI;
