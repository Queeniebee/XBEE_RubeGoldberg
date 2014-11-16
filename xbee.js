'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var serialport = require('serialport');
var socket = require('socket.io')(http);

var SerialPort = serialport.SerialPort;

var portName = process.argv[2];
// /dev/cu.usbserial-A901QOQR

var myPort = new SerialPort(portName, {
	baudrate: 9600,
	parser: serialport.parsers.readline('\r\n')
});

socket.on('connection', function(socket){

	console.log('a user connected');

});

http.listen(8080, function(){
  console.log('Listening on port %d', http.address().port);
});

myPort.on('data', function(data){

	var serialData = data;

	if (serialData == 'X' || serialData == 'x'){
		console.log(serialData);
		socket.emit('play Journey');

		myPort.write('x\r\n');
	}

});

app.use("/", express.static(__dirname + "/public"));

app.get('/test', function(request, response){
	socket.emit('play Journey');
	response.send('ok!');
});