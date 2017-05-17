const messagebird = require('messagebird')('KPfhxZCHW043sIQP8qa6ygYsa');

class MessageAPI {
  constructor() {
    this.messagebird = messagebird;
  }

  sendSMS(phone, message, cb) {
    this.messagebird.messages.create({ 'originator': 'BikeDrunk' , 'recipients': [ phone ], 'body': message}, cb);
  }

  printBalance() {
    this.messagebird.balance.read((err, data) => {
      if (err) {
        return console.log(err);
      }
      console.log('Remaining credit: ' + data.amount + ' ' + data.type);
    });
  }
}

module.exports = MessageAPI;

