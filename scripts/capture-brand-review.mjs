import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

// Non-deploying review capture. Run against the exact PR commit's built dist/ server.
// Does not invoke TENIR-Gov or perform external transactions.
const output = "brand-review";
mkdirSync(output, { recursive: true });
const source = process.env.REVIEW_SHA || "local";
const routes = [
  ["FR · Accueil", "/"],
  ["FR · Produits", "/portfolio/products/"],
  ["FR · Services", "/portfolio/services/"],
  ["FR · Démonstrations", "/portfolio/demos/"],
  ["FR · Rapport gratuit", "/parcours-ia/"],
  ["FR · Crédibilité", "/credibilite/"],
  ["EN · Home", "/en/"],
  ["EN · Products", "/en/portfolio/products/"],
  ["EN · Free report", "/en/ai-readiness/"]
];
const sizes = [
  ["desktop",1710,740],
  ["mobile",390,780]
];
const images = [];
const browser = await chromium.launch({ headless:true });
try {
  for (const theme of ["dark","light"]) {
    for (const [size,width,height] of sizes) {
      for (const [i,[label,route]] of routes.entries()) {
        const context = await browser.newContext({ viewport:{width,height}, colorScheme:theme, reducedMotion:"reduce" });
        await context.addInitScript(mode=>localStorage.setItem("tenir-theme",mode),theme);
        const page = await context.newPage();
        const errors=[];
        page.on("pageerror",e=>errors.push(e.message));
        await page.goto("http://127.0.0.1:4173"+route,{waitUntil:"networkidle"});
        const name = theme+"-"+size+"-"+String(i+1).padStart(2,"0")+".png";
        await page.screenshot({path:path.join(output,name),fullPage:false});
        const facts=await page.evaluate(()=>{
          const primary=document.querySelector(".ml-hero .ml-btn-primary, #pa-start");
          const box=primary?.getBoundingClientRect();
          return {
            bodyBackground:getComputedStyle(document.body).backgroundColor,
            accent:getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
            overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
            heroActionBottom:box?Math.round(box.bottom):null,
            heroActionInViewport:box?box.bottom<=window.innerHeight:null
          };
        });
        if(errors.length)throw new Error("JavaScript error on "+route+": "+errors.join("; "));
        if(facts.overflow>2)throw new Error("Horizontal overflow: "+route+" / "+size+" / "+theme+" / "+facts.overflow);
        if((route==="/"||route==="/en/"||route==="/parcours-ia/"||route==="/en/ai-readiness/")&&!facts.heroActionInViewport){
          throw new Error("Main action below fold: "+route+" / "+size+" / "+theme+" at "+facts.heroActionBottom);
        }
        images.push({label,route,theme,size,name,facts});
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
const esc = x=>String(x).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
const cards = images.map(it=>'<article><h2>'+esc(it.label)+' · '+it.theme+' / '+it.size+'</h2><img loading="lazy" src="'+esc(it.name)+'" alt="'+esc(it.label)+'"><p>'+esc(it.route)+' · BG '+esc(it.facts.bodyBackground)+(it.facts.heroActionBottom!==null?" · Action y="+it.facts.heroActionBottom:"")+'</p></article>').join("\n");
const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TENIR Labs · Revue de cohérence visuelle</title><style>body{font:16px/1.5 system-ui,sans-serif;background:#f3f6fa;color:#0d1b2a;margin:0;padding:2rem}header{max-width:80rem;margin:auto;padding-bottom:1rem}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:1.2rem;max-width:95rem;margin:auto}article{background:white;border:1px solid #d8e2ef;border-radius:12px;padding:1rem;overflow:hidden}article img{width:100%;height:auto;border:1px solid #dce5ef}h2{font-size:1rem;margin:.25rem 0 .8rem}p{color:#52647d;font-size:.8rem}</style></head><body><header><h1>TENIR Labs · Revue avant publication</h1><p>Commit exact : '+esc(source)+' · Captures du site construit en français et anglais, modes clair/sombre, desktop 1710×740 et mobile 390×780. Aucun déploiement.</p></header><main>'+cards+'</main></body></html>';
writeFileSync(path.join(output,"index.html"),html);
writeFileSync(path.join(output,"data.json"),JSON.stringify({source,images},null,2));
console.log("Visual review: "+images.length+" screenshots from "+source+"; no deployment.");
