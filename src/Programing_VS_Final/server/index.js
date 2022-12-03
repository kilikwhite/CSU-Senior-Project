const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

let default1 = "./compiled/rightAwnser.mjs";

app.post("/javascript", (req, res) => {
    //const dir = "./compiled";
    //make try catch later
    //fs.mkdirSync(dir);
    fs.writeFileSync("./compiled/test.mjs", req.body.code);
    //fs.writeFileSync("test.js", req.body.code);
    console.log(req.body);
    let testCaseResults = [];
    /*
    testCaseResults.push(false);
    testCaseResults.push(false);
    testCaseResults.push(false);
    testCaseResults.push(false);

    Q1Test(testCaseResults);
    */
    let path = default1;
    path = "./compiled/test.mjs";
    if(fs.existsSync(path)){
      
      import(path).then((ns) => {
          let t1 = [1, 2, ns.ADD(1, 2)];
          let t2 = [8, 3, ns.ADD(8, 3)];
          let t3 = [9, 0, ns.ADD(9, 0)];
          let t4 = [-1, -9, ns.ADD(-1, -9)];
          console.log(ns.ADD(1, 2));

          if(t1[2] === 3) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(t2[2] === 11) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(t3[2] === 9) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }

          if(t4[2] === -10) {
            testCaseResults.push(true);
          } else {
            testCaseResults.push(false);
          }
          
          console.log(testCaseResults);
          res.json({testCaseResults});
          testCaseResults = [];
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