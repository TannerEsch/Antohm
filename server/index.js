const cors = require("cors");
require('dotenv').config()
const express = require("express");
const {Server} = require('socket.io')
const axios = require('axios')
const http = require('http')
const mongoose = require("mongoose")
const passport = require('passport');
require('./config/passport')(passport);
const routes = require('./routes');

const app = express();


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());



// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methoids: ['GET', 'POST', "DELETE", "PUT"]
  },
});

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
})

io.on("connection", (socket) => {
  console.log(`user connected:${socket.id}`)

  socket.on('send_message', (data2) => {
    socket.broadcast.emit('recieve_message', data2)  
  })
})

//
app.get('/', (req, res) => {
    res.json("we open for business")
  });

// API Routes
  app.use("/user", routes.user);
  app.use("/post", routes.post);
  app.use("/chat", routes.chat);
  app.use("/upload", routes.upload);
  app.use("/job", routes.job);

  //intervals
  //delete all jobs every 2.99 days
 setInterval( async () => {
  await axios.post(`https://thrive-server.herokuapp.com/job/deleteAll`)
}, 258900000);
//post jobs every 3 days
  setInterval( async () => {
     await axios.post(`https://thrive-server.herokuapp.com/job`)
 }, 259200000);



  // Server
server.listen(process.env.PORT || 8000, () => console.log(`Server is running on PORT: ${process.env.PORT}`));