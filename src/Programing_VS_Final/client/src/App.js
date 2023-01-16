import './App.css';
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
      {!process ? ( 
        <div className=''>
          <button onClick={handleLobby}>
            Create/Join Room
          </button>
          <button onClick={handlePractice}>
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
