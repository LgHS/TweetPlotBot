//tweetPlotBot

lengthOfText = 10;
totalTextSize = 0;
currentLineIncrementation = 0;

port = new SerialPort('/dev/ttyUSB0', {
      baudRate: 9600,
      dataBits: 7,
      parity: "even",
      stopBits: 1,
      rtscts: true
    });

function composeTweet(name,message) {

	finalMessage = name + " " + message;
	totalTextSize = finalMessage.length;

	if (currentLineIncrementation > 0){
		lengthOfText -= currentLineIncrementation;
	}

	while (totalTextSize != 0){
		if(totalTextSize <= lengthOfText){
			SendHPGL("SP1;VS1;SI1,1;DT$;" + finalMessage + "$;");
			currentLineIncrementation = totalTextSize;
			totalTextSize = 0;
		}else{
			while (totalTextSize != 0){
				SendHPGL("SP1;VS1;SI1,1;DT$;" + name + " / " + finalMessage.substr(0, lengthOfText) + "$;" + "CP;");
				finalMessage.slice(lengthOfText);
				totalTextSize -= lengthOfText;

				if (totalTextSize < lengthOfText){
					SendHPGL("SP1;VS1;SI1,1;DT$;" + finalMessage + "$;");
					currentLineIncrementation = finalMessage.length;
				}
			}
		}
	}
}

function sendHPGL(msg) {
    port.write(msg);
}

showTweet("hey","hey");