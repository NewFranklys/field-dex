import { useState } from "react";

export default function Artwork({ src, alt, className, ...props }) {
  const [failed, setFailed] = useState(null);
  if (!src || failed === src)
    return (
      <span
        className={`${className || ""} artwork-fallback`}
        role="img"
        aria-label={alt ? `${alt}: image unavailable` : "Image unavailable"}
      >
        Image unavailable
      </span>
    );
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(src)}
    />
  );
}
