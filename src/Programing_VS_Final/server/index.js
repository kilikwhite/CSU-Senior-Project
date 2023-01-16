const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = 80;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id} `);

  socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
  });
});

app.use(cors());
app.use(express.json());

let default1 = "./compiled/rightAwnser.mjs";
let default2 = "./compiled/incorrectAwnser.mjs";

app.post("/javascript", (req, res) => {
    fs.writeFileSync("./compiled/test.mjs", req.body.code);
    //fs.writeFileSync("test.js", req.body.code);
    console.log(req.body);
    let actual_test = "./compiled/test.mjs";
    let testCaseResults = [];
    
    let path = actual_test;
    //path = "./compiled/test.mjs";
    if(fs.existsSync(path)){
      
      import(path).then((ns) => {
          let t1 = [8, 3, ns.ADD(8, 3)];
          console.log(t1[2]);
          console.log(ns.ADD(8, 3));
          console.log(ns.ADD(1, 2));
          console.log(ns.ADD(9, 0));
          console.log(ns.ADD(-1, -9));

          if(ns.ADD(1, 2) === 3) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(ns.ADD(8, 3) === 11) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(ns.ADD(9, 0) === 9) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(ns.ADD(-1, -9) === -10) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }
          
          console.log(testCaseResults);
          res.json({testCaseResults});
          testCaseResults = [];
          console.log(testCaseResults);
          fs.unlinkSync("./compiled/test.mjs");
        });
      
        //console.log("This might be first");
        
      //const testArr = new Array(4).fill(false);
    } else {
      console.log("THE FILE DON'T EXIST", path);
    }

    
    //res.json({ message: "success"});
    
    //return later
    
});

/*
app.get("/", (req, res) => {
    res.send("Hello World!");
}); */


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
}); 

server.listen(3001, () => {
  console.log("Server running");
});