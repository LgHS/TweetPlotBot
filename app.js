//tweetPlotBot

lengthOfText = 10;
totalTextSize = 0;
currentLineIncrementation = 0;

// var port = new SerialPort('/dev/ttyUSB0', {
//       baudRate: 9600,
//       dataBits: 7,
//       parity: "even",
//       stopBits: 1,
//       rtscts: true
//    });

// function sendHPGL(msg) {
//     port.write(msg);
// }

function composeTweet(name,message) {

	finalMessage = message;
	finalName = name + " ";
	totalMessageSize = finalMessage.length;
	totalNameSize = finalName.length;


	if (currentLineIncrementation > 0){
		lengthOfText -= currentLineIncrementation;
	}

	while (totalNameSize != 0){
		if(totalNameSize <= lengthOfText){
			//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalName + "$;");
			console.log(finalName)
			currentLineIncrementation = totalNameSize;
			totalNameSize = 0;
		}else{
			while (totalNameSize != 0){
				//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalName.substr(0, lengthOfText) + "$;" + "CP;");
				console.log("1 " + finalName.substr(0, lengthOfText))
				finalName = finalName.slice(lengthOfText);
				totalNameSize -= lengthOfText;

				if (totalNameSize < lengthOfText){
					//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalName + "$;");
					console.log("2 " + finalName)
					currentLineIncrementation = finalName.length;
					totalNameSize = 0;
				}
			}
		}
	}

	if (currentLineIncrementation > 0){
		lengthOfText -= currentLineIncrementation;
	}

	while (totalMessageSize != 0){
		if(totalMessageSize <= lengthOfText){
			//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalMessage + "$;");
			console.log(finalMessage)
			currentLineIncrementation = totalMessageSize;
			totalMessageSize = 0;
		}else{
			while (totalMessageSize != 0){
				//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalMessage.substr(0, lengthOfText) + "$;" + "CP;");
				console.log("1 " + finalMessage.substr(0, lengthOfText))
				finalMessage = finalMessage.slice(lengthOfText);
				totalMessageSize -= lengthOfText;

				if (totalMessageSize < lengthOfText){
					//SendHPGL("SP1;VS1;SI1,1;DT$;" + finalMessage + "$;");
					console.log("2 " + finalMessage)
					currentLineIncrementation = finalMessage.length;
					totalMessageSize = 0;
				}
			}
		}
	}
}

composeTweet("Michel", "heyyyyy")
