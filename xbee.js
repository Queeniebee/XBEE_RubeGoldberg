'use strict';

var app = require('express')();
var http = require('http').Server(app);
var request = require('request');
var serialport = require('serialport');
// var XBEE = require('svd-xbee');
var socket = require('socket.io')(http);


var SerialPort = serialport.SerialPort;

var portName = process.argv[2];
// /dev/cu.usbserial-A901QOQR
// var xbee = new XBEE({ port: portName, baudrate: 9600}).init();
// 
// var journey = xbee.addNode([]);

var myPort = new SerialPort(portName, {
	baudrate: 9600,
	parser: serialport.parsers.readline('\r\n')
});

socket.on('connection', function(socket){

	console.log('a user connected');

});

// var app = express();
// var server = app.listen(8080, function(){
//   console.log('Listening on port %d', server.address().port);
// });

http.listen(8080, function(){
  console.log('Listening on port %d', http.address().port);
});

myPort.on('data', function(data){

	var serialData = data;

	if (serialData == 'X' || serialData == 'x'){
	console.log(serialData);
	socket.emit('play Journey');

	} 
});

app.get('/', function(request, response){
	myPort.write('X\r\n');
	response.sendfile('index.html');
});

