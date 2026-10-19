// @ts-check
import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: "https://tenirlabs.cc",
  base,
  trailingSlash: "always",
});
