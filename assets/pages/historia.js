// Decade filter
document.querySelectorAll('.h-decade').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('.h-decade').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const d=b.dataset.d;
    document.querySelectorAll('.htl-event').forEach(e=>{
      e.style.display=(d==='all'||e.dataset.decade===d)?'grid':'none';
    });
  });
});
