const colors={peninsula:'#d88042',island:'#3a916d',strait:'#8263a4',sea:'#377eae'};
const labels={peninsula:'Полуострова',island:'Острова',strait:'Проливы',sea:'Моря'};
const singular={peninsula:'Полуостров',island:'Остров / архипелаг',strait:'Пролив',sea:'Море'};
// Longitudes above 180° wrap to the western edge of the world map.
const features=[
 {n:1,name:'Камчатка',type:'peninsula',lon:159.5,lat:56,dx:7,dy:3,desc:'Полуостров на северо-востоке Азии между Охотским морем и Тихим океаном.'},
 {n:2,name:'Аляска',type:'peninsula',lon:203.5,lat:57.8,dx:4,dy:3,desc:'Полуостров на юго-западе Аляски между Беринговым морем и Тихим океаном.'},
 {n:3,name:'Корея',type:'peninsula',lon:127.8,lat:38.2,dx:-5.2,dy:4,desc:'Полуостров Восточной Азии между Жёлтым и Японским морями.'},
 {n:4,name:'Малакка',type:'peninsula',lon:101.8,lat:4.6,dx:-4.9,dy:-2,desc:'Узкий полуостров Юго-Восточной Азии между Малаккским проливом и Сиамским заливом.'},
 {n:5,name:'Индокитай',type:'peninsula',lon:103.6,lat:16.2,dx:-4.9,dy:4.5,desc:'Полуостров Юго-Восточной Азии между Бенгальским заливом и Южно-Китайским морем.'},
 {n:6,name:'Курильские острова',type:'island',lon:151,lat:46.8,dx:5,dy:-4.2,desc:'Островная дуга между Камчаткой и Японией; отделяет Охотское море от Тихого океана.'},
 {n:7,name:'Новая Гвинея',type:'island',lon:143.5,lat:-5.2,dx:4.5,dy:4,desc:'Крупный остров к северу от Австралии, разделённый между Индонезией и Папуа — Новой Гвинеей.'},
 {n:8,name:'Японские острова',type:'island',lon:139.3,lat:37.4,dx:6,dy:-1.4,desc:'Островная дуга Восточной Азии между Японским морем и Тихим океаном.'},
 {n:9,name:'Новая Зеландия',type:'island',lon:171,lat:-42.4,dx:5,dy:3.4,desc:'Островная страна юго-западной части Тихого океана к юго-востоку от Австралии.'},
 {n:10,name:'Тайвань',type:'island',lon:121,lat:23.7,dx:-4,dy:-3.4,desc:'Остров у восточного побережья Китая, между Восточно-Китайским и Южно-Китайским морями.'},
 {n:11,name:'Алеутские острова',type:'island',lon:184,lat:52,dx:12,dy:-3.5,desc:'Островная дуга между Беринговым морем и Тихим океаном, протянувшаяся от Аляски к Камчатке.'},
 {n:12,name:'Сахалин',type:'island',lon:143.1,lat:50.4,dx:-5,dy:4.8,desc:'Остров у восточного побережья России между Охотским и Японским морями.'},
 {n:13,name:'Берингов пролив',type:'strait',lon:191,lat:65.8,dx:4,dy:-4.7,desc:'Пролив между Чукоткой и Аляской, соединяющий Северный Ледовитый и Тихий океаны.'},
 {n:14,name:'Берингово море',type:'sea',lon:179,lat:58.1,dx:-14,dy:-5,desc:'Окраинное море Тихого океана между Камчаткой, Чукоткой, Аляской и Алеутскими островами.'},
 {n:15,name:'Охотское море',type:'sea',lon:149.1,lat:54.7,dx:-3.7,dy:-4.2,desc:'Море у восточного побережья России, ограниченное Камчаткой, Сахалином и Курильскими островами.'},
 {n:16,name:'Японское море',type:'sea',lon:133.7,lat:40,dx:-5.4,dy:-3.7,desc:'Море между материковой Азией, Корейским полуостровом, Сахалином и Японскими островами.'},
 {n:17,name:'Восточно-Китайское море',type:'sea',lon:126.4,lat:29.5,dx:6.4,dy:-1.7,desc:'Море между восточным побережьем Китая, Тайванем и островами Рюкю.'},
 {n:18,name:'Южно-Китайское море',type:'sea',lon:114.5,lat:16.1,dx:-1.5,dy:-4,desc:'Море западной части Тихого океана между Индокитаем, островом Борнео и Филиппинами.'}
];

