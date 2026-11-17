const root=document.documentElement;
const themeButton=document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
function syncTheme(){const dark=root.dataset.theme==='dark';themeButton?.setAttribute('aria-pressed',String(dark));themeButton?.setAttribute('aria-label',(dark?themeButton.dataset.labelLight:themeButton.dataset.labelDark)||'Theme');document.querySelector('meta[name="theme-color"]')?.setAttribute('content','#0c141d');}
syncTheme();
themeButton?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('tenir-theme',root.dataset.theme);}catch(e){}syncTheme();});
const menuButton=document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav=document.querySelector<HTMLElement>('#main-navigation');
const contactSituation=new URLSearchParams(location.search).get('situation');
const businessProfile=new URLSearchParams(location.search).get('profil');
if(document.querySelector('.contact-page')&&businessProfile&&['services','produit','operations'].includes(businessProfile)){
  document.querySelectorAll<HTMLAnchorElement>('.lang a,.nav-mobile-lang').forEach(link=>{const destination=new URL(link.href);destination.searchParams.set('profil',businessProfile);link.href=destination.href;});
}
if(document.querySelector('.contact-page')&&contactSituation&&['decouvrir','deleguer','concevoir','examiner','etudier'].includes(contactSituation)){
  document.querySelectorAll<HTMLAnchorElement>('.lang a,.nav-mobile-lang').forEach(link=>{const destination=new URL(link.href);destination.searchParams.set('situation',contactSituation);link.href=destination.href;});
}
const openBusinessProfile=()=>{const id=location.hash.slice(1);document.querySelectorAll<HTMLDetailsElement>('.persona-card').forEach(card=>{if(card.id===id)card.open=true;});};
openBusinessProfile();
window.addEventListener('hashchange',openBusinessProfile);
// Section menus. One open at a time. On a wide screen with a mouse, hovering opens a menu and a click keeps it open;
// everywhere else the section button toggles it. Escape, a click outside or focus leaving closes it.
const wideNav=matchMedia('(min-width: 1101px)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const navItems=Array.from(document.querySelectorAll<HTMLElement>('[data-nav-item]'));
const navTrigger=(item:HTMLElement)=>item.querySelector<HTMLButtonElement>('[data-nav-trigger]');
let pinnedItem:HTMLElement|null=null,hoverTimer=0;
const setNavItem=(item:HTMLElement,open:boolean)=>{item.toggleAttribute('data-open',open);navTrigger(item)?.setAttribute('aria-expanded',String(open));if(!open&&pinnedItem===item)pinnedItem=null;};
const closeNavItems=(except?:HTMLElement)=>navItems.forEach(item=>{if(item!==except)setNavItem(item,false);});
const closeNavPanels=(focus=false)=>{const open=navItems.find(item=>item.hasAttribute('data-open'));window.clearTimeout(hoverTimer);closeNavItems();if(focus&&open)navTrigger(open)?.focus();return Boolean(open);};
navItems.forEach(item=>{
  navTrigger(item)?.addEventListener('click',()=>{
    window.clearTimeout(hoverTimer);
    if(item.hasAttribute('data-open')&&pinnedItem===item){setNavItem(item,false);return;}
    closeNavItems(item);setNavItem(item,true);pinnedItem=item;
  });
  const hovering=(event:PointerEvent)=>event.pointerType==='mouse'&&wideNav.matches&&finePointer.matches;
  item.addEventListener('pointerenter',event=>{if(!hovering(event))return;window.clearTimeout(hoverTimer);hoverTimer=window.setTimeout(()=>{closeNavItems(item);setNavItem(item,true);},90);});
  item.addEventListener('pointerleave',event=>{if(!hovering(event))return;window.clearTimeout(hoverTimer);if(pinnedItem===item)return;hoverTimer=window.setTimeout(()=>setNavItem(item,false),220);});
  // Focus leaving the item closes it. With no next target (focus left the document), close unless the pointer is still over the item.
  item.addEventListener('focusout',event=>{const next=event.relatedTarget as Node|null;if(wideNav.matches&&(next?!item.contains(next):!item.matches(':hover')))setNavItem(item,false);});
});
const closeMenu=(focus=false)=>{closeNavPanels();menuButton?.setAttribute('aria-expanded','false');nav?.removeAttribute('data-open');if(focus)menuButton?.focus();};
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';if(!open)closeNavPanels();menuButton.setAttribute('aria-expanded',String(open));nav?.toggleAttribute('data-open',open);});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(wideNav.matches){closeNavPanels(true);return;}if(menuButton?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{const target=event.target as Element;if(!target.closest?.('[data-nav-item]'))closeNavPanels();if(nav?.contains(target)||menuButton?.contains(target))return;closeMenu();});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
wideNav.addEventListener('change',()=>closeMenu());
const toc=document.querySelector<HTMLElement>('#toc');
const mobileToc=document.querySelector<HTMLDetailsElement>('[data-mobile-toc]');
const headings=Array.from(document.querySelectorAll<HTMLHeadingElement>('.doc .contact-brief h2, .doc .prose h2'));
if(headings.length>=2&&toc&&mobileToc){
  const links:HTMLAnchorElement[]=[];
  headings.forEach((h,index)=>{
    if(!h.id)h.id=`section-${index+1}`;
    [toc,mobileToc].forEach(container=>{const li=document.createElement('li'),a=document.createElement('a');a.href=`#${h.id}`;a.textContent=h.textContent;li.append(a);container.querySelector('ol')?.append(li);a.addEventListener('click',()=>{let parent=h.parentElement;while(parent){if(parent instanceof HTMLDetailsElement)parent.open=true;parent=parent.parentElement;}});if(container===toc)links.push(a);else a.addEventListener('click',()=>mobileToc.open=false);});
  });
  toc.hidden=false;mobileToc.hidden=false;
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const entry=entries.find(e=>e.isIntersecting);if(!entry)return;links.forEach(link=>{if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});},{rootMargin:'-100px 0px -65% 0px'});headings.forEach(h=>observer.observe(h));}
}
document.querySelectorAll<HTMLElement>('[data-scenario]').forEach(container=>{
  const panels=Array.from(container.querySelectorAll<HTMLElement>('[data-panel]')),tabs=Array.from(container.querySelectorAll<HTMLButtonElement>('[data-step]'));
  const prev=container.querySelector<HTMLButtonElement>('[data-prev]'),next=container.querySelector<HTMLButtonElement>('[data-next]');
  if(!panels.length||panels.length!==tabs.length||!prev||!next)return;
  let index=0;
  function show(i:number,focus=false){if(i<0||i>=panels.length)return;index=i;container.setAttribute('data-ready','true');panels.forEach((p,n)=>p.hidden=n!==i);tabs.forEach((tab,n)=>{tab.setAttribute('role','tab');tab.setAttribute('aria-selected',String(n===i));tab.tabIndex=n===i?0:-1;if(n===i)tab.setAttribute('aria-current','step');else tab.removeAttribute('aria-current');});prev!.disabled=i===0;next!.disabled=i===panels.length-1;if(focus)tabs[i].focus();}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>show(i));tab.addEventListener('keydown',event=>{let target=i;if(event.key==='ArrowRight'||event.key==='ArrowDown')target=Math.min(i+1,tabs.length-1);else if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=Math.max(i-1,0);else if(event.key==='Home')target=0;else if(event.key==='End')target=tabs.length-1;else return;event.preventDefault();show(target,true);});});
  prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));show(0);
});
