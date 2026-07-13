<?php
$depth = 1;
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

$slug = $_GET['slug'] ?? '';
if (!$slug) { header('Location: /noticias/'); exit; }

$post = get_post_by_slug($slug);
if (!$post) { http_response_code(404); }

$activePage = 'noticias';
$pageTitle  = $post ? h($post['title']) . ' — GLSP' : 'Artículo no encontrado — GLSP';

include __DIR__ . '/../includes/header.php';

if (!$post):
?>
<section class="section-dark" style="padding:120px 20px;text-align:center">
  <div class="wrap">
    <h1 style="color:var(--gold)">404</h1>
    <p>El artículo solicitado no existe o no está disponible.</p>
    <a href="/noticias/" style="color:var(--gold)">← Volver a Noticias</a>
  </div>
</section>
<?php else:
    $sizes  = json_decode($post['img_sizes'] ?? '{}', true);
    $hero   = $sizes['full'] ?? null;
    $heroUrl = $hero ? '/uploads/images/full/' . $hero : null;
?>

<?php if ($heroUrl): ?>
<div style="width:100%;max-height:480px;overflow:hidden">
  <img src="<?= h($heroUrl) ?>" alt="<?= h($post['img_alt'] ?? $post['title']) ?>"
       style="width:100%;height:480px;object-fit:cover;display:block">
</div>
<?php endif; ?>

<section class="section-dark" style="padding:48px 20px 80px">
  <div class="wrap" style="max-width:780px">
    <div style="margin-bottom:32px">
      <a href="/noticias/" style="font-family:Montserrat,sans-serif;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;color:var(--gold);text-decoration:none">
        <i class="fas fa-arrow-left" style="margin-right:6px;font-size:.75rem"></i> Noticias
      </a>
    </div>

    <div style="font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:16px">
      <?= h(format_date_es($post['published_at'])) ?>
      <?php if ($post['author_name']): ?>
        · <?= h($post['author_name']) ?>
      <?php endif; ?>
    </div>

    <h1 style="font-size:clamp(1.6rem,4vw,2.4rem);line-height:1.2;margin:0 0 32px;color:var(--gold)">
      <?= h($post['title']) ?>
    </h1>

    <div class="news-body" style="font-family:Lora,serif;font-size:1.05rem;line-height:1.8;color:rgba(255,255,255,.88)">
      <?= $post['content'] ?>
    </div>
  </div>
</section>

<?php endif; ?>

<?php include __DIR__ . '/../includes/footer.php'; ?>