const facts={
 1:[
  'Ключевская Сопка — самый высокий действующий вулкан Евразии. Его высота меняется после извержений и составляет около 4,8 км.',
  'В Долине гейзеров горячая вода и пар вырываются прямо из земли. Это одно из крупнейших гейзерных полей мира.'
 ],
 2:[
  'На полуострове Аляска находится долина Десяти тысяч дымов: её засыпало пеплом при мощном извержении вулкана Новарупта в 1912 году.',
  'В национальном парке Катмай бурые медведи ловят лосося у водопада Брукс. Во время нереста рыбы прыгают вверх против течения.'
 ],
 3:[
  'Большую часть Корейского полуострова занимают горы и возвышенности, поэтому крупные равнины особенно важны для земледелия.',
  'Вдоль демилитаризованной зоны между Северной и Южной Кореей сохранились места обитания редких животных, в том числе японских и даурских журавлей.'
 ],
 4:[
  'В южной части полуострова растёт раффлезия — растение с огромными цветками и запахом разлагающегося мяса. Этот запах привлекает мух-опылителей.',
  'Малаккский пролив рядом с полуостровом — один из важнейших морских путей между Индийским и Тихим океанами.'
 ],
 5:[
  'В пещере Шондонг во Вьетнаме есть гигантские залы и участки леса: солнечный свет попадает туда через обрушившийся свод.',
  'В Камбодже река Тонлесап меняет направление течения по сезонам. Во время паводка Меконг подпирает её воды и наполняет одноимённое озеро.'
 ],
 6:[
  'Курильские острова возникли на границе литосферных плит. Здесь много действующих вулканов, горячих источников и фумарол — выходов вулканических газов.',
  'На острове Кунашир мыс Столбчатый сложен каменными колоннами. Они образовались из лавы, которая растрескалась при остывании.'
 ],
 7:[
  'Новая Гвинея — второй по площади остров Земли после Гренландии, если не считать материки.',
  'Здесь обитают райские птицы: самцы многих видов устраивают сложные танцы и демонстрируют яркие перья, привлекая самок.'
 ],
 8:[
  'Японские острова лежат в Тихоокеанском огненном кольце — поясе частых землетрясений и вулканических извержений.',
  'На острове Хонсю японские макаки в районе Дзигокудани зимой греются в горячих источниках.'
 ],
 9:[
  'Киви — нелетающие птицы Новой Зеландии. Их ноздри расположены у кончика длинного клюва, что помогает искать пищу по запаху.',
  'Туатара, или гаттерия, — не ящерица, а представитель отдельного древнего отряда пресмыкающихся. В природе она сохранилась только в Новой Зеландии.'
 ],
 10:[
  'Гора Юйшань поднимается почти на 4 км: её высота — 3952 м. Поэтому на тропическом по широте острове зимой бывает снег.',
  'Тайваньская голубая сорока встречается в природе только на Тайване. Её легко узнать по ярко-синему оперению и очень длинному хвосту.'
 ],
 11:[
  'Алеутская островная дуга пересекает 180-й меридиан. Поэтому её острова находятся сразу в Восточном и Западном полушариях.',
  'Во время Второй мировой войны на островах Атту и Кыска находились японские войска. В 1943 году за Атту шли бои.'
 ],
 12:[
  'Долгое время европейские картографы спорили, остров ли Сахалин. Плавание Геннадия Невельского в 1849 году подтвердило существование пролива между ним и материком.',
  'На Сахалине растут огромные белокопытники: их листья похожи на зелёные зонты и могут достигать более метра в поперечнике.'
 ],
 13:[
  'В проливе лежат острова Диомида: российский остров Ратманова и американский Крузенштерна. Между ними всего около 4 км, но проходит линия перемены дат.',
  'Во время ледниковых эпох уровень океана был ниже, и на месте пролива существовала суша — Берингия. Через неё люди и животные расселялись между Азией и Америкой.'
 ],
 14:[
  'Северная часть моря зимой покрывается льдом, а южные глубоководные районы обычно остаются открытыми.',
  'В море много минтая — рыбы из семейства тресковых. Его промысел здесь имеет большое значение для России и США.'
 ],
 15:[
  'Охотское море — одно из самых южных морей Северного полушария, где зимой образуются обширные морские льды.',
  'У северо-восточного побережья Сахалина летом кормятся серые киты. Они ищут донных беспозвоночных на мелководье.'
 ],
 16:[
  'Тёплое Цусимское течение приносит в море воду с юга. Поэтому в нём соседствуют теплолюбивые и холодноводные виды.',
  'Залив Петра Великого известен дальневосточным морским заповедником. В его водах встречаются осьминоги, морские звёзды и колонии морских птиц.'
 ],
 17:[
  'Река Янцзы выносит в это море огромные объёмы пресной воды и наносов. Они влияют на цвет, солёность и жизнь прибрежных вод.',
  'Большая часть моря лежит на неглубоком материковом шельфе, но на востоке Окинавский жёлоб уходит более чем на 2 км в глубину.'
 ],
 18:[
  'В этом море есть большие коралловые рифы и атоллы — кольцеобразные рифы с лагуной внутри.',
  'Через Южно-Китайское море проходят важные торговые маршруты, связывающие порты Восточной Азии с Индийским океаном.'
 ]
};

