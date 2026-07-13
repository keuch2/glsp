<?php
$adminTitle = 'Dashboard';
$adminPage  = 'dashboard';
require __DIR__ . '/layout.php';

// Stats
$totalPublished = (int)db()->query("SELECT COUNT(*) FROM posts WHERE status='published' AND published_at <= datetime('now')")->fetchColumn();
$totalDraft     = (int)db()->query("SELECT COUNT(*) FROM posts WHERE status='draft'")->fetchColumn();
$totalScheduled = (int)db()->query("SELECT COUNT(*) FROM posts WHERE status='scheduled' AND published_at > datetime('now')")->fetchColumn();
$totalMedia     = (int)db()->query("SELECT COUNT(*) FROM media")->fetchColumn();

$recentPosts = db()->query("SELECT p.*, u.username as author FROM posts p LEFT JOIN users u ON u.id=p.author_id ORDER BY p.created_at DESC LIMIT 5")->fetchAll();
$recentMedia = db()->query("SELECT * FROM media ORDER BY created_at DESC LIMIT 6")->fetchAll();
?>

<div class="page-header">
  <h1>Dashboard</h1>
  <a href="/admin/news/edit.php" class="btn-primary"><i class="fas fa-plus"></i> Nueva noticia</a>
</div>

<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number"><?= $totalPublished ?></div>
    <div class="stat-label">Publicadas</div>
  </div>
  <div class="stat-card">
    <div class="stat-number"><?= $totalDraft ?></div>
    <div class="stat-label">Borradores</div>
  </div>
  <div class="stat-card">
    <div class="stat-number"><?= $totalScheduled ?></div>
    <div class="stat-label">Programadas</div>
  </div>
  <div class="stat-card">
    <div class="stat-number"><?= $totalMedia ?></div>
    <div class="stat-label">Archivos en biblioteca</div>
  </div>
</div>

<div class="dashboard-cols">
  <div class="dashboard-col">
    <div class="panel">
      <div class="panel-header">
        <h2>Últimas noticias</h2>
        <a href="/admin/news/" class="panel-link">Ver todas</a>
      </div>
      <?php if (empty($recentPosts)): ?>
        <p class="empty-state">No hay noticias aún. <a href="/admin/news/edit.php">Crear primera</a></p>
      <?php else: ?>
      <table class="data-table">
        <tbody>
        <?php foreach ($recentPosts as $p): ?>
          <tr>
            <td>
              <a href="/admin/news/edit.php?id=<?= $p['id'] ?>"><?= h($p['title']) ?></a>
              <br><small class="text-muted"><?= h($p['author'] ?? '—') ?> · <?= time_ago($p['created_at']) ?></small>
            </td>
            <td><span class="badge badge-<?= $p['status'] ?>"><?= h($p['status']) ?></span></td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>
  </div>

  <div class="dashboard-col">
    <div class="panel">
      <div class="panel-header">
        <h2>Últimos archivos</h2>
        <a href="/admin/media/" class="panel-link">Ver biblioteca</a>
      </div>
      <?php if (empty($recentMedia)): ?>
        <p class="empty-state">No hay archivos todavía.</p>
      <?php else: ?>
      <div class="mini-media-grid">
        <?php foreach ($recentMedia as $m):
          $sizes = json_decode($m['sizes'] ?? '{}', true);
          $thumb = $sizes['thumb'] ?? null;
          $thumbUrl = $thumb ? '/uploads/images/thumbs/' . $thumb : null;
        ?>
          <div class="mini-media-item" title="<?= h($m['original_name']) ?>">
            <?php if ($thumbUrl): ?>
              <img src="<?= h($thumbUrl) ?>" alt="">
            <?php else: ?>
              <div class="file-icon-sm"><i class="fas <?= $m['type']==='video'?'fa-film':'fa-file' ?>"></i></div>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php require __DIR__ . '/layout-end.php'; ?>
