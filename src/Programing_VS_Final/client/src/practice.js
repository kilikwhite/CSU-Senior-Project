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
  const default_Result = [];
  
  const showResults = () =>{
      return(
        <div>

          {testCaseResults.map((res, i) => {
            return (
              <div key={i}>
                <div>{res}</div>
              </div>
            );
          })}
        </div>
      )
  };

  const submitCode = () =>{
      axios
        .post('http://localhost:80/practice_javascript', {code})
        .then(({data}) => {
          setTestCaseResults(data.testCaseResults);
          //showResults();
          //setTestCaseResults([]);
          //console.log(data);
          //console.log(data.testCaseResults);
          //console.log(testCaseResults[0]);
        })
        .catch((err) => console.log(err));
      //console.log(testCaseResults);


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
        {showResults()}
        <button onClick={() => {submitCode();
          console.log(testCaseResults); 
          setTestCaseResults(default_Result);
          console.log(testCaseResults);}}>
          Submit</button>
      </div> 
  )  
}

export default Practice;