const colors={peninsula:'#d88042',island:'#3a916d',strait:'#8263a4',sea:'#377eae'};
const labels={peninsula:'Полуострова',island:'Острова',strait:'Проливы',sea:'Моря'};
const singular={peninsula:'Полуостров',island:'Остров / архипелаг',strait:'Пролив',sea:'Море'};
// Longitude > 180° is unwrapped to keep the Bering region continuous on screen.
const features=[
 {n:1,name:'Камчатка',type:'peninsula',lon:159.5,lat:56,dx:7,dy:3,desc:'Полуостров на северо-востоке Азии между Охотским морем и Тихим океаном.'},
 {n:2,name:'Кольский',type:'peninsula',lon:34.3,lat:68.7,dx:5.7,dy:1.8,desc:'Полуостров на северо-западе России между Баренцевым и Белым морями.'},
 {n:3,name:'Корея',type:'peninsula',lon:127.8,lat:38.2,dx:-5.2,dy:4,desc:'Полуостров Восточной Азии между Жёлтым и Японским морями.'},
 {n:4,name:'Индостан',type:'peninsula',lon:78.5,lat:19.5,dx:3,dy:1,desc:'Крупный полуостров Южной Азии, омываемый Аравийским морем и Бенгальским заливом.'},
 {n:5,name:'Малакка',type:'peninsula',lon:101.8,lat:4.6,dx:-4.9,dy:-2,desc:'Узкий полуостров Юго-Восточной Азии между Малаккским проливом и Сиамским заливом.'},
 {n:6,name:'Индокитай',type:'peninsula',lon:103.6,lat:16.2,dx:-4.9,dy:4.5,desc:'Полуостров Юго-Восточной Азии между Бенгальским заливом и Южно-Китайским морем.'},
 {n:7,name:'Аравийский',type:'peninsula',lon:46,lat:23.5,dx:-2,dy:1,desc:'Полуостров Юго-Западной Азии между Красным морем и Персидским заливом.'},
 {n:8,name:'Пиренейский',type:'peninsula',lon:-4,lat:40.2,dx:5,dy:1.3,desc:'Полуостров на юго-западе Европы между Атлантическим океаном и Средиземным морем.'},
 {n:9,name:'Курильские острова',type:'island',lon:151,lat:46.8,dx:5,dy:-4.2,desc:'Островная дуга между Камчаткой и Японией; отделяет Охотское море от Тихого океана.'},
 {n:10,name:'Филиппинские острова',type:'island',lon:122.5,lat:12.8,dx:5.4,dy:-3,desc:'Крупный архипелаг западной части Тихого океана к востоку от Южно-Китайского моря.'},
 {n:11,name:'Тайвань',type:'island',lon:121,lat:23.7,dx:-4,dy:-3.4,desc:'Остров у восточного побережья Китая, между Восточно-Китайским и Южно-Китайским морями.'},
 {n:12,name:'Японские острова',type:'island',lon:139.3,lat:37.4,dx:6,dy:-1.4,desc:'Островная дуга Восточной Азии между Японским морем и Тихим океаном.'},
 {n:13,name:'Новая Гвинея',type:'island',lon:143.5,lat:-5.2,dx:4.5,dy:4,desc:'Крупный остров к северу от Австралии, разделённый между Индонезией и Папуа — Новой Гвинеей.'},
 {n:14,name:'Новая Зеландия',type:'island',lon:171,lat:-42.4,dx:5,dy:3.4,desc:'Островная страна юго-западной части Тихого океана к юго-востоку от Австралии.'},
 {n:15,name:'Шри-Ланка',type:'island',lon:80.7,lat:7.6,dx:-4.7,dy:-3.4,desc:'Остров в Индийском океане у юго-восточного побережья Индостана.'},
 {n:16,name:'Сахалин',type:'island',lon:143.1,lat:50.4,dx:-5,dy:4.8,desc:'Остров у восточного побережья России между Охотским и Японским морями.'},
 {n:17,name:'Берингов пролив',type:'strait',lon:191,lat:65.8,dx:-6.6,dy:-4.7,desc:'Пролив между Чукоткой и Аляской, соединяющий Северный Ледовитый и Тихий океаны.'},
 {n:18,name:'Берингово море',type:'sea',lon:179,lat:58.1,dx:-3.4,dy:-5,desc:'Окраинное море Тихого океана между Камчаткой, Чукоткой, Аляской и Алеутскими островами.'},
 {n:19,name:'Охотское море',type:'sea',lon:149.1,lat:54.7,dx:-3.7,dy:-4.2,desc:'Море у восточного побережья России, ограниченное Камчаткой, Сахалином и Курильскими островами.'},
 {n:20,name:'Японское море',type:'sea',lon:133.7,lat:40,dx:-5.4,dy:-3.7,desc:'Море между материковой Азией, Корейским полуостровом, Сахалином и Японскими островами.'},
 {n:21,name:'Восточно-Китайское море',type:'sea',lon:126.4,lat:29.5,dx:6.4,dy:-1.7,desc:'Море между восточным побережьем Китая, Тайванем и островами Рюкю.'},
 {n:22,name:'Южно-Китайское море',type:'sea',lon:114.5,lat:16.1,dx:-1.5,dy:-4,desc:'Море западной части Тихого океана между Индокитаем, островом Борнео и Филиппинами.'}
];

