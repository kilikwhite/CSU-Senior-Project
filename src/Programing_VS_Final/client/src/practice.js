import React from 'react';
import {useState} from 'react';
import axios from 'axios';
//const fs = require("fs");

//import { render } from "./aTest";

//ace stuff
//import React, {Component} from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
  console.log("change", newValue);
}

// Render editor
/*
  render(
    <AceEditor
      mode="java"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />,
    document.getElementById("example")
  ); */
//end of ace stuff



function Practice() {
  const [code, setCode] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);

  const submitCode = () =>{
      axios
        .post('http://localhost:80/javascript', {code})
        .then(({data}) => {
          setTestCaseResults(data.testCaseResults);
          //console.log(data);
          //console.log(data.testCaseResults);
          //console.log(testCaseResults[0]);
        })
        .catch((err) => console.log(err));
      //console.log(testCaseResults);


  };
  
  const showResults = () =>{
    if (testCaseResults.length === 0){
      return(
        <div>
          The code can not compile
        </div>
      )
    }
  };
  
  return(
    <div className="App">
        <div>Please write a function named 'add' that adds two numbers together in javascript and don't forget to use export on the functions</div>
        <AceEditor
          mode="javascript"
          theme="terminal"
          value = {code}
          onChange={ (editor, change) => {
            setCode(editor);
            //console.log(code);
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <div>
          {testCaseResults.map((res, i) => {
            return (
              <div key={i}>
                <div>Test {i + 1} {res === true ? 'passed' : 'failed'}</div>
              </div>
            );
          })}
        </div>
        <button onClick={submitCode}>Submit</button>
      </div> 
  )  
}

export default Practice;