const $=s=>document.querySelector(s);
const markers=$('#markers'),leaders=$('#leader-layer'),list=$('#feature-list'),card=$('#feature-card');
const markerEntries=[];
const MAX_ZOOM=10;
let active='all',query='',selected=1,zoom=1,panX=0,panY=0,drag=null,ignoreMarkerClickUntil=0;
const wrapLon=lon=>((lon+180)%360+360)%360-180;
const x=lon=>(wrapLon(lon)+180)/360*100, y=lat=>(90-lat)/180*100;
const coord=f=>`${Math.abs(f.lat).toFixed(1)}° ${f.lat<0?'ю. ш.':'с. ш.'} · ${Math.abs(f.lon>180?f.lon-360:f.lon).toFixed(1)}° ${(f.lon>180||f.lon<0)?'з. д.':'в. д.'}`;

for(const f of features){
 const line=document.createElementNS('http://www.w3.org/2000/svg','line');
 line.setAttribute('x1',x(f.lon)*10);line.setAttribute('y1',y(f.lat)*10);
 line.setAttribute('x2',x(f.lon+f.dx)*10);line.setAttribute('y2',y(f.lat+f.dy)*10);
 line.setAttribute('stroke',colors[f.type]);line.dataset.id=f.n;leaders.append(line);
 const dot=document.createElement('span');dot.className='geo-dot';dot.style.cssText=`left:${x(f.lon)}%;top:${y(f.lat)}%;--marker-color:${colors[f.type]}`;dot.dataset.id=f.n;markers.append(dot);
 const b=document.createElement('button');b.type='button';b.className='marker';b.textContent=f.n;b.title=`${f.name} — ${coord(f)}`;b.setAttribute('aria-label',`${f.n}. ${f.name}, ${coord(f)}`);
 b.style.cssText=`left:${x(f.lon+f.dx)}%;top:${y(f.lat+f.dy)}%;--marker-color:${colors[f.type]}`;b.dataset.id=f.n;
 b.addEventListener('click',()=>{if(Date.now()>=ignoreMarkerClickUntil)select(f.n,true)});markers.append(b);
 markerEntries.push({f,b,line});
}

