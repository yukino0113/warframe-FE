// Mock data for Warframe Reliquary - Replace with real API calls

export interface PrimePart {
  id: string;
  name: string;
  setName: string;
  type: 'Warframe' | 'Primary Weapon' | 'Secondary Weapon' | 'Melee Weapon';
  rarity: 'Common' | 'Uncommon' | 'Rare';
  isVaulted: boolean;
  ducats: number;
  relics: string[];
}

export interface PrimeSet {
  id: string;
  name: string;
  type: 'Warframe' | 'Primary Weapon' | 'Secondary Weapon' | 'Melee Weapon';
  isVaulted: boolean;
  parts: PrimePart[];
  masteryRank?: number;
  image?: string;
}

export interface RelicData {
  name: string;
  type: 'Lith' | 'Meso' | 'Neo' | 'Axi';
  rewards: {
    name: string;
    rarity: 'Common' | 'Uncommon' | 'Rare';
    chance: number;
  }[];
  isVaulted: boolean;
  bestFarmLocation: string;
  averageTime: string;
}

export interface FarmLocation {
  mission: string;
  planet: string;
  type: string;
  level: string;
  dropChance: number;
  averageTime: string;
  efficiency: number; // 1-10 rating
}

export interface WorldStateData {
  fissures: Fissure[];
  invasions: Invasion[];
  alerts: Alert[];
  nightwave: Nightwave;
  baro: BaroKiTeer;
  sorties: Sortie;
  archonHunt: ArchonHunt;
}

export interface Fissure {
  id: string;
  node: string;
  planet: string;
  missionType: string;
  level: string;
  tier: 'Lith' | 'Meso' | 'Neo' | 'Axi' | 'Requiem';
  timeLeft: string;
  isStorm: boolean;
  isHard: boolean;
}

export interface Invasion {
  id: string;
  node: string;
  planet: string;
  attacker: string;
  defender: string;
  attackerReward: string;
  defenderReward: string;
  completion: number;
  eta: string;
}

export interface Alert {
  id: string;
  node: string;
  planet: string;
  missionType: string;
  level: string;
  reward: string;
  timeLeft: string;
}

export interface Nightwave {
  season: string;
  phase: number;
  timeLeft: string;
  challenges: {
    daily: { name: string; standing: number; completed: boolean }[];
    weekly: { name: string; standing: number; completed: boolean }[];
  };
}

export interface BaroKiTeer {
  location: string;
  timeLeft: string;
  inventory: {
    name: string;
    ducats: number;
    credits: number;
  }[];
}

export interface Sortie {
  boss: string;
  faction: string;
  missions: {
    node: string;
    type: string;
    modifier: string;
  }[];
  timeLeft: string;
}

export interface ArchonHunt {
  boss: string;
  missions: {
    node: string;
    type: string;
  }[];
  timeLeft: string;
}