const $=s=>document.querySelector(s);
const markers=$('#markers'),leaders=$('#leader-layer'),list=$('#feature-list'),card=$('#feature-card');
let active='all',query='',selected=1,zoom=1,panX=0,panY=0,drag=null;
const x=lon=>(lon+17)/215*100, y=lat=>(84-lat)/138*100;
const coord=f=>`${Math.abs(f.lat).toFixed(1)}° ${f.lat<0?'ю. ш.':'с. ш.'} · ${Math.abs(f.lon>180?f.lon-360:f.lon).toFixed(1)}° ${(f.lon>180||f.lon<0)?'з. д.':'в. д.'}`;

for(const f of features){
 const line=document.createElementNS('http://www.w3.org/2000/svg','line');
 line.setAttribute('x1',x(f.lon)*10);line.setAttribute('y1',y(f.lat)*10);
 line.setAttribute('x2',x(f.lon+f.dx)*10);line.setAttribute('y2',y(f.lat+f.dy)*10);
 line.setAttribute('stroke',colors[f.type]);line.dataset.id=f.n;leaders.append(line);
 const dot=document.createElement('span');dot.className='geo-dot';dot.style.cssText=`left:${x(f.lon)}%;top:${y(f.lat)}%;--marker-color:${colors[f.type]}`;dot.dataset.id=f.n;markers.append(dot);
 const b=document.createElement('button');b.type='button';b.className='marker';b.textContent=f.n;b.title=`${f.name} — ${coord(f)}`;b.setAttribute('aria-label',`${f.n}. ${f.name}, ${coord(f)}`);
 b.style.cssText=`left:${x(f.lon+f.dx)}%;top:${y(f.lat+f.dy)}%;--marker-color:${colors[f.type]}`;b.dataset.id=f.n;
 b.addEventListener('click',()=>select(f.n,true));markers.append(b);
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
function select(n,scroll=false){selected=n;const f=features.find(o=>o.n===n);if(!f)return;
 card.style.setProperty('--card-color',colors[f.type]);
 card.innerHTML=`<div class="card-meta">${singular[f.type]} · № ${f.n.toString().padStart(2,'0')}</div><h3>${f.name}</h3><p>${f.desc}</p><div class="coords">${coord(f)}</div>`;
 document.querySelectorAll('.marker,.feature-row').forEach(el=>el.classList.toggle('selected',Number(el.dataset.id)===n));
 if(scroll){const row=list.querySelector(`.feature-row[data-id="${n}"]`);row?.scrollIntoView({block:'nearest',behavior:'smooth'})}
}
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
  for(const f of group){const row=document.createElement('button');row.type='button';row.className='feature-row';row.dataset.id=f.n;row.innerHTML=`<span class="row-number" style="--row-color:${colors[type]}">${f.n}</span><span class="row-name">${f.name}</span><span class="row-arrow">→</span>`;row.addEventListener('click',()=>select(f.n));list.append(row)}
 }
 if(!matching.length)list.innerHTML='<div class="no-results">Объект не найден. Попробуй другой запрос.</div>';
 if(matching.length&&!matching.some(f=>f.n===selected))select(matching[0].n);else select(selected);
}
render();

const viewport=$('#map-viewport'),stage=$('#map-stage');
function applyView(){stage.style.transform=`translate(${panX}px, ${panY}px) scale(${zoom})`;document.documentElement.style.setProperty("--scale-width",`${stage.offsetWidth*0.0965*zoom}px`)}
function setZoom(next){zoom=Math.max(1,Math.min(3.5,next));if(zoom===1){panX=0;panY=0}applyView()}
$('#zoom-in').addEventListener('click',()=>setZoom(zoom*1.3));
$('#zoom-out').addEventListener('click',()=>setZoom(zoom/1.3));
$('#zoom-reset').addEventListener('click',()=>{zoom=1;panX=0;panY=0;applyView()});
viewport.addEventListener('wheel',e=>{e.preventDefault();setZoom(zoom*(e.deltaY<0?1.12:1/1.12))},{passive:false});
viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY,px:panX,py:panY};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging')});
viewport.addEventListener('pointermove',e=>{if(!drag)return;panX=drag.px+e.clientX-drag.x;panY=drag.py+e.clientY-drag.y;applyView()});
const endDrag=()=>{drag=null;viewport.classList.remove('dragging')};
viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);

new ResizeObserver(applyView).observe(stage);
