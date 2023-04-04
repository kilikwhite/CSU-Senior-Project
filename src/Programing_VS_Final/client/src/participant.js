import React from 'react';
import {useState, useEffect} from 'react';
import AceEditor from "react-ace";
import axios from 'axios';
//import Stopwatch from './stopwatch';
import './index.css';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/ext-language_tools";

const startTime = Date.now();

function Participant({socket, username, room}){
  const [code, setCode] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  //const startTime = Date.now();

  const submitCode = () =>{
      setCurrentMessage(code);
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

  /* start of the message stuff*/

  const sendMessage = async () => {
    if (currentMessage !== ""){
        const endTime = Date.now();
        const messageData = {
            room: room,
            author: username,
            message: "Here is an array of Test Cases Passed: " + JSON.stringify(testCaseResults) + "\n\nAnd it took " + ((endTime - startTime) / 1000) + " seconds",
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        };
        /*
        const resultData = {
            room: room,
            author: username,
            message: JSON.stringify(testCaseResults),
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }; */

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        //await socket.emit("send_message", resultData);
        //setMessageList((list) => [...list, resultData]);
        //setCurrentMessage("");
    }
  };

  const shareCode = async () => {
    if (testCaseResults.length !== 0){
      const resultData = {
          room: room,
          author: username,
          message: currentMessage,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", resultData);
      setMessageList((list) => [...list, resultData]);
    }
  }

  useEffect (() => {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);  
      });
  }, [socket]); 

  /* end of the message stuff*/
  
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
  
  return(
    <div className="App">
        <div>Please write a function named 'add' that adds two numbers together in javascript and don't forget to use export on the functions</div>
        <AceEditor
          mode="javascript"
          theme="kuroir"
          value = {code}
          onChange={ (editor, change) => {
            setCode(editor);
            //console.log(code);
          }}
          className="aceEdit"
          editorProps={{ $blockScrolling: true }}
          height = '500px'
          width = 'auto'
          fontSize={20}
        />
        {showResults()}

        <button onClick={() => {submitCode(); sendMessage(); setTestCaseResults([]);}} className = 'Par-Sub-Btn'>Submit Code</button>
        <button onClick={() => {shareCode();}} className = 'Par-Shar-Btn'>Share Code</button>
        <div className='chat'>
          <div className="chat-header">
            <p>Session Logs</p>
          </div>
          <div className='chat-bod'>
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">Time sent: {messageContent.time}</p>
                      <p id="author">Author: {messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })} 
          </div>
        </div>
    </div> 
  )  
}

export default Participant