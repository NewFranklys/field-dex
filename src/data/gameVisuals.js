const LOGO_COMMIT = "7ea6cdc12a8e979428b6835d97ded65c3f82f1b4";
const LOGO_ROOT = `https://raw.githubusercontent.com/Cosmi4002/pokeshinytracker/${LOGO_COMMIT}/public/img/game-logos`;
const BOX_ROOT = "https://img.pokemondb.net/boxes";

const logoFileAliases = {
  letsgopikachu: "lgp",
  letsgoeevee: "lge",
  legendsarceus: "pla",
};

function logo(file, label, options = {}) {
  const resolvedFile = logoFileAliases[file] || file;
  const isBoxFront = Boolean(options.isBoxFront);

  return {
    label,
    src: isBoxFront ? `${BOX_ROOT}/${file}.jpg` : `${LOGO_ROOT}/${resolvedFile}.png`,
    source: isBoxFront
      ? "https://pokemondb.net/"
      : `https://github.com/Cosmi4002/pokeshinytracker/tree/${LOGO_COMMIT}/public/img/game-logos`,
    ...options,
  };
}

export const gameVisuals = {
  "red-blue": {
    platform: "Game Boy",
    kind: "mainline",
    mark: "R / B",
    accent: "#ca5a50",
    logos: [
      logo("red", "Pokémon Red", { isBoxFront: true }),
      logo("blue", "Pokémon Blue", { isBoxFront: true }),
    ],
  },
  yellow: {
    platform: "Game Boy",
    kind: "enhanced",
    mark: "Y",
    accent: "#d2aa31",
    logos: [logo("yellow", "Pokémon Yellow", { isBoxFront: true })],
  },
  "gold-silver": {
    platform: "Game Boy Color",
    kind: "mainline",
    mark: "G / S",
    accent: "#b4974c",
    logos: [
      logo("gold", "Pokémon Gold", { isBoxFront: true }),
      logo("silver", "Pokémon Silver", { isBoxFront: true }),
    ],
  },
  crystal: {
    platform: "Game Boy Color",
    kind: "enhanced",
    mark: "C",
    accent: "#5f84ae",
    logos: [logo("crystal", "Pokémon Crystal", { isBoxFront: true })],
  },
  "ruby-sapphire": {
    platform: "Game Boy Advance",
    kind: "mainline",
    mark: "R / S",
    accent: "#546fa1",
    logos: [logo("ruby", "Pokémon Ruby"), logo("sapphire", "Pokémon Sapphire")],
  },
  emerald: {
    platform: "Game Boy Advance",
    kind: "enhanced",
    mark: "E",
    accent: "#39886c",
    logos: [logo("emerald", "Pokémon Emerald")],
  },
  "firered-leafgreen": {
    platform: "Game Boy Advance",
    kind: "remake",
    mark: "FR / LG",
    accent: "#d25f48",
    logos: [logo("firered", "Pokémon FireRed Version"), logo("leafgreen", "Pokémon LeafGreen Version")],
  },
  "diamond-pearl": {
    platform: "Nintendo DS",
    kind: "mainline",
    mark: "D / P",
    accent: "#6682a5",
    logos: [logo("diamond", "Pokémon Diamond"), logo("pearl", "Pokémon Pearl")],
  },
  platinum: {
    platform: "Nintendo DS",
    kind: "enhanced",
    mark: "Pt",
    accent: "#7d8187",
    logos: [logo("platinum", "Pokémon Platinum")],
  },
  "heartgold-soulsilver": {
    platform: "Nintendo DS",
    kind: "remake",
    mark: "HG / SS",
    accent: "#ac8c4b",
    logos: [logo("heartgold", "Pokémon HeartGold"), logo("soulsilver", "Pokémon SoulSilver")],
  },
  "black-white": {
    platform: "Nintendo DS",
    kind: "mainline",
    mark: "B / W",
    accent: "#555555",
    logos: [logo("black", "Pokémon Black"), logo("white", "Pokémon White")],
  },
  "black-2-white-2": {
    platform: "Nintendo DS",
    kind: "sequel",
    mark: "B2 / W2",
    accent: "#4f6067",
    logos: [logo("black2", "Pokémon Black 2"), logo("white2", "Pokémon White 2")],
  },
  "x-y": {
    platform: "Nintendo 3DS",
    kind: "mainline",
    mark: "X / Y",
    accent: "#4e71aa",
    logos: [logo("x", "Pokémon X"), logo("y", "Pokémon Y")],
  },
  "omega-ruby-alpha-sapphire": {
    platform: "Nintendo 3DS",
    kind: "remake",
    mark: "OR / AS",
    accent: "#526f9b",
    logos: [logo("omegaruby", "Pokémon Omega Ruby"), logo("alphasapphire", "Pokémon Alpha Sapphire")],
  },
  "sun-moon": {
    platform: "Nintendo 3DS",
    kind: "mainline",
    mark: "S / M",
    accent: "#c68543",
    logos: [logo("sun", "Pokémon Sun"), logo("moon", "Pokémon Moon")],
  },
  "ultra-sun-ultra-moon": {
    platform: "Nintendo 3DS",
    kind: "enhanced",
    mark: "US / UM",
    accent: "#8f5c8b",
    logos: [logo("ultrasun", "Pokémon Ultra Sun"), logo("ultramoon", "Pokémon Ultra Moon")],
  },
  "lets-go-pikachu-lets-go-eevee": {
    platform: "Nintendo Switch",
    kind: "remake",
    mark: "LG",
    accent: "#c49b45",
    logos: [logo("letsgopikachu", "Pokémon: Let's Go, Pikachu!"), logo("letsgoeevee", "Pokémon: Let's Go, Eevee!")],
  },
  "sword-shield": {
    platform: "Nintendo Switch",
    kind: "mainline",
    mark: "SW / SH",
    accent: "#6a71aa",
    logos: [logo("sword", "Pokémon Sword"), logo("shield", "Pokémon Shield")],
  },
  "brilliant-diamond-and-shining-pearl": {
    platform: "Nintendo Switch",
    kind: "remake",
    mark: "BD / SP",
    accent: "#7388a4",
    logos: [logo("brilliantdiamond", "Pokémon Brilliant Diamond"), logo("shiningpearl", "Pokémon Shining Pearl")],
  },
  "legends-arceus": {
    platform: "Nintendo Switch",
    kind: "legends",
    mark: "LA",
    accent: "#68775a",
    logos: [logo("legendsarceus", "Pokémon Legends: Arceus")],
  },
  "scarlet-violet": {
    platform: "Nintendo Switch",
    kind: "mainline",
    mark: "S / V",
    accent: "#8c5a76",
    logos: [logo("scarlet", "Pokémon Scarlet"), logo("violet", "Pokémon Violet")],
  },
};

export const regionVisuals = {
  kanto: { accent: "#c9634e" },
  johto: { accent: "#aa8a43" },
  hoenn: { accent: "#408978" },
  sinnoh: { accent: "#687898" },
  unova: { accent: "#606060" },
  kalos: { accent: "#4d72a8" },
  alola: { accent: "#c38543" },
  galar: { accent: "#68659d" },
  hisui: { accent: "#817252" },
  paldea: { accent: "#8e5a72" },
};

export function getGameVisual(slug) {
  return gameVisuals[slug] || {
    platform: "Unknown platform",
    kind: "mainline",
    mark: slug?.slice(0, 2).toUpperCase() || "FD",
    accent: "#747067",
  };
}

export function getRegionVisual(slug) {
  return regionVisuals[slug] || { accent: "#747067" };
}
