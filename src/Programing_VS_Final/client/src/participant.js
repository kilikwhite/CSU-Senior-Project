import React from 'react';
import {useState, useEffect} from 'react';
import AceEditor from "react-ace";
import axios from 'axios';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

function Participant({socket, username, room}){
  const [code, setCode] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const submitCode = () =>{
      setCurrentMessage(code);
      axios
        .post('http://localhost:80/javascript', {code})
        .then(({data}) => {
          setTestCaseResults(data.testCaseResults);
          //sendMessage();
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
        const messageData = {
            room: room,
            author: username,
            message: currentMessage + "\n\n" + testCaseResults,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
    }
  };

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
                <div>Test {i + 1} {res === true ? 'passed' : 'failed'}</div>
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
        <button onClick={() => {submitCode(); sendMessage(); setTestCaseResults([]);}}>Submit</button>
        <div className='chat'>
          /* this is for the actual chat*/
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
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })} 
          /* this is the end */
        </div>
    </div> 
  )  
}

export default Participant