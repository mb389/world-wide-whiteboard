var path = require('path');

var http = require('http');
var server = http.createServer();
var socketio = require('socket.io');
//var whiteboard = require('./browser/whiteboard');
var express = require('express');
var app = express();

server.on('request', app);
var io = socketio(server);

server.listen(1337, function() {
   console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function(socket) {
   /* This function receives the newly connected socket.
      This function will be called for EACH browser that connects to our server. */
   console.log('A new client has connected!');
   console.log(socket.id);

   socket.on('disconnect', function(socket) {

      console.log(socket + " has left");
   })

   socket.on('drawingEvent', function(start, end, color, broadcast) {
      console.log(start, end, color, broadcast);
      socket.broadcast.emit('drawn', start, end, color, broadcast);
   })
});
