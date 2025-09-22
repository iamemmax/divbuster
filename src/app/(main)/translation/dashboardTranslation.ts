export const Dashbaordtranslations: Record<string, Record<string, string>> = {
  en: {
    search: "Search...",
    createDiveLog: "Create Dive Log",
    createDivePlan: "Create a Dive Plan",
    addBuddy: "Add a new Buddy",
    addCertification: "Add Certification",
  },
  es: {
    search: "Buscar...",
    createDiveLog: "Crear registro de buceo",
    createDivePlan: "Crear un plan de buceo",
    addBuddy: "Agregar un nuevo compañero",
    addCertification: "Agregar certificación",
  },
  fr: {
    search: "Rechercher...",
    createDiveLog: "Créer un journal de plongée",
    createDivePlan: "Créer un plan de plongée",
    addBuddy: "Ajouter un nouveau binôme",
    addCertification: "Ajouter une certification",
  },
  nl: {
    search: "Zoeken...",
    createDiveLog: "Duiklog maken",
    createDivePlan: "Een duikplan maken",
    addBuddy: "Nieuwe buddy toevoegen",
    addCertification: "Certificaat toevoegen",
  },
};


export const MonthlySnapShotTranslations: Record<string, Record<string, string>> = {
  en: {
    monthlySnapshot: "Monthly Snapshot",
    totalTokenBalance: "Total Token Balance:",
    viewHistory: "View History",
    totalDives: "Total Dives",
    totalBottomTime: "Total Bottom Time",
    diveSpots: "Dive Spots",
    maximumDepth: "Maximum Depth",
  },
  es: {
    monthlySnapshot: "Resumen mensual",
    totalTokenBalance: "Saldo total de tokens:",
    viewHistory: "Ver historial",
    totalDives: "Buceos totales",
    totalBottomTime: "Tiempo total en el fondo",
    diveSpots: "Sitios de buceo",
    maximumDepth: "Profundidad máxima",
  },
  fr: {
    monthlySnapshot: "Aperçu mensuel",
    totalTokenBalance: "Solde total de jetons :",
    viewHistory: "Voir l'historique",
    totalDives: "Plongées totales",
    totalBottomTime: "Temps total au fond",
    diveSpots: "Sites de plongée",
    maximumDepth: "Profondeur maximale",
  },
  nl: {
    monthlySnapshot: "Maandelijkse momentopname",
    totalTokenBalance: "Totale tokenbalans:",
    viewHistory: "Geschiedenis bekijken",
    totalDives: "Totaal aantal duiken",
    totalBottomTime: "Totale bodemtijd",
    diveSpots: "Duiklocaties",
    maximumDepth: "Maximale diepte",
  },
};
export const sugestedDriverTranslations: Record<string, Record<string, string>> = {
   en: {
    divers: "Suggested Divers",
    spots: "Suggested Dive Spots",
    products: "Suggested Products",
    challenges: "Suggested Challenges",
  },
  es: {
    divers: "Buceadores sugeridos",
    spots: "Lugares de buceo sugeridos",
    products: "Productos sugeridos",
    challenges: "Desafíos sugeridos",
  },
  fr: {
    divers: "Plongeurs suggérés",
    spots: "Sites de plongée suggérés",
    products: "Produits suggérés",
    challenges: "Défis suggérés",
  },
  nl: {
    divers: "Voorgestelde duikers",
    spots: "Voorgestelde duiklocaties",
    products: "Voorgestelde producten",
    challenges: "Voorgestelde uitdagingen",
  },
};
// translations/monthlyTabs.ts
export const monthlyTabsTranslations = {
  en: {
    thisMonth: "This month",
    lastMonth: "Last month",
    custom: "Custom",
  },
  es: {
    thisMonth: "Este mes",
    lastMonth: "El mes pasado",
    custom: "Personalizado",
  },
  fr: {
    thisMonth: "Ce mois-ci",
    lastMonth: "Le mois dernier",
    custom: "Personnalisé",
  },
  nl: {
    thisMonth: "Deze maand",
    lastMonth: "Vorige maand",
    custom: "Aangepast",
  },
};

export type Language = keyof typeof monthlyTabsTranslations;
