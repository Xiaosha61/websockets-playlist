// Server

var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('Listening to request on port 4000...');
})

// static files 
app.use(express.static('public'));

// Socket setup
var io = socket(server) //server here is the http server that wer're going to bind to.

io.on('connection', (socket) => {
    console.log('I(server) have a ws connection with a new client, the wsID is: ', socket.id);

    socket.on('chat-message', (data)=>{
        io.sockets.emit('chat-message', data); // forward the data to all sockets(all clients that are connected to this server)
        //io.sockets will get us all connections that are bound to the server
    })
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data); 
    })
})