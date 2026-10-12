import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Artwork({ src, alt, className, ...props }) {
  const [failed, setFailed] = useState(null);
  const { t } = useTranslation("presentation");
  if (!src || failed === src)
    return (
      <span
        className={`${className || ""} artwork-fallback`}
        role="img"
        aria-label={
          alt
            ? t("media.imageUnavailableFor", { name: alt })
            : t("media.imageUnavailable")
        }
      >
        {t("media.imageUnavailable")}
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
