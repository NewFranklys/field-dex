export default function EvolutionMethodIcon({ method = "" }) {
  const text = String(method).toLowerCase();
  let symbol = "●";
  if (/lv\.|level|nv\./.test(text)) symbol = "↑";
  else if (/trade|troca/.test(text)) symbol = "⇄";
  else if (/friend|amizade|affection|afeição/.test(text)) symbol = "♡";
  else if (/day|dia|sun/.test(text)) symbol = "☼";
  else if (/night|noite/.test(text)) symbol = "☾";
  else if (/stone|pedra|item|coat|scale|crown/.test(text)) symbol = "◇";
  else if (/rain|chuva/.test(text)) symbol = "≋";

  return (
    <span className="evolution-method-icon" aria-hidden="true">
      {symbol}
    </span>
  );
}
