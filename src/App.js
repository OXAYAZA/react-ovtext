import './App.scss';
import { useState } from 'react';
import Player from './Player/Player';

const video = {
  id: 'sample',
  src: '//localhost:3000/video/swh-hero-clean.mp4',
  preview: '',
  poster: '//localhost:3000/img/swh-preview.png'
}

function App() {
  const [ data, setData ] = useState({
    progress: 0,
    currentTime: 0,
    duration: 0,
    width: 0,
    height: 0
  });

  function playSelectedVideo ( url ) {
    document.getElementById('html-video').play();
  }

  function onProgress ( data ) {
    setData( data );
  }

  function textHandler ( start, end, modifiers ) {
    if ( data.progress < start ) {
      return [ "overlay-text" ].concat( modifiers ).join( ' ' );
    } else if ( data.progress > start && data.progress < end ) {
      return [ "overlay-text", "overlay-text-active" ].concat( modifiers ).join( ' ' )
    } else {
      return [ "overlay-text", "overlay-text-ended" ].concat( modifiers ).join( ' ' )
    }
  }

  return (
    <main className="App">
      <section className="section">
        <div className="container">

          <div className="player-wrap">
            <Player
              activePreview={false}
              activeVideo={video}
              playSelectedVideo={playSelectedVideo}
              onProgress={onProgress}
            />
            <div className={textHandler( 0.005, 0.04, "overlay-text-1" )}>Sample 1</div>
            <div className={textHandler( 0.05, 0.09, "overlay-text-2" )}>Sample 2</div>
            <div className={textHandler( 0.128, 0.16, "overlay-text-1" )}>Sample 3</div>
            <div className={textHandler( 0.38, 0.42, "overlay-text-3" )}>Sample 4</div>
            <div className={textHandler( 0.53, 0.55, "overlay-text-1" )}>Sample 5</div>
            <div className={textHandler( 0.62, 0.66, "overlay-text-4" )}>Sample 6</div>
            <div className={textHandler( 0.74, 0.78, "overlay-text-2" )}>Sample 7</div>
            <div className={textHandler( 0.89, 0.94, "overlay-text-3" )}>Sample 7</div>
          </div>
          <h1 className="title">Overlaid Text for Video</h1>
          <p>Progress: {data.progress} ({data.currentTime} / {data.duration})</p>
          <p>Rect: {data.width} x {data.height}</p>

        </div>
      </section>
    </main>
  );
}

export default App;
