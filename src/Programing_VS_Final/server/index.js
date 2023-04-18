//const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
var Sandbox = require("sandbox");
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

//let default1 = "./compiled/rightAwnser.mjs";
//let default2 = "./compiled/incorrectAwnser.mjs";

app.post("/javascript", (req, res) => {
    const s = new Sandbox();

    //might not need below thing
    //fs.writeFileSync("./compiled/test.mjs", req.body.code);
    //fs.writeFileSync("test.js", req.body.code);
    //console.log(req.body);
    //let actual_test = "./compiled/test.mjs";
    let testCaseResults = [];

    let tester = `//~~~~~~~~~~~~~~~~Initalizing Test~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    let T_Results = [];
    if(fibSQ(3) === 2) {
      console.log("Test 1 Passed");
    } else {
      console.log("Test 1 Failed");
    }

    if(fibSQ(0) === 0) {
      console.log("Test 2 Passed");
    } else {
      console.log("Test 2 Failed");
    }

    if(fibSQ(14) === 377) {
      console.log("Test 3 Passed");
    } else {
      console.log("Test 3 Failed");
    }

    if(fibSQ(9) === 34) {
      console.log("Test 4 Passed");
    } else {
      console.log("Test 4 Failed");
    }
    
    if(fibSQ(20) === 6765) {
      console.log("Test 5 Passed");
    } else {
      console.log("Test 5 Failed");
    }
    `
    
    //let path = actual_test;
    //path = "./compiled/test.mjs";

    s.run(req.body.code + tester, function(output) {
      //console.log("The answer is: %d", output.result * 10); // The answer is: 42
      console.log(output.result);
      console.log(output.console);
      testCaseResults = output.console;
      if(output.result !== 'null'){
        testCaseResults.push(output.result);
      }
      res.json({testCaseResults});
    });

    
    //res.json({ message: "success"});
    
    //will remove entire if statement later
    /*
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
    */
    
});

app.post("/practice_javascript", (req, res) => {
  const s = new Sandbox();
  //console.log(req.body);
  //temp_storage = req.body.code.length;
  //console.log(temp_storage);
  //let actual_test = "./compiled/test.mjs";
  let testCaseResults = [];

  /*
  if(temp_storage === 0){
    testCaseResults.push(false);
    res.json({testCaseResults});
    return;
  }*/
  
  let tester = `//~~~~~~~~~~~~~~~~Initalizing Test~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if(fibSQ(3) === 2) {
    console.log("Test 1 Passed, Expected Output is 2, Actual Output is: " + fibSQ(3));
  } else {
    console.log("Test 1 Failed, Expected Output is 2, Actual Output is: " + fibSQ(3));
  }
  `
  
  //let path = actual_test;
  //path = "./compiled/test.mjs";

  s.run(req.body.code + tester, function(output) {
    //console.log("The answer is: %d", output.result * 10); // The answer is: 42
    console.log(output.result);
    console.log(output.console);
    testCaseResults = output.console;
    if(output.result !== 'null'){
      testCaseResults.push(output.result);
    }
    res.json({testCaseResults});
  });
  //console.log(testCaseResults);
  //res.json({testCaseResults});
  //res.json({ message: "success"});
  
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