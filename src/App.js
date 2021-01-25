import './App.scss';
import Player from './player/Player';

const video = {
  id: 'sample',
  src: '//localhost:3000/video/swh-hero.mp4',
  preview: '',
  poster: '//localhost:3000/img/swh-preview.png'
}

function playSelectedVideo( url ) {
  console.log( '[play]:', url );
  document.getElementById('html-video').play();
}

function onTimeUpdate( event, props ) {
  console.log( '[onTimeUpdate]', props.activeVideo.id, event.currentTarget.currentTime );
}

function onPlay( event, props ) {
  console.log( '[onPlay]', props.activeVideo.id, event );
}

function onPause( event, props ) {
  console.log( '[onPause]', props.activeVideo.id, event );
}

function onLoadedMetadata ( event, props ) {
  console.log( '[onLoadedMetadata]', props.activeVideo.id, event.currentTarget.duration, event.currentTarget );
}

function App() {
  return (
    <main className="App">
      <section className="section">
        <div className="container">

          <Player
            activePreview={false}
            activeVideo={video}
            playSelectedVideo={playSelectedVideo}

            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onPlay={onPlay}
            onPause={onPause}
          />
          <h1 className="title">Overlaid Text for Video</h1>

        </div>
      </section>
    </main>
  );
}

export default App;
