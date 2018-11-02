module.exports = ({ message, lineLength }) => {
  if(message.length > lineLength) {
    return message.match(new RegExp('.{1,' + lineLength + '}', 'g'));
  } else {
    return message;
  }
};
