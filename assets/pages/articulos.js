document.querySelectorAll('.cat-pill').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
}));
