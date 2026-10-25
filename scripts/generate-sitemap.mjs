import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root='dist';
const origin='https://tenirlabs.cc';
const base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
const urls=[];
async function visit(folder) {
 for (const f of await readdir(folder,{withFileTypes:true})) {
  const path=join(folder,f.name);
  if (f.isDirectory()) await visit(path);
  else if(f.isFile()&&f.name==='index.html') {
    const folderPath=relative(root,folder).split(sep).join('/');
    urls.push(folderPath?'/'+folderPath+'/':'/');
  }
 }
}
const escaped=(s)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
await visit(root);
urls.sort();
const present=new Set(urls);
const full=(path)=>origin+base+path;
const entries=urls.map(path=>{
 let alternates='';
 if(path.startsWith('/portfolio/')&&present.has('/en'+path)) {
   alternates='\n    <xhtml:link rel="alternate" hreflang="fr" href="'+escaped(full(path))+'"/>'+
              '\n    <xhtml:link rel="alternate" hreflang="en" href="'+escaped(full('/en'+path))+'"/';
 }else if(path.startsWith('/en/portfolio/')&&present.has(path.slice(3))) {
   alternates='\n    <xhtml:link rel="alternate" hreflang="fr" href="'+escaped(full(path.slice(3)))+'"/>'+
              '\n    <xhtml:link rel="alternate" hreflang="en" href="'+escaped(full(path))+'"/';
 }
 return '  <url><loc>'+escaped(full(path))+'</loc>'+alternates+'</url>';
});
const xml='<?xml version="1.0" encoding="UTF-8"?>\n'+
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+
  entries.join('\n')+'\n</urlset>\n';
await writeFile(join(root,'sitemap.xml'),xml);
console.log('Generated sitemap.xml with '+urls.length+' crawlable HTML page routes, including portfolio FR/EN alternatives.');
