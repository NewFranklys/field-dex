import { useTranslation } from "react-i18next";
import TypeIcon from "./TypeIcon";

export default function TypeMatchups({ matchups }) {
  const { t } = useTranslation(["record", "common"]);

  if (!matchups)
    return <p className="record-no-data">{t("record:typeUnavailable")}</p>;

  const groups = [
    ["weaknesses", t("record:weakTo"), "weakness"],
    ["resistances", t("record:resists"), "resistance"],
    ["immunities", t("record:immuneTo"), "immunity"],
  ];

  return (
    <>
      <p className="record-no-data">{t("record:typeContext")}</p>
      <div className="record-matchups">
        {groups.map(([key, label, style]) => (
          <div className="record-matchup-column" key={key}>
            <span>{label}</span>
            <div>
              {matchups[key].length ? (
                matchups[key].map((item) => {
                  const slug = item.typeSlug || String(item.type).toLowerCase();
                  return (
                    <span
                      className={`record-matchup-chip ${style}`}
                      key={slug}
                    >
                      <TypeIcon type={slug} size="sm" />
                      <span>
                        {item.typeSlug
                          ? t(`common:types.${item.typeSlug}`)
                          : item.type}
                      </span>
                      <strong>{item.multiplier}×</strong>
                    </span>
                  );
                })
              ) : (
                <span className="record-no-data">{t("record:none")}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
