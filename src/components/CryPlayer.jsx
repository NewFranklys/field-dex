import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CryPlayer({ src }) {
  const { t } = useTranslation("record");
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

  if (!src)
    return <p className="record-no-data">{t("cry.unavailable")}</p>;

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
        aria-label={playing ? t("cry.pause") : t("cry.play")}
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
          {pending
            ? t("cry.loading")
            : playing
              ? t("cry.playing")
              : t("cry.playLabel")}
        </strong>
      </button>
      {error && (
        <p role="status" className="record-no-data">
          {t("cry.error")}
        </p>
      )}
    </>
  );
}
