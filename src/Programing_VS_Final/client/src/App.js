import './App.css';
import './index.css';
import React from 'react';
import { useState } from 'react';
import Practice from './practice';
import LobForm from './lobbyForm';

function App() {
  const [process, setProcess] = useState(false);
  //used for the online modes
  const [mode, setMode] = useState(false);

  const handleLobby = () => {
    setProcess(!process);
    setMode(!mode);
  };

  const handlePractice = () => {
    setProcess(!process);
  };

  const programTransition = () => {
    if(mode){
      return (
        <LobForm/>
      );
    }
    return (<Practice/>);
  };

  return (
    <div className="App">
      <center><h1>Programming Versus</h1></center>
      
      {!process ? ( 
        <div className='Button-Container'>
          <p>Welcome to Programming Versus.  This is a program used to help practice against others to prepare for programing compititions or to increase your skills as a programmer</p>
          <p>To begin please select one of two buttons</p>
          <button onClick={handleLobby} className='Join-btn'>
            Create/Join Room
          </button>
          <button onClick={handlePractice} className='Prac-btn'>
            Practice
          </button>
        </div>
      ) : (
        //{!mode ? (<lForm/>) : (<Practice/>)}
        programTransition()
      )}
    </div>
  );
}

export default App;
