// Masthead scroll
const mast=document.getElementById('masthead');
const back=document.getElementById('backTop');
window.addEventListener('scroll',()=>{
  if(mast){if(window.scrollY>60)mast.classList.add('scrolled');else mast.classList.remove('scrolled')}
  if(back){if(window.scrollY>700)back.classList.add('show');else back.classList.remove('show')}
});
if(back)back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Mobile menu
const tog=document.getElementById('menuToggle');
const panel=document.getElementById('mobilePanel');
const close=document.getElementById('mobileClose');
if(tog&&panel){tog.addEventListener('click',()=>panel.classList.add('open'))}
if(close)close.addEventListener('click',()=>panel.classList.remove('open'));
if(panel)panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));

// Reveal
const ro=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}});
},{threshold:.1,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// Counters
const co=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target.querySelector('[data-target]');
    if(!el||el.dataset.done)return;
    const tgt=+el.dataset.target;
    const fmt=el.dataset.format==='dot';
    const dur=1800;
    const start=performance.now();
    function tick(t){
      const p=Math.min(1,(t-start)/dur);
      const eased=1-Math.pow(1-p,3);
      const v=Math.round(tgt*eased);
      el.textContent=fmt?v.toLocaleString('es-PY'):v;
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    el.dataset.done='1';
  });
},{threshold:.4});
document.querySelectorAll('.stat').forEach(el=>co.observe(el));

// Hero slider (homepage only)
(function(){
  const slides=document.querySelectorAll('.hero-slide');
  if(!slides.length)return;
  const rails=document.querySelectorAll('.rail-item');
  let cur=0,timer;
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    rails.forEach(r=>r.classList.remove('active'));
    slides[i].classList.add('active');
    if(rails[i])rails[i].classList.add('active');
    cur=i;
  }
  window.changeSlide=function(d){show((cur+d+slides.length)%slides.length);reset()};
  function reset(){clearInterval(timer);timer=setInterval(()=>changeSlide(1),6500)}
  rails.forEach((r,i)=>r.addEventListener('click',()=>{show(i);reset()}));
  timer=setInterval(()=>changeSlide(1),6500);
})();

// Q&A accordion (any page)
document.querySelectorAll('.qa-trigger').forEach(t=>{
  t.addEventListener('click',()=>t.parentElement.classList.toggle('open'));
});

// Year for footer
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
