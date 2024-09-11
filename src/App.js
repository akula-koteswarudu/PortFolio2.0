import React, { useState, useRef, useEffect } from 'react';
import './styles/App.css';
import Popup from './components/Popup';

import stations from './utils';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [key, setKey] = useState(0);
  const trainRef = useRef(null);
  const movingAudioRef = useRef(new Audio('train.mp3')); 

  useEffect(() => {
    let interval;
    if (animationStarted && stationIndex < stations.length) {
      interval = setInterval(checkStationStop, 50);
    }
    return () => clearInterval(interval);
  }, [stationIndex, animationStarted]);

  useEffect(() => {
    if (animationStarted) {
      movingAudioRef.current.loop = true; // Set to loop while moving
      movingAudioRef.current.play();
    } else {
      movingAudioRef.current.pause();
      movingAudioRef.current.currentTime = 0; // Reset playback position
    }
  }, [animationStarted]);


  const stationPercentages = [11, 38, 65, 88, 99];

  

  const checkStationStop = () => {
    const train = trainRef.current;
    const animations = train.getAnimations();

    if (animations.length === 0) {
      console.log("Zero animations");
      return;
    }

    const animation = animations[0];
    const animationDuration = animation.effect.getComputedTiming().duration;
    const elapsedTime = animation.currentTime % animationDuration;
    const animationPercentage = (elapsedTime / animationDuration) * 100;

    if (animationPercentage >= stationPercentages[stationIndex]) {
        animation.pause();
        setShowPopup(true);
        movingAudioRef.current.pause();
    }
  };

  const startAnimation = () => {
    const train = trainRef.current;
    train.style.animation = 'moveTrain 6s linear forwards';
    setAnimationStarted(true);
    setStationIndex(0); 
  };

  const resumeTrain = () => {
    const train = trainRef.current;
    const animations = train.getAnimations();

    if (animations.length === 0) return;

    const animation = animations[0];
    animation.play();
    if(stations.length - 1  > stationIndex)
      movingAudioRef.current.play();
    setShowPopup(false);
    setStationIndex((prevIndex) => prevIndex + 1);
  };

  const resetAnimation = () => {
    setKey(prevKey => (prevKey + 1)%2);
    setAnimationStarted(false);
    setStationIndex(0);
    setShowPopup(false); 
  };

  return (
    <div className="App">
      <h1 className='title'>Welcome to my portfolio!</h1>
      <div className="hello">
        <img className="hello-img" src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOThlbGZ6aHo1eGU5c2hsZjQzZDZhdXpoMGdmMGQ3emkzNHF3bnh3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aAZXqHueGdUntFcKZC/giphy.webp' alt='Saying hello'/>
        <h3 className='hello-text'>Hello! I am Koteswarudu Akula. Hop on the train to discover more about me.</h3>
      </div>
      <div>
        <img src="track.svg" width="80%" alt="Track" />
      </div>

      <div key={key} ref={trainRef} className="train">
        <img src="train.svg" alt="Train" />
      </div>

      <img className="station station-1" src="station1.svg" alt="station" />
      <img className="station station-2" src="station2.svg" alt="station" />
      <img className="station station-3" src="station3.svg" alt="station" />
      <img className="station station-4" src="station4.svg" alt="station" />

      {!animationStarted && (
        <button className="Button" onClick={startAnimation}>Start Journey</button>
      )}
      {animationStarted && (
        <button className='Button' onClick={resetAnimation}>Reset Journey</button>
      )}

      { stationIndex < stations.length &&<Popup stationIndex={stationIndex} resumeTrain={resumeTrain} className={showPopup ? "show" : ""} />}
    </div>
  );
}

export default App;
