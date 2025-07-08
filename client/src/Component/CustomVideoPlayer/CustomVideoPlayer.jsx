import React, {useEffect, useRef, useState} from "react";
import "./CustomVideoPlayer.css";
import Hls from "hls.js";
import {useSelector} from "react-redux";

const planDurations = {
  free: 5 * 60,
  bronze: 7 * 60,
  silver: 10 * 60,
  gold: Infinity,
};

const CustomVideoPlayer = ({src}) => {
  const videoRef = useRef();
  const seekbarRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const [availableQualities, setAvailableQualities] = useState([]);

  const currentUser = useSelector((state) => state.currentUserReducer);
  const userPlan = currentUser?.result?.plan;

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && src.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setDuration(video.duration || 0);
        const levels = hls.levels.map((l, i) => ({
          label: `${l.height}p`,
          index: i,
        }));
        setAvailableQualities([{label: "Auto", index: -1}, ...levels]);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const level = hls.levels[data.level];
        if (level) setSelectedQuality(`${level.height}p`);
      });

      video.hlsInstance = hls; // Save hls instance for later
      return () => hls.destroy();
    } else {
      video.src = src;
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      const maxAllowedTime = planDurations[userPlan];
      if (video.currentTime >= maxAllowedTime) {
        video.pause();
        alert(
          `Your current plan ${userPlan} allows watching only ${formatTime(
            maxAllowedTime
          )} of the video.`
        );
      }
    };
    const setMeta = () => setDuration(video.duration);

    video.addEventListener("loadedmetadata", setMeta);
    video.addEventListener("timeupdate", updateTime);

    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === "INPUT") return;

      switch (e.key.toLowerCase()) {
        case "k":
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "j":
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case "l":
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case "arrowup":
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          setVolume(video.volume);
          break;
        case "arrowdown":
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          setVolume(video.volume);
          break;
        case "f":
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", setMeta);
    };
  }, [userPlan]);

  const togglePlay = () => {
    const video = videoRef.current;
    video.paused ? video.play() : video.pause();
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleSeek = (e) => {
    videoRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    videoRef.current.volume = v;
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const changeSpeed = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const changeQuality = (index, label) => {
    const hls = videoRef.current.hlsInstance;
    if (hls) {
      hls.currentLevel = index;
    }
    setSelectedQuality(label);
  };

  return (
    <div className="Video_Container">
      <video
        ref={videoRef}
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
      ></video>

      <div className="Controls">
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <span>{formatTime(currentTime)}</span>
        <input
          ref={seekbarRef}
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          id="Seekbar"
        />
        <span>{formatTime(duration)}</span>
        <input
          type="range"
          id="Volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
        <button onClick={() => setShowSettings((s) => !s)}>⚙️</button>
        <button onClick={toggleFullscreen}>{fullscreen ? "❎" : "⛶"}</button>
      </div>

      {showSettings && (
        <div className="Settings_Menu">
          <strong>Speed</strong>
          {[0.5, 1, 1.5, 2].map((rate) => (
            <button
              key={rate}
              className={rate === playbackRate ? "active" : ""}
              onClick={() => changeSpeed(rate)}
            >
              {rate}x
            </button>
          ))}

          <strong>Quality</strong>
          {availableQualities.map((q) => (
            <button
              key={q.label}
              className={q.label === selectedQuality ? "active" : ""}
              onClick={() => changeQuality(q.index, q.label)}
            >
              {q.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
