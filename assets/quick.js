// Short, copyable answers built from the same objects as the map.
const quickOpen=document.querySelector('#quick-open');
const quickBackdrop=document.querySelector('#quick-backdrop');
const quickSheet=document.querySelector('#quick-sheet');
const quickClose=document.querySelector('#quick-close');
const quickSearch=document.querySelector('#quick-search');
const quickContent=document.querySelector('#quick-content');
const quickCopyAll=document.querySelector('#quick-copy-all');
const quickStatus=document.querySelector('#quick-status');
let quickVisible=features;

function quickAnswer(f){
 return `${f.n}. ${f.name} — ${f.desc} Координаты: ${coord(f)}. Интересный факт: ${facts[f.n][0]}`;
}

async function quickCopy(text,label,button){
 let copied=false;
 try{
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);copied=true}
 }catch(e){/* Try the selection fallback below. */}
 if(!copied){
  const field=document.createElement('textarea');
  field.value=text;field.setAttribute('readonly','');
  field.style.cssText='position:fixed;left:-9999px;top:0';
  document.body.append(field);field.select();
  try{copied=document.execCommand('copy')}catch(e){copied=false}
  field.remove();button.focus({preventScroll:true});
 }
 quickStatus.textContent=copied?`Скопировано: ${label}`:'Копирование недоступно. Выдели текст в карточке вручную.';
 if(copied){
  const old=button.textContent;button.textContent='✓ Скопировано';
  setTimeout(()=>{if(button.isConnected&&button.textContent==='✓ Скопировано')button.textContent=old},1800);
 }
}

function renderQuick(){
 const query=quickSearch.value.trim().toLocaleLowerCase('ru');
 quickVisible=features.filter(f=>f.name.toLocaleLowerCase('ru').includes(query)||labels[f.type].toLocaleLowerCase('ru').includes(query));
 quickContent.replaceChildren();
 for(const [type,label] of Object.entries(labels)){
  const group=quickVisible.filter(f=>f.type===type);if(!group.length)continue;
  const section=document.createElement('section');section.className='quick-group';
  const heading=document.createElement('h3');heading.textContent=label;heading.style.color=colors[type];section.append(heading);
  for(const f of group){
   const item=document.createElement('article');item.className='quick-item';
   const title=document.createElement('h4');title.textContent=`${f.n}. ${f.name}`;
   const description=document.createElement('p');description.textContent=f.desc;
   const coords=document.createElement('span');coords.className='quick-coords';coords.textContent=coord(f);
   const fact=document.createElement('p');fact.className='quick-fact';fact.textContent=`✦ ${facts[f.n][0]}`;
   const actions=document.createElement('div');actions.className='quick-item-actions';
   const copy=document.createElement('button');copy.type='button';copy.textContent='Скопировать';copy.addEventListener('click',()=>quickCopy(quickAnswer(f),f.name,copy));
   const find=document.createElement('button');find.type='button';find.className='quick-find';find.textContent='На карте ↗';
   find.addEventListener('click',()=>{closeQuick();select(f.n);focusFeature(f);revealMap()});
   actions.append(copy,find);item.append(title,description,coords,fact,actions);section.append(item);
  }
  quickContent.append(section);
 }
 if(!quickVisible.length){const empty=document.createElement('p');empty.className='quick-empty';empty.textContent='Объект не найден.';quickContent.append(empty)}
 quickCopyAll.disabled=!quickVisible.length;
 quickCopyAll.textContent=`Скопировать всё (${quickVisible.length})`;
}

function closeQuick(){
 quickBackdrop.hidden=true;
 document.documentElement.classList.remove('quick-opened');
 document.body.classList.remove('quick-opened');
 quickOpen.focus();
}
quickOpen.addEventListener('click',()=>{
 quickSearch.value='';quickStatus.textContent='';renderQuick();
 quickBackdrop.hidden=false;
 document.documentElement.classList.add('quick-opened');
 document.body.classList.add('quick-opened');
 quickSearch.focus({preventScroll:true});
});
quickClose.addEventListener('click',closeQuick);
quickBackdrop.addEventListener('click',e=>{if(e.target===quickBackdrop)closeQuick()});
quickSearch.addEventListener('input',renderQuick);
quickCopyAll.addEventListener('click',()=>{
 const text=Object.entries(labels).map(([type,label])=>{
  const group=quickVisible.filter(f=>f.type===type);
  return group.length?`${label}:\n${group.map(quickAnswer).join('\n')}`:'';
 }).filter(Boolean).join('\n\n');
 quickCopy(text,`${quickVisible.length} объектов`,quickCopyAll);
});
document.addEventListener('keydown',e=>{
 if(quickBackdrop.hidden)return;
 if(e.key==='Escape'){
  e.preventDefault();e.stopImmediatePropagation();closeQuick();
 }else if(e.key==='/'){
  e.preventDefault();e.stopImmediatePropagation();quickSearch.focus();
 }else if(e.key==='Tab'){
  const focusable=[...quickSheet.querySelectorAll('button:not([disabled]),input:not([disabled])')];
  if(e.shiftKey&&document.activeElement===focusable[0]){e.preventDefault();focusable.at(-1).focus()}
  else if(!e.shiftKey&&document.activeElement===focusable.at(-1)){e.preventDefault();focusable[0].focus()}
 }
},true);
