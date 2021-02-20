const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); //localhost:3000/index.html
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html")); //localhost:3000/index.html
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

// messenger is a connection manager - like a switchboard operator
messenger.attach(server);


// socket is the individual connection - the caller
messenger.on('connection', (socket) => {  //TODO ESTE PEDAZO ES EL MISMO SOCKET.IO PORQUE FUE DEFINIDO COMO MESSENGER ↑↑↑↑ TOP
    console.log(`a user connected: ${socket.id}`);

    // send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});
           // nickname: `${$nickname}`

    // socket.on( 'sendnickname', function(enviarnickname) {
    //     socket.enviarnickname = nickname;
    //     users.push(socket.nickname);
    //     console.log(users);

    //     socket.emit('sendnickname', enviarnickname);
    // });

    socket.on('chatmessage', function(msg) {
        console.log(msg);
        messenger.emit('message', { id: socket.id, message: msg })
    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
        //window.localStorage.clear();
    }); 
});