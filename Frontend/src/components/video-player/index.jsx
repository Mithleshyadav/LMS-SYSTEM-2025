import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Slider } from "@radix-ui/react-slider";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";

function VideoPlayer({ width = "100%", height = "300px", url }) {
const [isFullScreen, setIsFullScreen] = useState(false);
const [showControls, setShowControls] = useState(true);
const [playing, setPlaying] = useState(false);
const [volume, setVolume] = useState(0.5);
const [muted, setMuted] = useState(false);
const [played, setPlayed] = useState(0);
const [seeking, setSeeking] = useState(false);


const playerRef = useRef(null);

function handleMouseMove() {
    setShowControls(true);


}

function handleProgress(state) {
  if(!seeking) {
    setPlayed(state.played);
  }
}

function handleSeekChange([newValue]) {
  setPlayed(newValue);
  setSeeking(true)
}

function handleSeekMouseUp() {
  setSeeking(false);
  playerRef.current?.seekTo(played)
}

  return (
    <div className={`relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl
     transition-all duration-300 ease-in-out
     ${isFullScreen ? "w-screen h-screen": ""}`}
     style={{ width, height }}
     onMouseMove={handleMouseMove}
     onMouseLeave= {() => setShowControls(false)}>

      <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0"
        width="100%"
        height='100%'
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
      />
      {showControls && (
        <div 
        className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"}`} >

          <Slider
          value={[played * 100]}
          max={100}
          step={0.1}
          onValueChange={(value) => handleSeekChange([value[0] / 100])}
          onValueCommit={handleSeekMouseUp}
          className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <Button
              variant='ghost'
              size='icon'
              onClick={handlePlayAndPause}
              className='text-white bg-transparent hover:text-white hover:bg-gray-700'
               >
                {playing ? (
                  <Pause className='h-6 w-6'/>
                ):(
                  <Play className='h-6 w-6' />
                )}
               </Button>
              <Button 
              onClick={handleRewind}
              className='text-white bg-transparent hover:text-white hover:bg-gray-700'
              variant='ghost'
                size='icon' >
                  <RotateCcw className='h-6 w-6 '/>
                </Button>
              <Button 
              onClick={handleForward}
              className='text-white bg-transparent hover:text-white hover:bg-gray-700'
              variant='ghost'
                size='icon' >
                  <RotateCw className='h-6 w-6 '/>
                </Button>
                <Button
                onClick={handleToggleMute}
                className='text-white bg-transparent hover:text-white hover:bg-gray-700' 
                variant='ghost'
                size='icon' >
                  {muted ? (
                    <VolumeX className="h-6 w-6"/>
                  ):(
                    <Volume2 className="h-6 w-6"/>
                  )}
                </Button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
}

export default VideoPlayer;
