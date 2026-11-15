// 모바일 메뉴
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// 푸터 연도
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 갤러리 필터
const filterBtns = document.querySelectorAll('.filters button');
const items = [...document.querySelectorAll('.masonry figure')];
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(el => el.classList.toggle('hide', f !== 'all' && el.dataset.cat !== f));
  });
});

// 라이트박스
const lb = document.querySelector('.lightbox');
if (lb && items.length) {
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('p');
  let current = 0;

  const visible = () => items.filter(el => !el.classList.contains('hide'));
  const show = (i) => {
    const list = visible();
    current = (i + list.length) % list.length;
    const fig = list[current];
    const img = fig.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = fig.querySelector('.title').textContent;
  };
  const open = (fig) => { show(visible().indexOf(fig)); lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };

  items.forEach(fig => fig.addEventListener('click', () => open(fig)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}
