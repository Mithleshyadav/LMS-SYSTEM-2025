import { useState, useRef, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import { Slider } from "@radix-ui/react-slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Volume2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  VolumeX,
} from "lucide-react";

function VideoPlayer({
  width = "100%",
  height = "300px",
  url,
}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);


  const handlePlayPause = () => {
  setPlaying((prev) => !prev);
};
  // ⏩ Rewind
  const handleRewind = () => {
    const video = playerRef.current;
    if (!video) return;

    video.currentTime = Math.max(video.currentTime - 5, 0);
  };

  // ⏩ Forward
  const handleForward = () => {
    const video = playerRef.current;
    if (!video) return;

    video.currentTime = Math.min(video.currentTime + 5, duration);
  };

  // 🔊 Volume
  const handleVolumeChange = ([value]) => {
    const newVolume = value / 100;
    setVolume(newVolume);

    const video = playerRef.current;
    if (video) {
      video.volume = newVolume;
    }

    if (value > 0) setMuted(false);
  };

  const toggleMute = () => {
    const video = playerRef.current;
    if (!video) return;

    video.muted = !muted;
    setMuted(!muted);
  };

  // 🎯 Update Progress
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!seeking && duration) {
        setPlayed(video.currentTime / duration);
      }
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [duration, seeking]);

  // 🎯 Seek
  const handleSeekChange = ([value]) => {
    setPlayed(value / 100);
    setSeeking(true);
  };

  const handleSeekCommit = () => {
    const video = playerRef.current;
    if (!video) return;

    video.currentTime = played * duration;
    setSeeking(false);
  };

  // 🎥 Load Duration
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [url]);

  // 🖥 Fullscreen
  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  // 🎛 Auto hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // ⏱ Format Time
  const formatTime = (seconds) => {
    if (!seconds) return "00:00";

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();

    if (hh)
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}`;

    return `${mm.toString().padStart(2, "0")}:${ss
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-900 rounded-xl overflow-hidden shadow-xl ${
        isFullScreen ? "w-screen h-screen" : ""
      }`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={false}   // we control play manually
        controls={false}
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={handleSeekChange}
            onValueCommit={handleSeekCommit}
            className="w-full mb-3"
          />

          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {playing ? <Pause /> : <Play />}
              </Button>

              <Button variant="ghost" size="icon" onClick={handleRewind}>
                <RotateCcw />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleForward}>
                <RotateCw />
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {muted ? <VolumeX /> : <Volume2 />}
              </Button>

              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>

            <div className="flex items-center gap-3">
              <span>
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>

              <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                {isFullScreen ? <Minimize /> : <Maximize />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;

