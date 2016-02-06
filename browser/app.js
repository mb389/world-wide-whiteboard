// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
    whiteboard.on('draw', function(start, end, color, broadcast) {
      //console.log(start, end, color, broadcast);
      socket.emit('drawingEvent', start, end, color, broadcast);
   });
      socket.on('drawn',function(start,end,color,broadcast) {
            whiteboard.draw(start,end,color,broadcast);
      })

});