const pills=$('#filter-pills');
for(const [key,label] of [['all','Все'],...Object.entries(labels)]){
 const b=document.createElement('button');b.type='button';b.className='pill';b.dataset.filter=key;
 b.innerHTML=key==='all'?label:`<span class="pill-dot" style="--pill-color:${colors[key]}"></span>${label}`;
 b.addEventListener('click',()=>{active=key;render()});pills.append(b);
}
$('#reset-filter').addEventListener('click',()=>{active='all';query='';$('#search').value='';render()});
$('#legend').innerHTML=Object.entries(labels).map(([k,v])=>`<span class="legend-item" style="--legend-color:${colors[k]}"><i></i>${v}</span>`).join('');
$('#search').addEventListener('input',e=>{query=e.target.value.trim().toLocaleLowerCase('ru');render()});
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==$('#search')){e.preventDefault();$('#search').focus()}if(e.key==='Escape'&&document.activeElement===$('#search')){$('#search').blur()}});

function visible(f){return(active==='all'||active===f.type)&&f.name.toLocaleLowerCase('ru').includes(query)}
function select(n,scroll=false){const changed=selected!==n;selected=n;const f=features.find(o=>o.n===n);if(!f)return;
 card.style.setProperty('--card-color',colors[f.type]);
 card.innerHTML=`<div class="card-meta">${singular[f.type]} · № ${f.n.toString().padStart(2,'0')}</div><h3>${f.name}</h3><p>${f.desc}</p><div class="coords">${coord(f)}</div><section class="fun-facts" aria-labelledby="facts-title"><h4 id="facts-title">✦ Интересно знать</h4><ul>${facts[f.n].map(fact=>`<li>${fact}</li>`).join('')}</ul></section>`;
 if(changed){card.classList.remove('card-enter');void card.offsetWidth;card.classList.add('card-enter')}
 document.querySelectorAll('.marker,.geo-dot,.feature-row').forEach(el=>el.classList.toggle('selected',Number(el.dataset.id)===n));
 leaders.querySelectorAll('line').forEach(el=>el.classList.toggle('selected',Number(el.dataset.id)===n));
 if(scroll){const row=list.querySelector(`.feature-row[data-id="${n}"]`);row?.scrollIntoView({block:'nearest',behavior:'smooth'})}
}
function revealMap(){const m=$('#map-shell'),r=m.getBoundingClientRect();if(r.top<0||r.bottom>window.innerHeight)m.scrollIntoView({behavior:'smooth',block:'start'})}
function render(){
 const matching=features.filter(visible);
 $('#result-count').textContent=matching.length;
 document.querySelectorAll('.pill').forEach(b=>{const on=b.dataset.filter===active;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
 document.querySelectorAll('.marker,.geo-dot').forEach(el=>el.classList.toggle('dimmed',!matching.some(f=>f.n===Number(el.dataset.id))));
 leaders.querySelectorAll('line').forEach(el=>el.classList.toggle('dimmed',!matching.some(f=>f.n===Number(el.dataset.id))));
 list.innerHTML='';
 for(const [type,label] of Object.entries(labels)){
  const group=matching.filter(f=>f.type===type);if(!group.length)continue;
  const h=document.createElement('div');h.className='group-title';h.style.color=colors[type];h.textContent=label;list.append(h);
  for(const f of group){const row=document.createElement('button');row.type='button';row.className='feature-row';row.dataset.id=f.n;row.innerHTML=`<span class="row-number" style="--row-color:${colors[type]}">${f.n}</span><span class="row-name">${f.name}</span><span class="row-arrow">→</span>`;row.addEventListener('click',()=>{select(f.n);focusFeature(f);revealMap()});list.append(row)}
 }
 if(!matching.length)list.innerHTML='<div class="no-results">Объект не найден. Попробуй другой запрос.</div>';
 if(matching.length&&!matching.some(f=>f.n===selected))select(matching[0].n);else select(selected);
}
render();

const viewport=$('#map-viewport'),stage=$('#map-stage');
const scaleMid=$('#scale-mid'),scaleEnd=$('#scale-end'),zoomLevel=$('#zoom-level');
const markerScale=()=>Math.max(Math.pow(zoom,-1.5),.72/zoom);
// Keep the geographic dots exact; spread only the numbered labels when they overlap.
function layoutMarkers(){
 const w=stage.offsetWidth,h=stage.offsetHeight;if(!w||!h)return;
 const placed=[];
 for(const {f,b,line} of markerEntries){
  const cx=x(f.lon+f.dx)*w/100,cy=y(f.lat+f.dy)*h/100;
  const size=b.offsetWidth*markerScale()+5/zoom,edge=size/2;
  let best=null;
  for(let ring=0;ring<=7;ring++){
   const count=ring?24:1;
   for(let step=0;step<count;step++){
    const angle=step*2*Math.PI/count;
    const px=Math.max(edge,Math.min(w-edge,cx+Math.cos(angle)*ring*size*.7));
    const py=Math.max(edge,Math.min(h-edge,cy+Math.sin(angle)*ring*size*.7));
    const collisions=placed.reduce((sum,p)=>sum+(Math.abs(px-p.x)<(size+p.size)/2&&Math.abs(py-p.y)<(size+p.size)/2?1:0),0);
    const cost=collisions*10000+Math.hypot(px-cx,py-cy);
    if(!best||cost<best.cost)best={x:px,y:py,size,cost};
   }
   if(best&&best.cost<10000)break;
  }
  placed.push(best);
  b.style.left=`${best.x/w*100}%`;b.style.top=`${best.y/h*100}%`;
  line.setAttribute('x2',best.x/w*1000);line.setAttribute('y2',best.y/h*1000);
 }
}
function applyView(){
 // Allow a little movement even when the whole world fits on screen.
 const maxX=Math.max(viewport.clientWidth*.12/zoom,(stage.offsetWidth*zoom-viewport.clientWidth)/2+viewport.clientWidth*.12);
 const maxY=Math.max(viewport.clientHeight*.1/zoom,(stage.offsetHeight*zoom-viewport.clientHeight)/2+viewport.clientHeight*.1);
 panX=Math.max(-maxX,Math.min(maxX,panX));panY=Math.max(-maxY,Math.min(maxY,panY));
 stage.style.transform=`translate(${panX}px, ${panY}px) scale(${zoom})`;
 stage.style.setProperty('--nums',markerScale().toFixed(4));
 const targetWidth=Math.min(140,Math.max(80,stage.offsetWidth*.2));
 const widthFor=km=>stage.offsetWidth*.144*zoom*km/5000;
 const scaleKm=[500,1000,2000,5000,10000].reduce((best,km)=>Math.abs(widthFor(km)-targetWidth)<Math.abs(widthFor(best)-targetWidth)?km:best,500);
 document.documentElement.style.setProperty('--scale-width',`${widthFor(scaleKm)}px`);
 if(scaleMid.textContent!==String(scaleKm/2))scaleMid.textContent=scaleKm/2;
 if(scaleEnd.textContent!==`${scaleKm} км`)scaleEnd.textContent=`${scaleKm} км`;
 const level=`×${zoom.toFixed(1)}`;if(zoomLevel.textContent!==level)zoomLevel.textContent=level;
}
function focusFeature(f){
 zoom=Math.max(zoom,2.5);layoutMarkers();
 const label=markerEntries.find(entry=>entry.f===f).b;
 panX=(50-parseFloat(label.style.left))*stage.offsetWidth*zoom/100;
 panY=(50-parseFloat(label.style.top))*stage.offsetHeight*zoom/100;
 applyView();
}
function setZoom(next){zoom=Math.max(1,Math.min(MAX_ZOOM,next));if(zoom===1){panX=0;panY=0}layoutMarkers();applyView()}
function zoomAt(next,clientX,clientY){
 const rect=viewport.getBoundingClientRect();
 const pointX=clientX-rect.left-viewport.clientWidth/2,pointY=clientY-rect.top-viewport.clientHeight/2;
 const anchorX=(pointX-panX)/zoom,anchorY=(pointY-panY)/zoom;
 zoom=Math.max(1,Math.min(MAX_ZOOM,next));
 panX=pointX-anchorX*zoom;panY=pointY-anchorY*zoom;
 layoutMarkers();applyView();
}
$('#zoom-in').addEventListener('click',()=>setZoom(zoom*1.5));
$('#zoom-out').addEventListener('click',()=>setZoom(zoom/1.5));
$('#zoom-reset').addEventListener('click',()=>setZoom(1));
viewport.addEventListener('wheel',e=>{e.preventDefault();zoomAt(zoom*(e.deltaY<0?1.12:1/1.12),e.clientX,e.clientY)},{passive:false});

const pointers=new Map();
let lastTap=null;
function startPinch(){
 const [a,b]=[...pointers.values()];
 const rect=viewport.getBoundingClientRect();
 const midX=(a.x+b.x)/2-rect.left-viewport.clientWidth/2;
 const midY=(a.y+b.y)/2-rect.top-viewport.clientHeight/2;
 drag={type:'pinch',distance:Math.max(10,Math.hypot(a.x-b.x,a.y-b.y)),startZoom:zoom,anchorX:(midX-panX)/zoom,anchorY:(midY-panY)/zoom};
 for(const pointer of [a,b])if(!viewport.hasPointerCapture(pointer.id))viewport.setPointerCapture(pointer.id);
 lastTap=null;
 viewport.classList.add('dragging');
}
viewport.addEventListener('pointerdown',e=>{
 if(e.pointerType==='mouse'&&e.button!==0)return;
 const markerButton=e.target.closest('button');
 if(!pointers.size){ignoreMarkerClickUntil=0;if(markerButton)lastTap=null}
 pointers.set(e.pointerId,{id:e.pointerId,x:e.clientX,y:e.clientY,type:e.pointerType,onMarker:!!markerButton});
 // Capture on the marker itself so a simple tap still fires its click event.
 (markerButton||viewport).setPointerCapture(e.pointerId);
 if(pointers.size>=2)startPinch();
 else drag={type:'pan',x:e.clientX,y:e.clientY,px:panX,py:panY,started:false};
});
viewport.addEventListener('pointermove',e=>{
 const pointer=pointers.get(e.pointerId);if(!pointer||!drag)return;
 pointer.x=e.clientX;pointer.y=e.clientY;
 if(drag.type==='pinch'&&pointers.size>=2){
  const [a,b]=[...pointers.values()];
  const rect=viewport.getBoundingClientRect();
  const midX=(a.x+b.x)/2-rect.left-viewport.clientWidth/2;
  const midY=(a.y+b.y)/2-rect.top-viewport.clientHeight/2;
  zoom=Math.max(1,Math.min(MAX_ZOOM,drag.startZoom*Math.hypot(a.x-b.x,a.y-b.y)/drag.distance));
  panX=midX-drag.anchorX*zoom;panY=midY-drag.anchorY*zoom;
  applyView();
 }else if(drag.type==='pan'){
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.started&&Math.hypot(dx,dy)<5)return;
  if(!drag.started){drag.started=true;lastTap=null;viewport.classList.add('dragging');if(!viewport.hasPointerCapture(e.pointerId))viewport.setPointerCapture(e.pointerId)}
  panX=drag.px+dx;panY=drag.py+dy;applyView();
 }
});
function endPointer(e){
 const pointer=pointers.get(e.pointerId);if(!pointer)return;
 if(e.type==='pointercancel')lastTap=null;
 const wasPinch=drag?.type==='pinch',wasPan=drag?.type==='pan'&&drag.started;
 pointers.delete(e.pointerId);
 if(wasPinch||wasPan)ignoreMarkerClickUntil=Date.now()+300;
 if(wasPinch){layoutMarkers();applyView()}
 if(pointers.size>=2){startPinch();return}
 if(pointers.size===1){const p=[...pointers.values()][0];drag={type:'pan',x:p.x,y:p.y,px:panX,py:panY,started:false};viewport.classList.remove('dragging');return}
 drag=null;viewport.classList.remove('dragging');
 if(e.type==='pointerup'&&pointer.type==='touch'&&!pointer.onMarker&&!wasPinch&&!wasPan){
  const now=Date.now();
  if(lastTap&&now-lastTap.time<320&&Math.hypot(pointer.x-lastTap.x,pointer.y-lastTap.y)<30){
   zoomAt(zoom*1.6,pointer.x,pointer.y);lastTap=null;
  }else lastTap={time:now,x:pointer.x,y:pointer.y};
 }
}
viewport.addEventListener('pointerup',endPointer);
viewport.addEventListener('pointercancel',endPointer);

new ResizeObserver(()=>{layoutMarkers();applyView()}).observe(stage);
