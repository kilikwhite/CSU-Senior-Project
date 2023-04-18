import React from 'react';
import {useEffect, useState} from 'react';
import {useTimer, useStopwatch, useTime} from 'react-timer-hook';

function Stopwatch() {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({ autoStart: true });
  
  
    return (
      <div className='timer-container'>
        <div className='main-stopwatch'>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
}

export default Stopwatch