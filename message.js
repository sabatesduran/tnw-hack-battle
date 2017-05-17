const messagebird = require('messagebird')('KPfhxZCHW043sIQP8qa6ygYsa');

messagebird.balance.read((err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

const params = {
  'originator': 'BikeDrunk',
  'recipients': [
    '34615962092'
  ],
  'body': 'This is a test message.'
};

messagebird.messages.create(params, (err, response) => {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});
