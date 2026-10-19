import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const prefix = (process.env.BASE_PATH || "/").replace(/\/$/, "");

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function prefixRoot(html) {
  if (!prefix) return html;
  return html.replace(/\s(href|src)="(\/[^"]*)"/g, (whole, attr, value) => {
    if (value.startsWith("//") || value.startsWith(`${prefix}/`) || value === prefix) return whole;
    return ` ${attr}="${prefix}${value}"`;
  });
}

function wrapTables(html) {
  return html.replace(/<table\b[\s\S]*?<\/table>/g, (table) => `<div class="table-scroll">${table}</div>`);
}

for (const file of await walk(dist)) {
  const html = wrapTables(prefixRoot(await readFile(file, "utf8")));
  await writeFile(file, html);
}
