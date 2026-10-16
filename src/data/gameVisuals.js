export const gameVisuals = {
  "red-blue": { platform: "Game Boy", kind: "mainline", mark: "R / B", accent: "#ca5a50" },
  yellow: { platform: "Game Boy", kind: "enhanced", mark: "Y", accent: "#d2aa31" },
  "gold-silver": { platform: "Game Boy Color", kind: "mainline", mark: "G / S", accent: "#b4974c" },
  crystal: {
    platform: "Game Boy Color",
    kind: "enhanced",
    mark: "C",
    accent: "#5f84ae",
    logos: [
      {
        label: "Pokémon Crystal",
        src: "https://archives.bulbagarden.net/wiki/Special:Redirect/file/Pokemoncrystal.logo.png",
        source: "https://archives.bulbagarden.net/wiki/File:Pokemoncrystal.logo.png",
      },
    ],
  },
  "ruby-sapphire": { platform: "Game Boy Advance", kind: "mainline", mark: "R / S", accent: "#546fa1" },
  emerald: { platform: "Game Boy Advance", kind: "enhanced", mark: "E", accent: "#39886c" },
  "firered-leafgreen": {
    platform: "Game Boy Advance",
    kind: "remake",
    mark: "FR / LG",
    accent: "#d25f48",
    logos: [
      {
        label: "Pokémon FireRed Version",
        src: "https://archives.bulbagarden.net/wiki/Special:Redirect/file/Pokemon_FireRed_Logo_EN.png",
        source: "https://archives.bulbagarden.net/wiki/File:Pokemon_FireRed_Logo_EN.png",
      },
      {
        label: "Pokémon LeafGreen Version",
        src: "https://archives.bulbagarden.net/wiki/Special:Redirect/file/Pokemon_LeafGreen_Logo_EN.png",
        source: "https://bulbapedia.bulbagarden.net/wiki/File:Pokemon_LeafGreen_Logo_EN.png",
      },
    ],
  },
  "diamond-pearl": { platform: "Nintendo DS", kind: "mainline", mark: "D / P", accent: "#6682a5" },
  platinum: { platform: "Nintendo DS", kind: "enhanced", mark: "Pt", accent: "#7d8187" },
  "heartgold-soulsilver": { platform: "Nintendo DS", kind: "remake", mark: "HG / SS", accent: "#ac8c4b" },
  "black-white": { platform: "Nintendo DS", kind: "mainline", mark: "B / W", accent: "#555555" },
  "black-2-white-2": { platform: "Nintendo DS", kind: "sequel", mark: "B2 / W2", accent: "#4f6067" },
  "x-y": { platform: "Nintendo 3DS", kind: "mainline", mark: "X / Y", accent: "#4e71aa" },
  "omega-ruby-alpha-sapphire": { platform: "Nintendo 3DS", kind: "remake", mark: "OR / AS", accent: "#526f9b" },
  "sun-moon": { platform: "Nintendo 3DS", kind: "mainline", mark: "S / M", accent: "#c68543" },
  "ultra-sun-ultra-moon": { platform: "Nintendo 3DS", kind: "enhanced", mark: "US / UM", accent: "#8f5c8b" },
  "lets-go-pikachu-lets-go-eevee": { platform: "Nintendo Switch", kind: "remake", mark: "LG", accent: "#c49b45" },
  "sword-shield": { platform: "Nintendo Switch", kind: "mainline", mark: "SW / SH", accent: "#6a71aa" },
  "brilliant-diamond-and-shining-pearl": { platform: "Nintendo Switch", kind: "remake", mark: "BD / SP", accent: "#7388a4" },
  "legends-arceus": {
    platform: "Nintendo Switch",
    kind: "legends",
    mark: "LA",
    accent: "#68775a",
    logos: [
      {
        label: "Pokémon Legends: Arceus",
        src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pok%C3%A9mon_Legends_Arceus_Logo.png",
        source: "https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Legends_Arceus_Logo.png",
      },
    ],
  },
  "scarlet-violet": { platform: "Nintendo Switch", kind: "mainline", mark: "S / V", accent: "#8c5a76" },
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
