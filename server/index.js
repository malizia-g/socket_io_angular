const express = require('express');
const app = express();
const cors = require ('cors');
app.use(cors());

const httpServer = require("http").createServer(app);
const options = { 
 cors: {
    origin: "https://4200-purple-buzzard-fxtm6ont.ws-eu08.gitpod.io",
    methods: ["GET", "POST"]
  }
};

const port = 3000;
const io = require("socket.io")(httpServer, options);

// Per ogni client connesso
io.on('connection', socket => {
    console.log('Socket: client connected');
    //Invio il messaggio ricevuto a tutti i client
    socket.on('new-message', (message) => { 
      socket.emit('resp-message', message);
      console.log(message);
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})