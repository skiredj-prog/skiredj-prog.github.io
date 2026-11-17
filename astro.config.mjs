// @ts-check
import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";
const baseSlash = base.endsWith("/") ? base : `${base}/`;

export default defineConfig({
  site: "https://tenirlabs.cc",
  base,
  trailingSlash: "always",
  // Services merged into Products (Nov. 2026): the old address still lands on the offer.
  redirects: {
    "/portfolio/services/": `${baseSlash}portfolio/products/#pf-available-title`,
    "/en/portfolio/services/": `${baseSlash}en/portfolio/products/#pf-available-title`,
    // One offer, one page: the diagnostic pages it replaces point to it.
    "/portfolio/diagnostic/": `${baseSlash}offre/`,
    "/en/portfolio/diagnostic/": `${baseSlash}en/offer/`,
    "/diagnostic-execution/": `${baseSlash}offre/`,
    "/en/diagnostic-execution/": `${baseSlash}en/offer/`,
  },
});
