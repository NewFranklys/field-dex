export default function TypeMatchups({ matchups }) {
  if (!matchups)
    return <p className="record-no-data">Type response data unavailable.</p>;
  return (
    <>
      <p className="record-no-data">
        Current type chart. Abilities, moves and battle conditions are not
        included.
      </p>
      <div className="record-matchups">
        {[
          ["weaknesses", "Weak To", "weakness"],
          ["resistances", "Resists", "resistance"],
          ["immunities", "Immune To", "immunity"],
        ].map(([key, label, style]) => (
          <div className="record-matchup-column" key={key}>
            <span>{label}</span>
            <div>
              {matchups[key].length ? (
                matchups[key].map((item) => (
                  <span
                    className={`record-matchup-chip ${style}`}
                    key={item.type}
                  >
                    {item.type}
                    <strong>{item.multiplier}×</strong>
                  </span>
                ))
              ) : (
                <span className="record-no-data">None</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
