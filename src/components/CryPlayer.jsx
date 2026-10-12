import { useEffect, useRef, useState } from "react";

export default function CryPlayer({ src }) {
  const audioRef = useRef(null);
  const active = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    active.current = true;
    const audio = audioRef.current;
    return () => {
      active.current = false;
      audio?.pause();
    };
  }, []);
  async function toggle() {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      return;
    }
    setPending(true);
    setError(false);
    try {
      audio.currentTime = 0;
      await audio.play();
      if (active.current) setPlaying(true);
      else audio.pause();
    } catch {
      if (active.current) setError(true);
    } finally {
      if (active.current) setPending(false);
    }
  }
  if (!src) return <p className="record-no-data">No recorded cry available.</p>;
  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => {
          if (active.current) setPlaying(false);
        }}
        onError={() => {
          setPlaying(false);
          setPending(false);
          setError(true);
        }}
      />
      <button
        type="button"
        className="record-cry-control"
        onClick={toggle}
        disabled={pending}
        aria-label={playing ? "Pause cry" : "Play cry"}
        aria-pressed={playing}
      >
        <span className="record-cry-play" aria-hidden="true">
          {playing ? "Ⅱ" : "▶"}
        </span>
        <span
          className={`record-waveform ${playing ? "is-playing" : ""}`}
          aria-hidden="true"
        >
          {[
            18, 32, 14, 42, 26, 50, 21, 37, 16, 45, 29, 20, 38, 15, 31, 22, 44,
            18, 28, 14, 35, 20,
          ].map((height, index) => (
            <i
              key={index}
              style={{
                "--wave-height": `${height}%`,
                "--wave-delay": `${index * 35}ms`,
              }}
            />
          ))}
        </span>
        <strong>
          {pending ? "Loading…" : playing ? "Playing" : "Play Cry"}
        </strong>
      </button>
      {error && (
        <p role="status" className="record-no-data">
          Cry playback unavailable. You can try playing again.
        </p>
      )}
    </>
  );
}