// Mock Prime Parts Data
export const mockPrimeParts: PrimePart[] = [
  // Excalibur Prime
  { id: 'excalibur-prime-systems', name: 'Excalibur Prime Systems', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
  { id: 'excalibur-prime-chassis', name: 'Excalibur Prime Chassis', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'excalibur-prime-neuroptics', name: 'Excalibur Prime Neuroptics', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'excalibur-prime-blueprint', name: 'Excalibur Prime Blueprint', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
  
  // Mag Prime
  { id: 'mag-prime-systems', name: 'Mag Prime Systems', setName: 'Mag Prime', type: 'Warframe', rarity: 'Rare', isVaulted: false, ducats: 100, relics: ['Lith M4', 'Meso M3'] },
  { id: 'mag-prime-chassis', name: 'Mag Prime Chassis', setName: 'Mag Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Neo M2', 'Axi M1'] },
  { id: 'mag-prime-neuroptics', name: 'Mag Prime Neuroptics', setName: 'Mag Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Lith M4', 'Neo M2'] },
  { id: 'mag-prime-blueprint', name: 'Mag Prime Blueprint', setName: 'Mag Prime', type: 'Warframe', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Meso M3', 'Axi M1'] },

  // Braton Prime
  { id: 'braton-prime-barrel', name: 'Braton Prime Barrel', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
  { id: 'braton-prime-receiver', name: 'Braton Prime Receiver', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'braton-prime-stock', name: 'Braton Prime Stock', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'braton-prime-blueprint', name: 'Braton Prime Blueprint', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },

  // Soma Prime
  { id: 'soma-prime-barrel', name: 'Soma Prime Barrel', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Rare', isVaulted: false, ducats: 100, relics: ['Neo S7', 'Axi S3'] },
  { id: 'soma-prime-receiver', name: 'Soma Prime Receiver', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Lith S8', 'Meso S1'] },
  { id: 'soma-prime-stock', name: 'Soma Prime Stock', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Neo S7', 'Meso S1'] },
  { id: 'soma-prime-blueprint', name: 'Soma Prime Blueprint', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Axi S3', 'Lith S8'] },

  // Lex Prime
  { id: 'lex-prime-barrel', name: 'Lex Prime Barrel', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
  { id: 'lex-prime-receiver', name: 'Lex Prime Receiver', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'lex-prime-blueprint', name: 'Lex Prime Blueprint', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },

  // Bo Prime
  { id: 'bo-prime-handle', name: 'Bo Prime Handle', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
  { id: 'bo-prime-ornament', name: 'Bo Prime Ornament', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
  { id: 'bo-prime-blueprint', name: 'Bo Prime Blueprint', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
];

// Mock Relic Data
export const mockRelics: RelicData[] = [
  {
    name: 'Lith M4',
    type: 'Lith',
    rewards: [
      { name: 'Mag Prime Systems', rarity: 'Rare', chance: 2 },
      { name: 'Mag Prime Neuroptics', rarity: 'Uncommon', chance: 11 },
      { name: 'Forma Blueprint', rarity: 'Common', chance: 25.33 },
    ],
    isVaulted: false,
    bestFarmLocation: 'Hepit, Void',
    averageTime: '2-3 min'
  },
  {
    name: 'Neo S7',
    type: 'Neo',
    rewards: [
      { name: 'Soma Prime Barrel', rarity: 'Rare', chance: 2 },
      { name: 'Soma Prime Stock', rarity: 'Common', chance: 25.33 },
      { name: 'Odonata Prime Systems', rarity: 'Uncommon', chance: 11 },
    ],
    isVaulted: false,
    bestFarmLocation: 'Ukko, Void',
    averageTime: '4-5 min'
  },
];

// Mock Farm Locations
export const mockFarmLocations: FarmLocation[] = [
  {
    mission: 'Hepit',
    planet: 'Void',
    type: 'Capture',
    level: '10-15',
    dropChance: 100,
    averageTime: '2-3 min',
    efficiency: 10
  },
  {
    mission: 'Ukko',
    planet: 'Void',
    type: 'Capture',
    level: '40-45',
    dropChance: 100,
    averageTime: '4-5 min',
    efficiency: 9
  },
  {
    mission: 'Mot',
    planet: 'Void',
    type: 'Survival',
    level: '80-100',
    dropChance: 100,
    averageTime: '20 min (C rotation)',
    efficiency: 7
  },
];

// Mock World State Data
export const mockWorldState: WorldStateData = {
  fissures: [
    {
      id: '1',
      node: 'Hepit',
      planet: 'Void',
      missionType: 'Capture',
      level: '10-15',
      tier: 'Lith',
      timeLeft: '2h 34m',
      isStorm: false,
      isHard: false
    },
    {
      id: '2',
      node: 'Ukko',
      planet: 'Void',
      missionType: 'Capture',
      level: '40-45',
      tier: 'Neo',
      timeLeft: '1h 12m',
      isStorm: true,
      isHard: false
    },
    {
      id: '3',
      node: 'Mot',
      planet: 'Void',
      missionType: 'Survival',
      level: '80-100',
      tier: 'Axi',
      timeLeft: '45m',
      isStorm: false,
      isHard: true
    },
  ],
  invasions: [
    {
      id: '1',
      node: 'Earth - Gaia',
      planet: 'Earth',
      attacker: 'Grineer',
      defender: 'Corpus',
      attackerReward: 'Fieldron',
      defenderReward: 'Mutagen Mass',
      completion: 67,
      eta: '3h 21m'
    },
  ],
  alerts: [
    {
      id: '1',
      node: 'Mars - Olympus',
      planet: 'Mars',
      missionType: 'Disruption',
      level: '15-20',
      reward: 'Nitain Extract',
      timeLeft: '1h 45m'
    },
  ],
  nightwave: {
    season: 'Nora\'s Mix Volume III',
    phase: 1,
    timeLeft: '67d 14h',
    challenges: {
      daily: [
        { name: 'Complete 3 Missions', standing: 1000, completed: true },
        { name: 'Kill 100 Enemies', standing: 1000, completed: false },
      ],
      weekly: [
        { name: 'Complete 10 Void Fissure Missions', standing: 4300, completed: false },
        { name: 'Open 10 Relics', standing: 4300, completed: true },
      ]
    }
  },
  baro: {
    location: 'Kronia Relay (Saturn)',
    timeLeft: '2d 8h',
    inventory: [
      { name: 'Primed Continuity', ducats: 350, credits: 110000 },
      { name: 'Primed Flow', ducats: 350, credits: 110000 },
    ]
  },
  sorties: {
    boss: 'Phorid',
    faction: 'Infested',
    missions: [
      { node: 'Eris - Akkad', type: 'Defense', modifier: 'Augmented Enemy Armor' },
      { node: 'Eris - Zabala', type: 'Survival', modifier: 'Energy Reduction' },
      { node: 'Eris - Naeglar', type: 'Assassination', modifier: 'Eximus Stronghold' },
    ],
    timeLeft: '14h 23m'
  },
  archonHunt: {
    boss: 'Archon Boreal',
    missions: [
      { node: 'Mars - Olympus', type: 'Exterminate' },
      { node: 'Jupiter - Io', type: 'Defense' },
      { node: 'Neptune - Triton', type: 'Assassination' },
    ],
    timeLeft: '5d 2h'
  }
};

// Mock Prime Sets Data  
export const mockPrimeSets: PrimeSet[] = [
  {
    id: 'excalibur-prime',
    name: 'Excalibur Prime',
    type: 'Warframe',
    isVaulted: true,
    masteryRank: 0,
    parts: [
      { id: 'excalibur-prime-systems', name: 'Systems', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
      { id: 'excalibur-prime-chassis', name: 'Chassis', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'excalibur-prime-neuroptics', name: 'Neuroptics', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'excalibur-prime-blueprint', name: 'Blueprint', setName: 'Excalibur Prime', type: 'Warframe', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
    ]
  },
  {
    id: 'mag-prime',
    name: 'Mag Prime',
    type: 'Warframe',
    isVaulted: false,
    masteryRank: 0,
    parts: [
      { id: 'mag-prime-systems', name: 'Systems', setName: 'Mag Prime', type: 'Warframe', rarity: 'Rare', isVaulted: false, ducats: 100, relics: ['Lith M4', 'Meso M3'] },
      { id: 'mag-prime-chassis', name: 'Chassis', setName: 'Mag Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Neo M2', 'Axi M1'] },
      { id: 'mag-prime-neuroptics', name: 'Neuroptics', setName: 'Mag Prime', type: 'Warframe', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Lith M4', 'Neo M2'] },
      { id: 'mag-prime-blueprint', name: 'Blueprint', setName: 'Mag Prime', type: 'Warframe', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Meso M3', 'Axi M1'] },
    ]
  },
  {
    id: 'braton-prime',
    name: 'Braton Prime',
    type: 'Primary Weapon',
    isVaulted: true,
    masteryRank: 6,
    parts: [
      { id: 'braton-prime-barrel', name: 'Barrel', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
      { id: 'braton-prime-receiver', name: 'Receiver', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'braton-prime-stock', name: 'Stock', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'braton-prime-blueprint', name: 'Blueprint', setName: 'Braton Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
    ]
  },
  {
    id: 'soma-prime',
    name: 'Soma Prime',
    type: 'Primary Weapon',
    isVaulted: false,
    masteryRank: 7,
    parts: [
      { id: 'soma-prime-barrel', name: 'Barrel', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Rare', isVaulted: false, ducats: 100, relics: ['Neo S7', 'Axi S3'] },
      { id: 'soma-prime-receiver', name: 'Receiver', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Uncommon', isVaulted: false, ducats: 65, relics: ['Lith S8', 'Meso S1'] },
      { id: 'soma-prime-stock', name: 'Stock', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Neo S7', 'Meso S1'] },
      { id: 'soma-prime-blueprint', name: 'Blueprint', setName: 'Soma Prime', type: 'Primary Weapon', rarity: 'Common', isVaulted: false, ducats: 25, relics: ['Axi S3', 'Lith S8'] },
    ]
  },
  {
    id: 'lex-prime',
    name: 'Lex Prime',
    type: 'Secondary Weapon',
    isVaulted: true,
    masteryRank: 8,
    parts: [
      { id: 'lex-prime-barrel', name: 'Barrel', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
      { id: 'lex-prime-receiver', name: 'Receiver', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'lex-prime-blueprint', name: 'Blueprint', setName: 'Lex Prime', type: 'Secondary Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
    ]
  },
  {
    id: 'bo-prime',
    name: 'Bo Prime',
    type: 'Melee Weapon',
    isVaulted: true,
    masteryRank: 3,
    parts: [
      { id: 'bo-prime-handle', name: 'Handle', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Rare', isVaulted: true, ducats: 100, relics: [] },
      { id: 'bo-prime-ornament', name: 'Ornament', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Uncommon', isVaulted: true, ducats: 65, relics: [] },
      { id: 'bo-prime-blueprint', name: 'Blueprint', setName: 'Bo Prime', type: 'Melee Weapon', rarity: 'Common', isVaulted: true, ducats: 25, relics: [] },
    ]
  },
];