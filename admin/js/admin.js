'use strict';

// ── File upload helper ────────────────────────────────────────────────────────

async function uploadFiles(files, callbacks = {}) {
  const { onStart, onProgress, onDone, onFile } = callbacks;
  if (!files.length) return;
  onStart?.();
  let done = 0;
  for (const file of files) {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/admin/media/upload.php', { method: 'POST', body: fd });
      const d   = await res.json();
      onFile?.(d);
    } catch(e) {
      console.error('Upload error', e);
    }
    done++;
    onProgress?.(Math.round((done / files.length) * 100));
  }
  onDone?.();
}

// ── Media picker modal ────────────────────────────────────────────────────────

let _pickerMode    = null; // 'featured' | 'tinymce'
let _pickerEditor  = null;
let _selectedItem  = null;
let _currentType   = '';
let _currentPage   = 1;
let _searchTimer   = null;

const modal     = () => document.getElementById('media-modal');
const grid      = () => document.getElementById('media-grid');
const insertBtn = () => document.getElementById('media-insert-btn');
const infoEl    = () => document.getElementById('media-selection-info');

function openMediaPicker(mode, editor) {
  _pickerMode   = mode;
  _pickerEditor = editor || null;
  _selectedItem = null;
  _currentType  = '';
  _currentPage  = 1;

  modal().style.display = 'flex';
  document.getElementById('media-search').value = '';
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.type === ''));
  insertBtn().disabled = true;
  infoEl().textContent  = '';

  loadMediaGrid();
}

function closeMediaPicker() {
  modal().style.display = 'none';
  _selectedItem = null;
}

function loadMediaGrid(page = 1) {
  _currentPage = page;
  const q    = document.getElementById('media-search').value.trim();
  const url  = `/admin/media/picker.php?type=${_currentType}&q=${encodeURIComponent(q)}&page=${page}`;

  grid().innerHTML = '<div class="media-loading"><i class="fas fa-spinner fa-spin"></i></div>';

  fetch(url).then(r => r.json()).then(data => {
    if (!data.ok) { grid().innerHTML = '<p style="color:var(--danger);padding:20px">Error al cargar archivos.</p>'; return; }
    if (!data.items.length) { grid().innerHTML = '<p style="color:var(--muted);padding:20px;font-style:italic">No hay archivos.</p>'; return; }

    let html = data.items.map(item => {
      const thumb = item.thumb_url
        ? `<img src="${item.thumb_url}" alt="" loading="lazy">`
        : `<div class="media-grid-icon"><i class="fas ${item.type==='video'?'fa-film':item.type==='document'?'fa-file-lines':'fa-file'}"></i></div>`;
      return `<div class="media-grid-item" data-id="${item.id}" data-url="${item.url}" data-thumb="${item.thumb_url}" data-name="${item.name.replace(/"/g,'&quot;')}" data-type="${item.type}">
        <div class="media-grid-thumb">${thumb}</div>
        <div class="media-grid-name">${item.name}</div>
      </div>`;
    }).join('');

    // Pagination
    if (data.pages > 1) {
      html += '<div style="grid-column:1/-1;display:flex;gap:6px;padding-top:8px">';
      for (let i = 1; i <= data.pages; i++) {
        html += `<button onclick="loadMediaGrid(${i})" class="page-link ${i===data.page?'active':''}">${i}</button>`;
      }
      html += '</div>';
    }

    grid().innerHTML = html;

    // Attach click handlers
    grid().querySelectorAll('.media-grid-item').forEach(el => {
      el.addEventListener('click', () => selectMediaItem(el));
    });
  }).catch(() => {
    grid().innerHTML = '<p style="color:var(--danger);padding:20px">Error de conexión.</p>';
  });
}

function selectMediaItem(el) {
  grid().querySelectorAll('.media-grid-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
  _selectedItem = {
    id:    parseInt(el.dataset.id),
    url:   el.dataset.url,
    thumb: el.dataset.thumb,
    name:  el.dataset.name,
    type:  el.dataset.type,
  };
  insertBtn().disabled = false;
  infoEl().textContent = _selectedItem.name;
}

function doInsert() {
  if (!_selectedItem) return;

  if (_pickerMode === 'featured') {
    document.getElementById('featured_image_id').value = _selectedItem.id;
    const preview = document.getElementById('featured-preview');
    const img     = document.getElementById('featured-img');
    if (img && _selectedItem.thumb) {
      img.src = _selectedItem.thumb;
      preview.style.display = '';
    }
  } else if (_pickerMode === 'tinymce' && _pickerEditor) {
    _pickerEditor.insertContent(
      `<img src="${_selectedItem.url}" alt="${_selectedItem.name}" style="max-width:100%">`
    );
  }

  closeMediaPicker();
}

// ── Upload inside modal ───────────────────────────────────────────────────────

function setupModalUpload() {
  const zone      = document.getElementById('media-upload-zone');
  const fileInput = document.getElementById('media-file-input');
  const progress  = document.getElementById('media-upload-progress');
  const fill      = document.getElementById('progress-fill');
  const txt       = document.getElementById('progress-text');

  if (!zone) return;

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragging'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragging');
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files, {
      onStart:    () => { progress.style.display = 'block'; },
      onProgress: p  => { fill.style.width = p + '%'; txt.textContent = 'Subiendo ' + p + '%'; },
      onDone:     () => { progress.style.display = 'none'; fill.style.width = '0'; loadMediaGrid(_currentPage); },
    });
  });

  fileInput.addEventListener('change', () => {
    uploadFiles(Array.from(fileInput.files), {
      onStart:    () => { progress.style.display = 'block'; },
      onProgress: p  => { fill.style.width = p + '%'; txt.textContent = 'Subiendo ' + p + '%'; },
      onDone:     () => { progress.style.display = 'none'; fill.style.width = '0'; fileInput.value = ''; loadMediaGrid(_currentPage); },
    });
  });
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupModalUpload();

  // Close modal
  document.getElementById('media-modal-close')?.addEventListener('click', closeMediaPicker);
  document.getElementById('media-cancel-btn')?.addEventListener('click', closeMediaPicker);
  modal()?.addEventListener('click', e => { if (e.target === modal()) closeMediaPicker(); });

  // Insert button
  insertBtn()?.addEventListener('click', doInsert);

  // Tab filter
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _currentType = btn.dataset.type;
      loadMediaGrid(1);
    });
  });

  // Search
  document.getElementById('media-search')?.addEventListener('input', () => {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(() => loadMediaGrid(1), 350);
  });
});
