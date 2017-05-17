/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import { sendPayload } from 'utils/api';

const ttn = require('ttn');
const _get = require('lodash/get');
const region = 'eu';
const appId = 'bike-lights';
const accessKey = 'ttn-account-v2.plUG-8dTQ79tIV_CrQNcCzdREaav3DA3iUqWHxyhlkM';
const deviceID = 'thethingsuno-didac';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor() {
        super();
        this.client = new ttn.Client(region, appId, accessKey);
        this.client.on('connect', function(connack) {
            console.log('[DEBUG]', 'Connect:', connack);
        });
    }

    render() {
        return (
            <h1>
                <button onClick={() => this.client.send(deviceID, '11')}>Click me</button>
            </h1>
        );
    }
}
