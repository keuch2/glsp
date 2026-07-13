<?php
$adminTitle = 'Noticias';
$adminPage  = 'news';
require __DIR__ . '/../layout.php';

$status = $_GET['status'] ?? '';
$valid  = ['', 'published', 'draft', 'scheduled'];
if (!in_array($status, $valid)) $status = '';

$where = $status ? "WHERE p.status = " . db()->quote($status) : '';
$posts = db()->query("
    SELECT p.*, u.username as author
    FROM posts p
    LEFT JOIN users u ON u.id = p.author_id
    $where
    ORDER BY p.created_at DESC
")->fetchAll();

$counts = db()->query("
    SELECT status, COUNT(*) as n FROM posts GROUP BY status
")->fetchAll(PDO::FETCH_KEY_PAIR);
?>

<div class="page-header">
  <h1>Noticias</h1>
  <a href="/admin/news/edit.php" class="btn-primary"><i class="fas fa-plus"></i> Nueva noticia</a>
</div>

<div class="filter-tabs">
  <a href="?" class="filter-tab <?= $status===''?'active':'' ?>">Todas (<?= array_sum($counts) ?>)</a>
  <a href="?status=published" class="filter-tab <?= $status==='published'?'active':'' ?>">Publicadas (<?= $counts['published']??0 ?>)</a>
  <a href="?status=scheduled" class="filter-tab <?= $status==='scheduled'?'active':'' ?>">Programadas (<?= $counts['scheduled']??0 ?>)</a>
  <a href="?status=draft" class="filter-tab <?= $status==='draft'?'active':'' ?>">Borradores (<?= $counts['draft']??0 ?>)</a>
</div>

<?php if (empty($posts)): ?>
  <p class="empty-state">No hay noticias en esta categoría.</p>
<?php else: ?>
<table class="data-table">
  <thead>
    <tr>
      <th>Título</th>
      <th>Estado</th>
      <th>Publicación</th>
      <th>Autor</th>
      <th>Creada</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  <?php foreach ($posts as $p):
    $pubDate = $p['published_at'] ? date('d/m/Y H:i', strtotime($p['published_at'])) : '—';
  ?>
    <tr>
      <td><a href="/admin/news/edit.php?id=<?= $p['id'] ?>"><?= h($p['title']) ?></a></td>
      <td><span class="badge badge-<?= $p['status'] ?>"><?= h($p['status']) ?></span></td>
      <td><?= $pubDate ?></td>
      <td><?= h($p['author'] ?? '—') ?></td>
      <td><?= time_ago($p['created_at']) ?></td>
      <td class="table-actions">
        <?php if ($p['status'] !== 'draft' && $p['published_at'] && $p['published_at'] <= date('Y-m-d H:i:s')): ?>
        <a href="/noticias/<?= h($p['slug']) ?>" target="_blank" class="btn-icon" title="Ver"><i class="fas fa-eye"></i></a>
        <?php endif; ?>
        <a href="/admin/news/edit.php?id=<?= $p['id'] ?>" class="btn-icon" title="Editar"><i class="fas fa-pencil"></i></a>
        <a href="/admin/news/delete.php?id=<?= $p['id'] ?>&csrf=<?= csrf_token() ?>"
           class="btn-icon btn-danger" title="Eliminar"
           onclick="return confirm('¿Eliminar esta noticia?')"><i class="fas fa-trash"></i></a>
      </td>
    </tr>
  <?php endforeach; ?>
  </tbody>
</table>
<?php endif; ?>

<?php require __DIR__ . '/../layout-end.php'; ?>
