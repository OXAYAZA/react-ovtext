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

function onProgress ( data ) {
  console.log( data );
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
            onProgress={onProgress}
          />
          <h1 className="title">Overlaid Text for Video</h1>

        </div>
      </section>
    </main>
  );
}

export default App;
