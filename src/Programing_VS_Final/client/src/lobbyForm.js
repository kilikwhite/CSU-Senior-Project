import React from 'react';
import {useState} from 'react';
import Participant from './participant';
import Spectator from './spectator';
import io from 'socket.io-client';
//thing from participant
//thing from spectator

const socket = io.connect("http://localhost:3001");

function LobForm(){
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [spectator, setSpectator] = useState(false);

    //used for starting the program
    const [running, setRunning] = useState(false);

    //used for the main program
   // const [type, setType] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== ""){
      socket.emit("join_room", room);
        }
    };

    //insert a thing to change the useState
    const handleMain = () => {
        setRunning(!running);
      };

    const handleChangeSpec = () => {
        setSpectator(!spectator);
    };

    const startProgram = () => {
        if(spectator){
            // thing from spectator
            return <Spectator socket={socket} username={username} room={room}/>;
        }
        //thing from participant
        return <Participant socket={socket} username={username} room={room}/>;
    }

    return (
        <div className="LOBBY_FORM">
        {!running ? (
            <div className="LOBBY_FORM">
                <h3> Please type in your name and Room ID </h3>
                <input 
                    type = "text" 
                    placeholder="John..." 
                    onChange={(event) => {
                    setUsername(event.target.value);}}
                />

                <input 
                    type = "text" 
                    placeholder="Room ID..."
                    onChange={(event) => {
                    setRoom(event.target.value);}}
                />

                <input
                    type = "checkbox"
                    spectator = {spectator}
                    onChange = {handleChangeSpec}
                />

                <button onClick={handleMain}>Send</button>
            </div> 
        ) : (
            <div className='main'>
                <div className='name'> {username} </div>
                {joinRoom()}
                {startProgram()}
                
            </div>
        )}
        </div>
    );
}

export default LobForm