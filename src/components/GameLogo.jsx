import { useState } from "react";

export default function GameLogo({ visual, label, compact = false }) {
  const [failed, setFailed] = useState(() => new Set());
  const logos = visual?.logos || [];
  const visibleLogos = logos.filter((_, index) => !failed.has(index));

  function handleError(index) {
    setFailed((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }

  return (
    <div
      className={`game-logo${compact ? " game-logo--compact" : ""}`}
      aria-label={`${label} logo`}
    >
      {visibleLogos.length > 0 ? (
        <div
          className={`game-logo__images${visibleLogos.length > 1 ? " game-logo__images--pair" : ""}`}
        >
          {logos.map((logo, index) =>
            failed.has(index) ? null : (
              <img
                key={`${logo.src}-${index}`}
                src={logo.src}
                alt={logo.label || label}
                loading="lazy"
                decoding="async"
                onError={() => handleError(index)}
              />
            ),
          )}
        </div>
      ) : (
        <div className="game-logo__fallback" aria-hidden="true">
          <span>{visual?.mark || label}</span>
        </div>
      )}
    </div>
  );
}
