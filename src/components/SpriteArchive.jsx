import { useTranslation } from "react-i18next";
import Artwork from "./Artwork";

export default function SpriteArchive({ sprites = [], pokemonName }) {
  const { t } = useTranslation("record");
  if (!sprites.length) return null;

  return (
    <section className="record-sprite-archive">
      <div className="record-size-heading">
        <span>06</span>
        <div>
          <h2>{t("spriteArchiveTitle")}</h2>
          <small>{t("spriteArchiveSubtitle")}</small>
        </div>
      </div>
      <div className="sprite-archive-strip">
        {sprites.map((sprite) => (
          <figure
            className={`sprite-era${sprite.available ? "" : " is-unavailable"}`}
            key={sprite.key}
          >
            <div className="sprite-frame">
              {sprite.available ? (
                <>
                  <span className="sprite-scanline" aria-hidden="true" />
                  <Artwork
                    src={sprite.image}
                    alt={`${pokemonName} · ${sprite.label}`}
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="sprite-unavailable" aria-label={t("spriteUnavailable")}>
                  <span aria-hidden="true">—</span>
                  <small>{t("spriteUnavailable")}</small>
                </div>
              )}
            </div>
            <figcaption>
              <strong>{sprite.label}</strong>
              <span>{sprite.version}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
