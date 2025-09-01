#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const INDEX = path.join(DIST, 'index.html');

function fail(msg) {
  console.error("GH Pages verification failed:\n" + msg);
  process.exit(1);
}

if (!fs.existsSync(DIST)) fail(`dist folder not found at ${DIST}. Did you run the build?`);
if (!fs.existsSync(INDEX)) fail(`dist/index.html not found. Vite may not have produced an index.html`);

const html = fs.readFileSync(INDEX, 'utf8');

function normalizeBase(raw) {
  if (!raw) return null;
  let b = String(raw).trim();
  if (!b.startsWith('/')) b = '/' + b;
  if (!b.endsWith('/')) b = b + '/';
  return b;
}

// Determine expected base path
let expectedBase = normalizeBase(process.env.VITE_BASE_PATH);

// If not provided, derive from GitHub env (owner/repo)
if (!expectedBase) {
  const repo = process.env.GITHUB_REPOSITORY; // e.g., "owner/repo"
  if (repo && repo.includes('/')) {
    const repoName = repo.split('/')[1];
    expectedBase = normalizeBase(`/${repoName}/`);
  }
}

if (!expectedBase) {
  fail('Unable to determine expected base path. Set VITE_BASE_PATH="/<repo>/" when running locally, or ensure GITHUB_REPOSITORY is set in CI.');
}

const baseTag = /<base\s+href="([^"]+)"\s*\/>/i.exec(html);
if (!baseTag) fail('No <base href="..." /> tag found in dist/index.html');
const actualBase = baseTag[1];

if (actualBase !== expectedBase) {
  fail(`Base href mismatch. Expected '${expectedBase}' but found '${actualBase}'.`);
}

// Simple heuristics: ensure built asset links include the base, or are relative
const assetHrefRegex = /<(?:link|script)\b[^>]+(?:href|src)="([^"]+)"/g;
let m;
let problems = [];
while ((m = assetHrefRegex.exec(html))) {
  const url = m[1];
  if (url.startsWith('http') || url.startsWith('data:')) continue; // external or inlined
  if (url.startsWith('./') || url.startsWith('../')) continue; // relative is ok
  if (!url.startsWith(expectedBase)) {
    problems.push(url);
  }
}

if (problems.length) {
  fail(`Found asset URLs not prefixed with base '${expectedBase}':\n - ${problems.join('\n - ')}`);
}

console.log('GH Pages verification passed. base =', expectedBase);
