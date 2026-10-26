import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const pages = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) pages.push(full);
  }
}

function pageUrl(file) {
  const rel = path.relative(dist, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404.html";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

await walk(dist);

const byUrl = new Map();
const ids = new Map();

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const url = pageUrl(file);
  byUrl.set(url, html);
  const found = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) found.add(match[1]);
  ids.set(url, found);
}

const failures = [];

function resolveHref(from, href) {
  if (href.startsWith("/")) return href;
  const base = from.endsWith("/") ? from : path.posix.dirname(from) + "/";
  return path.posix.normalize(base + href);
}

async function exists(urlPath) {
  const rel = urlPath.replace(/^\//, "");
  try {
    await access(path.join(dist, rel));
    return true;
  } catch {
    return false;
  }
}

for (const [url, html] of byUrl) {
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (
      raw.startsWith("mailto:") ||
      raw.startsWith("http://") ||
      raw.startsWith("https://") ||
      raw.startsWith("data:") ||
      raw.startsWith("#")
    ) {
      if (raw.startsWith("#") && raw.length > 1 && !ids.get(url)?.has(decodeURIComponent(raw.slice(1)))) {
        failures.push(`${url} → missing anchor ${raw}`);
      }
      continue;
    }
    const [pathWithQuery, hash] = raw.split("#");
    const [pathPart] = pathWithQuery.split("?");
    const target = resolveHref(url, pathPart || "/");
    const fileLike = /\.[a-z0-9]+$/i.test(target);
    if (fileLike) {
      if (!(await exists(target))) failures.push(`${url} → missing file ${raw}`);
      continue;
    }
    const normalized = target.endsWith("/") ? target : `${target}/`;
    const candidates = [normalized, target].filter(Boolean);
    const hit = candidates.find((candidate) => byUrl.has(candidate));
    if (!hit) {
      failures.push(`${url} → missing page ${raw}`);
      continue;
    }
    if (hash && !ids.get(hit)?.has(decodeURIComponent(hash))) {
      failures.push(`${url} → missing anchor ${raw}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`\n${failures.length} broken internal link(s).`);
  process.exit(1);
}

console.log(`Checked ${byUrl.size} pages. No broken internal links.`);
