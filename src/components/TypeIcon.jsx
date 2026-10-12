import { useState } from "react";

const ICON_BASE =
  "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons";

export default function TypeIcon({ type, label, className = "", size = "md" }) {
  const [failed, setFailed] = useState(false);
  const slug = String(type || "normal").toLowerCase();
  const fallback = (label || slug).slice(0, 2).toUpperCase();

  return (
    <span
      className={`type-icon type-icon-${size} ${className}`.trim()}
      data-type={slug}
      aria-hidden="true"
    >
      {failed ? (
        <span className="type-icon-fallback">{fallback}</span>
      ) : (
        <img
          src={`${ICON_BASE}/${slug}.svg`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
