const util = require("./util");
const SerialPort = require('serialport');
const HPGL = require('./HPGL');
require('dotenv').config();

const hpgl = new HPGL();
hpgl.connect();

const endOfLineChar = String.fromCharCode(3);
const lineLength = 63; // A4 portrait
const textSize = '0.2,0.25';
const speed = 1;

onTweetReceived = ({ name, tweet }) => {
  // remove accents
  let message = util.removeDiacritics(tweet);
  // sanitize (only ascii characters)
  message = util.sanitize(message);
  // compose
  message = `${name}: ${message}`;
  // split lines
  message = util.splitMessage({ message, lineLength });

  const hpglString = convertTweetToHPGL({ name, message });
  hpgl.write(hpglString);
};

convertTweetToHPGL = ({ name, message }) => {
  // init HPGL and write name
  let HPGLString = `VS${speed};SI${textSize};SP2;LB${name}:${endOfLineChar};SP1;`;

  if (typeof message === "string") {
    // remove name from message
    message = message.slice(name.length + 2);

    HPGLString += `LB${message}${endOfLineChar};CP;`;
  } else if (typeof message === "object") {
    // remove name from message
    message[0] = message[0].slice(name.length + 2);

    message.forEach((line) => {
      HPGLString += `LB${line}${endOfLineChar};CP;`;
    });
  }

  return HPGLString;
};


const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


const stream = client.stream('statuses/filter', { track: process.env.TWITTER_KEYWORDS });
stream.on('data', function (event) {
  if (event) {
    onTweetReceived({
      name: '@' + event.user.screen_name,
      tweet: event.text,
    })
  }
  console.log('Tweet received !', '@' + event.user.screen_name, ': ', event.text);
});

stream.on('error', function (error) {
  console.error('Error from twitter:', error.toString());
});
