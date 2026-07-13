// Generate decorative QR-like pattern (visual only, not scannable)
(function(){
  const grid=document.getElementById('qrPattern');
  const seed='glsp2026';let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))%10000;
  for(let i=0;i<400;i++){
    const cell=document.createElement('span');
    h=(h*1664525+1013904223)%4294967296;
    if((h>>>0)%100<55||(i<3*20)||(i%20<3)||(i>=17*20)||(i%20>=17)){
      cell.style.background='var(--gold)';
    }else{cell.style.background='transparent'}
    grid.appendChild(cell);
  }
  // Position markers (corners) for QR look
  const corners=[[0,0],[0,17],[17,0]];
  corners.forEach(([r,c])=>{
    for(let dr=0;dr<3;dr++)for(let dc=0;dc<3;dc++){
      const idx=(r+dr)*20+(c+dc);
      grid.children[idx].style.background='var(--gold)';
    }
    for(let dr=0;dr<5;dr++)for(let dc=0;dc<5;dc++){
      if(dr===0||dr===4||dc===0||dc===4){
        const idx=(r-1+dr)*20+(c-1+dc);
        if(idx>=0&&idx<400)grid.children[idx].style.background='var(--gold)';
      }
    }
  });
})();

// Playlist UI
let playing=false;
const fill=document.getElementById('progFill');
const mainPlay=document.getElementById('mainPlay');
const cur=document.getElementById('curTime');
const tot=document.getElementById('totTime');
let progress=0,timer;
function setActive(row){
  document.querySelectorAll('.playlist-row').forEach(r=>r.classList.remove('active'));
  row.classList.add('active');
  document.getElementById('nowTitle').textContent=row.dataset.t;
  document.getElementById('nowDur').textContent=row.dataset.d+' · Voz institucional';
  tot.textContent=row.dataset.d;
  progress=0;fill.style.width='0%';cur.textContent='0:00';
}
function togglePlay(){
  playing=!playing;
  mainPlay.innerHTML=playing?'<i class="fas fa-pause"></i>':'<i class="fas fa-play"></i>';
  document.querySelectorAll('.playlist-row').forEach(r=>{
    const ic=r.querySelector('.pl-play i');
    if(r.classList.contains('active'))ic.className=playing?'fas fa-pause':'fas fa-play';
    else ic.className='fas fa-play';
  });
  if(playing){
    timer=setInterval(()=>{
      progress+=1;
      const p=Math.min(progress,200);
      fill.style.width=(p/200*100)+'%';
      const s=Math.floor(p/200*204);// 3:24 = 204s
      cur.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
      if(p>=200){togglePlay()}
    },80);
  }else{clearInterval(timer)}
}
mainPlay.addEventListener('click',togglePlay);
document.querySelectorAll('.playlist-row').forEach(r=>{
  r.addEventListener('click',()=>{
    setActive(r);
    if(!playing)togglePlay();
  });
});
