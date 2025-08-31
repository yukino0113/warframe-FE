import { PrimeSet, PrimePart } from "@/data/mockData";

// External API types
export type PrimeStatusItem = {
  warframe_set: string;
  status: '0' | '1';
  type: string;
  parts: { parts: string; id: number }[];
};

const STATUS_CACHE_KEY = 'prime_status_raw_v1';
const SETS_CACHE_KEY = 'prime_sets_built_v2';
const DROP_RESULT_KEY = 'reliquary_drop_result_v1';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function getCachedPrimeStatus(): PrimeStatusItem[] | null {
  try {
    const raw = sessionStorage.getItem(STATUS_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCachedPrimeStatus(data: PrimeStatusItem[]) {
  try {
    sessionStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore storage write errors (private mode / quota)
  }
}

export function getCachedPrimeSets(): PrimeSet[] | null {
  try {
    const raw = sessionStorage.getItem(SETS_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCachedPrimeSets(data: PrimeSet[]) {
  try {
    sessionStorage.setItem(SETS_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore storage write errors
  }
}

export async function fetchPrimeStatusOnce(): Promise<PrimeStatusItem[]> {
  const cached = getCachedPrimeStatus();
  if (cached && Array.isArray(cached) && cached.length > 0) return cached;

  const statusUrl = (import.meta as ImportMeta).env?.VITE_STATUS_URL || '/api/prime/status';
  const res = await fetch(statusUrl, { method: 'GET' });
  if (!res.ok) throw new Error(`Status API error: ${res.status}`);
  const data: PrimeStatusItem[] = await res.json();
  setCachedPrimeStatus(data);
  return data;
}

export function buildPrimeSetsFromStatus(data: PrimeStatusItem[]): PrimeSet[] {
  const typeMap: Record<string, PrimeSet['type']> = {
    'Warframe': 'Warframe',
    'Primary': 'Primary Weapon',
    'Primary Weapon': 'Primary Weapon',
    'Secondary': 'Secondary Weapon',
    'Secondary Weapon': 'Secondary Weapon',
    'Melee': 'Melee Weapon',
    'Melee Weapon': 'Melee Weapon',
  };

  const sets: PrimeSet[] = data
    .filter(item => Array.isArray(item.parts) && item.parts.length > 0)
    .map((item) => {
      const baseName = item.warframe_set.trim();
      const setName = /prime$/i.test(baseName) ? baseName : `${baseName} Prime`;
      const setId = slugify(setName);
      const mappedType = typeMap[(item.type || '').trim()] || 'Warframe';

      const parts: PrimePart[] = item.parts.map((p) => {
        const partName = p.parts || '';
        const partIdStr = `${setId}-${slugify(partName || String(p.id))}`;
        return {
          id: partIdStr,
          name: partName || String(p.id),
          setName,
          type: mappedType,
          rarity: 'Common',
          isVaulted: item.status === '1',
          ducats: 0,
          relics: [],
          apiId: p.id,
        };
      });

      return {
        id: setId,
        name: setName,
        type: mappedType,
        isVaulted: item.status === '1',
        parts,
        masteryRank: 0,
        image: undefined,
      };
    });

  return sets;
}

export async function getPrimeSetsSession(): Promise<PrimeSet[]> {
  const cachedSets = getCachedPrimeSets();
  if (cachedSets && cachedSets.length > 0) return cachedSets;

  try {
    const status = await fetchPrimeStatusOnce();
    const built = buildPrimeSetsFromStatus(status);
    setCachedPrimeSets(built);
    return built;
  } catch {
    // On error, cache and return an empty list to avoid repeated attempts this session
    setCachedPrimeSets([]);
    return [];
  }
}

// Drop search results persistence
export function saveDropSearchResult(result: unknown) {
  try {
    sessionStorage.setItem(DROP_RESULT_KEY, JSON.stringify(result));
  } catch (e) {
    // ignore storage write errors
  }
}
export function getDropSearchResult(): unknown | null {
  try {
    const raw = sessionStorage.getItem(DROP_RESULT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
