const cfg=window.SPORTS_MEDIA||{};
const a=document.getElementById('avatar'),b=document.getElementById('presentation'),videos=[a,b];
const play=document.getElementById('play'),progress=document.getElementById('progress'),current=document.getElementById('current'),duration=document.getElementById('duration');
const fmt=t=>{if(!Number.isFinite(t))return '00:00';return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`};
for(const [el,key] of [[a,'avatar'],[b,'presentation']]){el.src=cfg[key]||'';el.addEventListener('loadedmetadata',()=>{document.getElementById(el.id+'-placeholder').hidden=true;update()});el.addEventListener('error',()=>{document.getElementById(el.id+'-placeholder').hidden=false});}
function update(){const max=Math.max(...videos.map(v=>Number.isFinite(v.duration)?v.duration:0));const t=a.readyState>=1?a.currentTime:(b.readyState>=1?b.currentTime:0);duration.textContent=fmt(max);current.textContent=fmt(t);progress.value=max?Math.round(t/max*1000):0}
let playing=false;
async function toggle(){if(!playing){const ready=videos.filter(v=>v.readyState>=1);if(!ready.length){document.getElementById('videoHint').textContent='尚未找到视频。请先把 MP4 放入 assets 文件夹，或在 config.js 中填写 COS 视频地址。';return;}const master=ready[0];for(const v of ready){if(Math.abs(v.currentTime-master.currentTime)>.25)v.currentTime=Math.min(master.currentTime,v.duration||master.currentTime)}const results=await Promise.allSettled(ready.map(v=>v.play()));playing=results.some(r=>r.status==='fulfilled');}else{videos.forEach(v=>v.pause());playing=false}play.innerHTML=playing?'Ⅱ <span>同步暂停</span>':'▶ <span>同步播放</span>'}
play.addEventListener('click',toggle);document.getElementById('restart').addEventListener('click',()=>{videos.forEach(v=>{v.pause();try{v.currentTime=0}catch{}});playing=false;play.innerHTML='▶ <span>同步播放</span>';update()});
document.getElementById('speed').addEventListener('change',e=>videos.forEach(v=>v.playbackRate=Number(e.target.value)));
progress.addEventListener('input',()=>{const max=Math.max(...videos.map(v=>Number.isFinite(v.duration)?v.duration:0));const t=max*Number(progress.value)/1000;videos.forEach(v=>{if(v.readyState>=1)v.currentTime=Math.min(t,v.duration||t)});update()});
for(const v of videos){v.addEventListener('timeupdate',update);v.addEventListener('ended',()=>{if(videos.every(x=>x.ended||x.paused)){playing=false;play.innerHTML='▶ <span>同步播放</span>'}})}
setInterval(()=>{if(!playing||a.readyState<2||b.readyState<2)return;const diff=Math.abs(a.currentTime-b.currentTime);if(diff>.35){const leader=a.currentTime>=b.currentTime?a:b,lagger=leader===a?b:a;try{lagger.currentTime=leader.currentTime}catch{}}},1200);
document.querySelectorAll('.mute').forEach(btn=>btn.addEventListener('click',()=>{const v=document.getElementById(btn.dataset.for);v.muted=!v.muted;btn.textContent=v.muted?'声音：关':'声音：开'}));
let page=1;const pdf=document.getElementById('pdf');pdf.src=(cfg.pdf||'')+'#page=1&toolbar=1';document.getElementById('download').href=cfg.pptx;document.getElementById('openPdf').href=cfg.pdf;
function setPage(n){page=Math.max(1,n);document.getElementById('page').textContent=page;pdf.src=cfg.pdf+'#page='+page+'&toolbar=1'}
document.getElementById('prev').addEventListener('click',()=>setPage(page-1));document.getElementById('next').addEventListener('click',()=>setPage(page+1));
// 在没有配置真实文件时展示友好的占位界面；PDF 加载失败可用“新窗口查看 PDF”备用。
const placeholder=document.getElementById('pdf-placeholder');pdf.addEventListener('load',()=>{if(cfg.pdf&&!cfg.pdf.startsWith('assets/'))placeholder.hidden=true});
