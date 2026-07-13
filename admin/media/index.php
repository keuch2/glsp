<?php
$adminTitle = 'Biblioteca de medios';
$adminPage  = 'media';
require __DIR__ . '/../layout.php';

$type  = $_GET['type'] ?? '';
$q     = trim($_GET['q'] ?? '');
$page  = max(1, (int)($_GET['page'] ?? 1));
$per   = 30;
$off   = ($page - 1) * $per;

$where  = [];
$params = [];
if ($type && in_array($type, ['image','document','video'])) {
    $where[]  = 'type = ?'; $params[] = $type;
}
if ($q) {
    $where[]  = 'original_name LIKE ?'; $params[] = '%'.$q.'%';
}
$whereSQL = $where ? 'WHERE '.implode(' AND ',$where) : '';

$totalQ = db()->prepare("SELECT COUNT(*) FROM media $whereSQL");
$totalQ->execute($params);
$total = (int)$totalQ->fetchColumn();
$pages = (int)ceil($total / $per);

$params[] = $per; $params[] = $off;
$stmt = db()->prepare("SELECT m.*, u.username as uploader FROM media m LEFT JOIN users u ON u.id=m.uploaded_by $whereSQL ORDER BY m.created_at DESC LIMIT ? OFFSET ?");
$stmt->execute($params);
$items = $stmt->fetchAll();
?>

<div class="page-header">
  <h1>Biblioteca de medios</h1>
  <label for="bulk-upload" class="btn-primary" style="cursor:pointer">
    <i class="fas fa-upload"></i> Subir archivos
    <input type="file" id="bulk-upload" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mov,.avi,.webm" style="display:none">
  </label>
</div>

<!-- Upload progress -->
<div id="upload-banner" style="display:none" class="upload-banner">
  <div class="progress-bar" style="flex:1"><div class="progress-fill" id="page-progress-fill"></div></div>
  <span id="page-progress-text">Subiendo...</span>
</div>

<div class="filter-bar">
  <div class="filter-tabs">
    <a href="?" class="filter-tab <?= $type===''?'active':'' ?>">Todo</a>
    <a href="?type=image" class="filter-tab <?= $type==='image'?'active':'' ?>">Imágenes</a>
    <a href="?type=document" class="filter-tab <?= $type==='document'?'active':'' ?>">Documentos</a>
    <a href="?type=video" class="filter-tab <?= $type==='video'?'active':'' ?>">Videos</a>
  </div>
  <form method="get" class="search-form" style="display:flex;gap:8px">
    <?php if ($type): ?><input type="hidden" name="type" value="<?= h($type) ?>"><?php endif; ?>
    <input type="text" name="q" value="<?= h($q) ?>" placeholder="Buscar por nombre..." class="form-control">
    <button type="submit" class="btn-secondary">Buscar</button>
  </form>
</div>

<div id="media-library-grid" class="media-library-grid">
<?php if (empty($items)): ?>
  <p class="empty-state">No hay archivos en la biblioteca.</p>
<?php else: ?>
  <?php foreach ($items as $m):
    $sizes = json_decode($m['sizes'] ?? '{}', true);
    $thumb = '';
    if ($m['type'] === 'image') {
      $tf = $sizes['thumb'] ?? null;
      $thumb = $tf ? '/uploads/images/thumbs/' . $tf : '';
    }
  ?>
  <div class="media-lib-item" data-id="<?= $m['id'] ?>" data-type="<?= h($m['type']) ?>">
    <div class="media-lib-thumb">
      <?php if ($thumb): ?>
        <img src="<?= h($thumb) ?>" alt="">
      <?php else: ?>
        <div class="file-icon-lg">
          <i class="fas <?= $m['type']==='video'?'fa-film':($m['type']==='document'?'fa-file-lines':'fa-file') ?>"></i>
        </div>
      <?php endif; ?>
    </div>
    <div class="media-lib-meta">
      <div class="media-lib-name" title="<?= h($m['original_name']) ?>"><?= h($m['original_name']) ?></div>
      <div class="media-lib-info"><?= format_bytes($m['file_size']) ?> · <?= date('d/m/Y', strtotime($m['created_at'])) ?></div>
      <div class="media-lib-actions">
        <a href="/admin/media/delete.php?id=<?= $m['id'] ?>&csrf=<?= csrf_token() ?>"
           onclick="return confirm('¿Eliminar este archivo?')"
           class="btn-icon btn-danger" title="Eliminar"><i class="fas fa-trash"></i></a>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
<?php endif; ?>
</div>

<?php if ($pages > 1): ?>
<nav class="pagination" style="display:flex;justify-content:center;gap:8px;margin-top:32px">
  <?php for ($i = 1; $i <= $pages; $i++): ?>
    <a href="?<?= http_build_query(array_filter(['type'=>$type,'q'=>$q,'page'=>$i])) ?>"
       class="page-link <?= $i===$page?'active':'' ?>"><?= $i ?></a>
  <?php endfor; ?>
</nav>
<?php endif; ?>

<script>
// Direct upload from library page
document.getElementById('bulk-upload').addEventListener('change', function() {
  uploadFiles(Array.from(this.files), {
    onStart: () => { document.getElementById('upload-banner').style.display='flex'; },
    onProgress: (pct) => { document.getElementById('page-progress-fill').style.width=pct+'%'; document.getElementById('page-progress-text').textContent='Subiendo '+Math.round(pct)+'%'; },
    onDone: () => { location.reload(); },
  });
});
</script>
<?php require __DIR__ . '/../layout-end.php'; ?>
