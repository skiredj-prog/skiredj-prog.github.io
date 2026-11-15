// @ts-check
import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site: "https://tenirlabs.cc",
  base,
  trailingSlash: "always",
  // Services merged into Products (Nov. 2026): the old address still lands on the offer.
  redirects: {
    "/portfolio/services/": `${base}portfolio/products/#pf-available-title`,
    "/en/portfolio/services/": `${base}en/portfolio/products/#pf-available-title`,
  },
});
