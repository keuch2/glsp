<?php
$depth      = 1;
$activePage = 'noticias';
$pageTitle  = 'Noticias — Gran Logia Simbólica del Paraguay';
$pageDesc   = 'Actualidad y noticias de la Gran Logia Simbólica del Paraguay.';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

$page    = max(1, (int)($_GET['p'] ?? 1));
$perPage = 10;
$total   = count_published_posts();
$posts   = get_published_posts($page, $perPage);
$pages   = (int)ceil($total / $perPage);

include __DIR__ . '/../includes/header.php';
?>

<section class="page-header section-dark" style="padding:100px 20px 40px;text-align:center">
  <div class="wrap">
    <div class="section-eyebrow">ACTUALIDAD</div>
    <h1>Noticias</h1>
    <p style="color:var(--gold-muted,rgba(201,164,73,.75));font-family:Lora,serif;font-style:italic">
      Información oficial de la Gran Logia Simbólica del Paraguay
    </p>
  </div>
</section>

<section class="section-dark" style="padding:40px 20px 80px">
  <div class="wrap">

<?php if (empty($posts)): ?>
    <p style="text-align:center;color:var(--gold);font-family:Lora,serif;font-style:italic;padding:60px 0">
      No hay noticias publicadas todavía.
    </p>
<?php else: ?>
    <div class="news-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:32px">
    <?php foreach ($posts as $post):
        $sizes = json_decode($post['img_sizes'] ?? '{}', true);
        $thumb = $sizes['medium'] ?? null;
        $imgUrl = $thumb ? '/uploads/images/medium/' . $thumb : null;
    ?>
      <article class="news-card" style="background:var(--navy,#161729);border-radius:6px;overflow:hidden;display:flex;flex-direction:column">
        <?php if ($imgUrl): ?>
        <a href="/noticias/<?= h($post['slug']) ?>">
          <img src="<?= h($imgUrl) ?>" alt="<?= h($post['title']) ?>"
               style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block">
        </a>
        <?php endif; ?>
        <div style="padding:24px;display:flex;flex-direction:column;flex:1">
          <div style="font-family:Montserrat,sans-serif;font-size:11px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:8px">
            <?= h(format_date_es($post['published_at'])) ?>
          </div>
          <h2 style="font-size:1.15rem;margin:0 0 12px;line-height:1.35">
            <a href="/noticias/<?= h($post['slug']) ?>" style="color:inherit;text-decoration:none">
              <?= h($post['title']) ?>
            </a>
          </h2>
          <?php if ($post['excerpt']): ?>
          <p style="font-size:.9rem;color:rgba(255,255,255,.7);margin:0 0 16px;flex:1">
            <?= h($post['excerpt']) ?>
          </p>
          <?php endif; ?>
          <a href="/noticias/<?= h($post['slug']) ?>"
             style="font-family:Montserrat,sans-serif;font-size:.8rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--gold);text-decoration:none">
            Leer más <i class="fas fa-arrow-right" style="font-size:.75rem"></i>
          </a>
        </div>
      </article>
    <?php endforeach; ?>
    </div>

    <?php if ($pages > 1): ?>
    <nav style="display:flex;justify-content:center;gap:8px;margin-top:48px">
      <?php for ($i = 1; $i <= $pages; $i++): ?>
        <a href="?p=<?= $i ?>"
           style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:4px;font-family:Montserrat,sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;
                  <?= $i === $page ? 'background:var(--gold);color:var(--ink,#0e0f1a)' : 'background:var(--navy,#161729);color:var(--gold);border:1px solid var(--gold)' ?>">
          <?= $i ?>
        </a>
      <?php endfor; ?>
    </nav>
    <?php endif; ?>

<?php endif; ?>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
