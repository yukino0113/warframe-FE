export function normalizeBaseUrl(raw: string | undefined | null): string {
  const base = (raw || "/").trim();
  // Remove trailing slashes but keep root
  const noTrailing = base.replace(/\/+$/, "");
  return noTrailing || "/";
}

export function getRouterBasename(): string {
  // import.meta.env.BASE_URL exists at runtime in Vite apps
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const raw = import.meta?.env?.BASE_URL as string | undefined;
  return normalizeBaseUrl(raw);
}
