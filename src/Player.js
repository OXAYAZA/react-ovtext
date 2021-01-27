/**
 * Video Player
 */
import PropTypes from 'prop-types';

// const { Fragment } = window.React;
import { Fragment, useState, useRef, useEffect } from 'react';

function Player( props ) {
  const { activePreview, activeVideo, playSelectedVideo, isYoutube, onProgress } = props;
  const [ rect, setRect ] = useState( 0 );
  const ref = useRef( null );

  function resizeHandler () {
    setRect( ref.current.getBoundingClientRect() );
  }

  function progressHandler ( event ) {
    if ( onProgress instanceof Function ) {
      onProgress({
        event: event,
        progress: event.currentTarget.currentTime/event.currentTarget.duration,
        currentTime: event.currentTarget.currentTime,
        duration: event.currentTarget.duration,
        width: rect.width,
        height: rect.height
      });
    }
  }

  useEffect(() => {
    window.addEventListener( 'resize', resizeHandler );
    return () => { window.removeEventListener( 'resize', resizeHandler ); }
  });

  return(
    <Fragment>
      {activeVideo.preview &&
        <div className={`preview progressive ${activePreview ? 'enabled' : 'disabled'}`} onClick={() => playSelectedVideo(activeVideo.src)}>
          <button onClick={() => playSelectedVideo(activeVideo.src)}><i className="ic ic-play-button" /></button>
          <img src={props.activeVideo.preview} alt="Video Preview" />
        </div>
      }

      {isYoutube ?
        <iframe
          title="Video Player"
          width="100%" height="100%"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          src={activeVideo.src}
        />
        :
        <video
          id="html-video"
          width="100%"
          height="100%"
          preload="auto"
          // controls={activeVideo.preview ? true : false}
          controls={true}
          autoPlay={activeVideo.preview ? false : true}
          muted={activeVideo.preview ? false : true}
          loop={activeVideo.preview ? false : true}
          poster={activeVideo.poster ? activeVideo.poster : ''}

          ref={ref}
          onLoadedData={ function ( event ) {
            resizeHandler();
            progressHandler( event );
          }}
          onTimeUpdate={ function ( event ) {
            progressHandler( event );
          }}
          onPlay={ function ( event ) {
            progressHandler( event );
          }}
          onPause={ function ( event ) {
            progressHandler( event );
          }}
        >
          <source src={activeVideo.src} type="video/mp4" />
          <source src={(activeVideo.src).replace('mp4', 'ogg')} type="video/ogg" />
          <source src={(activeVideo.src).replace('mp4', 'webm')} type="video/webm" />
            Your browser does not support the video tag.
        </video>
      }
    </Fragment>
  );
}

Player.propTypes = {
  activePreview: PropTypes.bool.isRequired,
  activeVideo: PropTypes.object.isRequired,
  playSelectedVideo: PropTypes.func.isRequired,
  isYoutube: PropTypes.bool
};

Player.defaultProps = {
  isYoutube: false
};

export default Player;
