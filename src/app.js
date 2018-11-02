const splitMessage = require("./splitMessage");
const SerialPort = require('serialport');
const HPGL = require('./HPGL');

const hpgl = new HPGL();
hpgl.connect();

const endOfLineChar = String.fromCharCode(3);
const lineLength = 90;

onTweetReceived = ({ name, tweet }) => {
  const message = splitMessage({ tweet, lineLength: lineLength - name.length });
  const hpglString = convertTweetToHPGL({ name, message });
};

convertTweetToHPGL = ({ name, message }) => {
  let HPGLString;
  if (typeof message === "string") {
    return `SP2;LB${name}:${endOfLineChar};SP1;LB${message}${endOfLineChar};CP;`;
  } else if (typeof message === "object") {

  }
};

