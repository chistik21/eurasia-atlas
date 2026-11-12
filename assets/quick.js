// Map snapshots share the geographic coordinates and base map with the atlas.
const quickOpen=document.querySelector('#quick-open');
const quickBackdrop=document.querySelector('#quick-backdrop');
const quickSheet=document.querySelector('#quick-sheet');
const quickClose=document.querySelector('#quick-close');
const quickSearch=document.querySelector('#quick-search');
const quickContent=document.querySelector('#quick-content');
const quickStatus=document.querySelector('#quick-status');
let quickVisible=features;

function quickCrop(f){
 const px=x(f.lon),py=y(f.lat);
 return {px,py,left:Math.max(-200,Math.min(0,50-px*3)),top:Math.max(-200,Math.min(0,50-py*3))};
}

function quickMapPicture(){
 const picture=document.createElement('picture');
 const dark=document.createElement('source');dark.media='(prefers-color-scheme: dark)';dark.srcset='assets/world-map-dark.svg?v=detail-1';
 const image=document.createElement('img');image.src='assets/world-map-light.svg?v=detail-1';image.alt='';image.loading='lazy';image.draggable=false;
 picture.append(dark,image);
 return {picture,image};
}

async function quickScreenshot(f,button){
 try{
  const map=new Image();
  map.src=matchMedia('(prefers-color-scheme: dark)').matches?'assets/world-map-dark.svg?v=detail-1':'assets/world-map-light.svg?v=detail-1';
  if(map.decode)await map.decode();
  else await new Promise((resolve,reject)=>{
   if(map.complete&&map.naturalWidth)resolve();
   else{map.onload=resolve;map.onerror=reject}
  });
  const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=600;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas недоступен');
  const {px,py,left,top}=quickCrop(f);
  const sx=-left*6,sy=-top*3;
  ctx.drawImage(map,sx,sy,600,300,0,0,1200,600);
  const pinX=(px*18-sx)*2,pinY=(py*9-sy)*2;
  ctx.beginPath();ctx.arc(pinX,pinY,23,0,2*Math.PI);ctx.fillStyle=colors[f.type];ctx.fill();
  ctx.lineWidth=5;ctx.strokeStyle='#fff';ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='bold 23px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(f.n,pinX,pinY);
  ctx.fillStyle='#0f2c32e8';ctx.fillRect(0,505,1200,95);
  ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle='#fff';ctx.font='bold 32px Arial,sans-serif';ctx.fillText(`${f.n}. ${f.name}`,28,548);
  ctx.font='20px Arial,sans-serif';ctx.fillText(coord(f),29,579);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob)throw new Error('PNG недоступен');
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=`geografiya-${f.n}.png`;document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),3000);
  quickStatus.textContent=`Скрин сохранён: ${f.name}`;
 }catch(e){quickStatus.textContent='Не удалось сохранить скрин. Попробуй ещё раз.'}
 button.focus({preventScroll:true});
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
   const coords=document.createElement('span');coords.className='quick-coords';coords.textContent=coord(f);
   const crop=quickCrop(f);
   const preview=document.createElement('div');preview.className='quick-map';
   preview.setAttribute('role','img');preview.setAttribute('aria-label',`Фрагмент карты: ${f.name}, ${coord(f)}`);
   const stage=document.createElement('div');stage.className='quick-map-stage';
   stage.style.left=`${crop.left}%`;stage.style.top=`${crop.top}%`;
   stage.append(quickMapPicture().picture);
   const pin=document.createElement('span');pin.className='quick-map-pin';pin.textContent=f.n;
   pin.style.left=`${Math.max(5,Math.min(95,crop.left+crop.px*3))}%`;
   pin.style.top=`${Math.max(10,Math.min(90,crop.top+crop.py*3))}%`;
   pin.style.background=colors[f.type];
   const overview=document.createElement('div');overview.className='quick-map-overview';overview.append(quickMapPicture().picture);
   const locator=document.createElement('i');locator.className='quick-map-locator';
   locator.style.left=`${Math.max(5,Math.min(95,crop.px))}%`;locator.style.top=`${Math.max(10,Math.min(90,crop.py))}%`;
   locator.style.background=colors[f.type];overview.append(locator);
   preview.append(stage,pin,overview);
   const actions=document.createElement('div');actions.className='quick-item-actions';
   const download=document.createElement('button');download.type='button';download.textContent='↓ Скачать скрин';
   download.addEventListener('click',()=>quickScreenshot(f,download));
   const find=document.createElement('button');find.type='button';find.className='quick-find';find.textContent='На карте ↗';
   find.addEventListener('click',()=>{closeQuick();select(f.n);focusFeature(f);revealMap()});
   actions.append(download,find);item.append(title,preview,coords,actions);section.append(item);
  }
  quickContent.append(section);
 }
 if(!quickVisible.length){const empty=document.createElement('p');empty.className='quick-empty';empty.textContent='Объект не найден.';quickContent.append(empty)}
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
