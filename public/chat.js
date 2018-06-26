// make connection

const serverURL = 'http://0d1c07c2.ngrok.io/';
// run `./ngrok http 4000` first.
// then the url should be displayed.

var socket = io.connect(serverURL); 
//localhost:4000 will not work for multiple devices


// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emit event 
btn.addEventListener('click', ()=>{
    if(message.value !== '') {
        socket.emit('chat-message', { // send to the server(the socket means the connection between current client and the server)
            message: message.value, //user's name
            handle: handle.value // message the user types
        })
        message.value = '';
    }
})

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
})


// listen for events from server
socket.on('chat-message', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
})

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})