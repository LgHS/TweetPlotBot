# TweetPlotBot

Writes tweets live on a plotter, wow such wonderful

## Set up

On a machine that talks to a Roland DXY 990
plotter on the `/dev/ttyUSB0` port :

* Install dependencies: `npm install`
* Create .env file: `cp .env.dist .env`
* Add your Twitter credentials and keywords in `.env` file

## Run 

`node src/app.js`

## HPGL Code

HPGL sent to plotter only deals with text. Positioning 
has to be done manually.

It currently works for an A4 paper sheet in portrait when 
Plotter characters are set to 0.2, 0.25. 

Executed commands :

* `VS1;` // set speed
* `SI0.2,0.25` // set text size
* `SP2;` // select second pen
* `LB@handle:{ETX}` // write twitter handle and send End of Text character (ASCII code 003)
* `SP1;` // select first pen
* `LBtwittertext` // write tweet (may be split in multiple lines)
* `CP;` // return carriage (start a new line)
