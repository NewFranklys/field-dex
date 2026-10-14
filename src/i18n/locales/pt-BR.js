export default {
  common: {
    skipToContent: "Pular para o conteúdo",
    brandHome: "Início do FIELD DEX",
    brandTagline: "Plataforma companheira de Pokémon",
    nav: { home: "Início", pokedex: "Pokédex", types: "Tipos", aria: "Navegação principal" },
    currentModule: { label: "Módulo atual", value: "Pesquisa de Espécies", aria: "Módulo público atual" },
    language: { label: "Idioma", en: "English", ptBR: "Português (Brasil)" },
    titles: {
      home: "FIELD DEX | Plataforma Companheira de Pokémon",
      pokedex: "National Dex | FIELD DEX",
      types: "Análise de Tipos | FIELD DEX",
      record: "Registro de Campo | FIELD DEX",
      notFound: "Página Não Encontrada | FIELD DEX"
    },
    pageNotFound: {
      title: "Página não encontrada",
      body: "Esta rota não está disponível na experiência atual do FIELD DEX.",
      action: "Abrir o arquivo atual de espécies →"
    },
    search: { pokemon: "Buscar Pokémon", button: "Buscar", placeholder: "Buscar nome ou #" },
    states: {
      searching: "Consultando o banco de pesquisa…",
      retry: "Tentar novamente",
      notFound: "Pokémon não encontrado.",
      unavailable: "O banco de pesquisa está temporariamente indisponível.",
      timeout: "A solicitação demorou demais. Tente novamente.",
      offline: "Não foi possível acessar o banco de pesquisa. Verifique sua conexão e tente novamente.",
      outOfScope: "Este registro está fora do escopo atual da National Dex.",
      alternateForm: "Esta forma alternativa ainda não é exibida no arquivo atual de espécies."
    },
    types: {
      normal: "Normal", fire: "Fogo", water: "Água", electric: "Elétrico", grass: "Planta", ice: "Gelo",
      fighting: "Lutador", poison: "Venenoso", ground: "Terrestre", flying: "Voador", psychic: "Psíquico", bug: "Inseto",
      rock: "Pedra", ghost: "Fantasma", dragon: "Dragão", dark: "Sombrio", steel: "Aço", fairy: "Fada"
    },
    habitats: {
      cave: "Caverna", forest: "Floresta", grassland: "Campo", mountain: "Montanha", rare: "Raro",
      "rough-terrain": "Terreno acidentado", sea: "Mar", urban: "Urbano", "waters-edge": "Margem d'água"
    },
    stats: {
      hp: "HP", attack: "Ataque", defense: "Defesa", "special-attack": "Atq. Esp.", "special-defense": "Def. Esp.", speed: "Velocidade"
    }
  },
  home: {
    eyebrow: "Plataforma Companheira de Pokémon",
    currentArchive: "Arquivo Atual",
    kantoRange: "National / 001—1025",
    sectionLabel: "Pesquisa de Espécies",
    title1: "Explore o mundo",
    title2: "uma espécie de cada vez.",
    description: "Explore a National Dex: pesquise espécies de todas as gerações, estude sua biologia, compare atributos base e acompanhe suas famílias evolutivas.",
    scopeNote: "Base pública atual · National Dex 001—1025",
    featured: "Espécime em Destaque",
    scanning: "Escaneando...",
    rescan: "Escanear novamente ↻",
    searchingArchive: "Consultando arquivo",
    specimen: "Espécime / {{number}}",
    viewRecord: "Ver registro →",
    type: "Tipo",
    height: "Altura",
    weight: "Peso",
    categoryFallback: "Pokémon do tipo {{type}}",
    encounter: {
      label: "Encontro", kicker: "Espécime desconhecido", title1: "Encontro", title2: "Aleatório",
      description: "Puxe uma entrada não identificada da National Dex atual.", action: "Iniciar varredura ↗"
    },
    archive: {
      label: "Arquivo de Espécies", kicker: "National Dex", title1: "Explorar", title2: "Pokédex",
      description: "Explore as espécies catalogadas da Geração I à IX.", action: "Abrir arquivo ↗"
    },
    typeModule: {
      label: "Classificação", kicker: "18 classes elementais", title1: "Explorar", title2: "Tipos",
      description: "Estude o sistema atual de tipos usando representantes de toda a National Dex.", action: "Ver classes ↗"
    },
    footer: "FIELD DEX · Arquivo atual: National Dex / 001—1025"
  },
  pokedex: {
    currentArchive: "Arquivo Atual",
    range: "National / 001—1025",
    eyebrow: "Pesquisa de Espécies / National Dex",
    title: "National Dex",
    description: "Explore o catálogo nacional de espécies do FIELD DEX. Filtre por geração, tipo, nome ou número sem carregar o arquivo inteiro de uma vez.",
    currentClassification: "Classificação Atual",
    allSpecies: "Todas as Espécies",
    searchSpecies: "Buscar Espécies",
    nameOrNumber: "Nome ou #",
    activeRecords: "Registros Ativos",
    generationFilter: "Geração",
    generationFilterAria: "Filtrar por geração",
    generationShort: "Geração",
    generationState: "Geração {{generation}} · {{region}}",
    national: "National Dex",
    allGenerations: "Todas",
    showing: "Exibindo {{visible}} de {{total}}",
    loadMore: "Carregar mais registros",
    filterAria: "Filtrar por tipo",
    allTypes: "Todos os Tipos",
    indexing: "Indexando National Dex...",
    noMatches: "Nenhum registro encontrado",
    noMatchesBody: "Tente outro nome, número, geração ou tipo.",
    clear: "Limpar busca e filtros",
    entry: "Entrada",
    viewRecord: "Ver registro de campo"
  },
  typesPage: {
    headerLabel: "Pesquisa de Tipos",
    headerValue: "Sistema Atual de Tipos",
    eyebrow: "Observatório de Classificação",
    title: "Análise de Tipos",
    description: "Estude as espécies da National Dex pelo sistema elemental atual e analise suas relações de batalha.",
    database: "Banco de Pesquisa",
    indexing: "Indexando",
    offline: "Offline",
    classesOnline: "18 Classes Ativas",
    navAria: "Tipos de Pokémon",
    loading: "Indexando pesquisa de tipos...",
    classification: "Classificação / {{index}}",
    kantoRecords: "espécies da National Dex\nregistradas",
    viewSpecies: "Ver espécies do tipo {{type}}",
    noRecords: "Nenhuma espécie registrada",
    battleData: "Os dados de classificação de batalha continuam disponíveis.",
    attackProfile: "Perfil de Ataque",
    offensive: "Relações ofensivas",
    superEffective: "Super Efetivo",
    notVeryEffective: "Pouco Efetivo",
    noEffect: "Sem Efeito",
    defenseProfile: "Perfil de Defesa",
    defensive: "Relações defensivas",
    weakTo: "Fraco Contra",
    resists: "Resiste a",
    immuneTo: "Imune a"
  },
  record: {
    databaseName: "Banco de Pesquisa Pokémon",
    back: "← Voltar ao arquivo de espécies",
    fieldRecord: "Registro de Campo / {{number}}",
    height: "Altura", weight: "Peso", habitat: "Habitat", generation: "Geração", abilities: "Habilidades", hidden: "oculta",
    registered: "Espécime registrado",
    categoryFallback: "Pokémon do tipo {{type}}",
    sourceFallback: "Texto de referência em {{language}}",
    statsTitle: "Análise de Atributos Base", statsSubtitle: "Valores base da espécie · escala 0–255",
    bstAria: "Total de atributos base",
    vocalization: "Vocalização", vocalizationSubtitle: "Som registrado da espécie",
    typeResponse: "Resposta de Tipo", typeSubtitle: "Análise de interação defensiva",
    typeUnavailable: "Dados de resposta de tipo indisponíveis.",
    typeContext: "Tabela de tipos atual. Habilidades, golpes e condições de batalha não estão incluídos.",
    weakTo: "Fraco Contra", resists: "Resiste a", immuneTo: "Imune a", none: "Nenhum",
    evolutionTitle: "Registro de Evolução", evolutionSubtitle: "Família evolutiva registrada · National Dex",
    extendedFamily: "Esta família contém espécies fora do escopo público atual. Os registros disponíveis são exibidos abaixo.",
    evolutionUnavailable: "Dados de evolução indisponíveis.",
    currentRecord: "Registro atual", outsideKanto: "fora do arquivo", from: "De {{name}}{{suffix}} →", familyOrigin: "Origem da família",
    noFurther: "Nenhuma evolução adicional registrada.",
    sizeComparisonAria: "Comparação de tamanho",
    sizeComparisonTitle: "Referência de Escala",
    sizeComparisonSubtitle: "Altura da espécie comparada a uma referência humana de 1,75 m",
    humanReference: "Referência humana",
    spriteArchiveTitle: "Arquivo do Espécime",
    spriteArchiveSubtitle: "Representações históricas nos jogos por geração",
    spriteUnavailable: "Sem sprite arquivado",
    adjacentAria: "Registros de Pokémon adjacentes", previous: "← Registro Anterior", next: "Próximo Registro →",
    cry: {
      unavailable: "Nenhum som registrado disponível.", pause: "Pausar som", play: "Reproduzir som", loading: "Carregando…", playing: "Reproduzindo", playLabel: "Reproduzir Som",
      error: "Não foi possível reproduzir o som. Você pode tentar novamente."
    },
    warnings: {
      speciesNotes: "Notas da espécie indisponíveis.", typeResponse: "Resposta de tipo indisponível.", evolutionFamily: "Família evolutiva indisponível.",
      suffix: "O restante do registro disponível é exibido abaixo."
    },
    evolution: {
      base: "Forma base", missing: "Método não registrado", trade: "Troca", holding: "segurando {{item}}", friendship: "Amizade alta",
      affection: "Afeição {{value}}+", beauty: "Beleza {{value}}+", at: "em {{location}}", knowing: "conhecendo {{move}}",
      knowingType: "conhecendo um golpe {{type}}", rain: "Chuva", female: "Fêmea", male: "Macho", day: "Dia", night: "Noite"
    }
  }
};
