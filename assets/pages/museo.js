// Tabs
document.querySelectorAll('button.cc-tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.cc-tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.cc-pane').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('pane-'+t.dataset.pane).classList.add('active');
  });
});
// Lightbox
const lb=document.getElementById('lightbox');
const lbItems=document.querySelectorAll('.gallery-item');
let lbIdx=0;
function openLB(i){
  const it=lbItems[i];
  lbIdx=i;
  document.getElementById('lbTitle').textContent=it.dataset.title||'';
  document.getElementById('lbDesc').textContent=it.dataset.desc||'';
  document.getElementById('lbInfo').textContent=it.dataset.info||'';
  const im=it.querySelector('img');
  document.getElementById('lbImg').innerHTML=im?'<img src="'+im.src+'" alt="">':'<span style="color:rgba(255,255,255,.4);font-family:Lora,serif;font-style:italic">[ Imagen del objeto del museo ]</span>';
  lb.classList.add('open');
}
lbItems.forEach((it,i)=>it.addEventListener('click',()=>openLB(i)));
document.getElementById('lbClose').addEventListener('click',()=>lb.classList.remove('open'));
document.getElementById('lbPrev').addEventListener('click',()=>openLB((lbIdx-1+lbItems.length)%lbItems.length));
document.getElementById('lbNext').addEventListener('click',()=>openLB((lbIdx+1)%lbItems.length));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')lb.classList.remove('open');
  if(e.key==='ArrowLeft')openLB((lbIdx-1+lbItems.length)%lbItems.length);
  if(e.key==='ArrowRight')openLB((lbIdx+1)%lbItems.length);
});
