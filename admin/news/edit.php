<?php
$id = (int)($_GET['id'] ?? 0);
$adminTitle = $id ? 'Editar noticia' : 'Nueva noticia';
$adminPage  = 'news';
require __DIR__ . '/../layout.php';

$post = null;
$featuredMedia = null;
if ($id) {
    $post = db()->prepare('SELECT * FROM posts WHERE id = ?');
    $post->execute([$id]);
    $post = $post->fetch();
    if (!$post) { http_response_code(404); exit('Noticia no encontrada.'); }

    if ($post['featured_image_id']) {
        $mq = db()->prepare('SELECT * FROM media WHERE id = ?');
        $mq->execute([$post['featured_image_id']]);
        $featuredMedia = $mq->fetch();
    }
}

$error   = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();

    $title    = trim($_POST['title']   ?? '');
    $slug     = trim($_POST['slug']    ?? '');
    $excerpt  = trim($_POST['excerpt'] ?? '');
    $content  = $_POST['content']      ?? '';
    $status   = $_POST['status']       ?? 'draft';
    $pubDate  = trim($_POST['published_at'] ?? '');
    $featId   = (int)($_POST['featured_image_id'] ?? 0) ?: null;

    if (!$title) {
        $error = 'El título es requerido.';
    } else {
        if (!$slug) $slug = $id ? unique_slug($title, $id) : unique_slug($title);

        // Determine final status & published_at
        if ($status === 'publish_now') {
            $status  = 'published';
            $pubDate = date('Y-m-d H:i:s');
        } elseif ($status === 'scheduled') {
            $pubDate = $pubDate ? date('Y-m-d H:i:s', strtotime($pubDate)) : null;
            if (!$pubDate) { $error = 'Debes indicar una fecha para la publicación programada.'; }
        } elseif ($status === 'published') {
            // backdating — keep provided date
            $pubDate = $pubDate ? date('Y-m-d H:i:s', strtotime($pubDate)) : date('Y-m-d H:i:s');
        } else {
            $status  = 'draft';
            $pubDate = null;
        }

        if (!$error) {
            if ($id) {
                db()->prepare("UPDATE posts SET title=?,slug=?,excerpt=?,content=?,featured_image_id=?,status=?,published_at=?,updated_at=datetime('now') WHERE id=?")
                   ->execute([$title, $slug, $excerpt, $content, $featId, $status, $pubDate, $id]);
            } else {
                db()->prepare("INSERT INTO posts (title,slug,excerpt,content,featured_image_id,status,published_at,author_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,datetime('now'),datetime('now'))")
                   ->execute([$title, $slug, $excerpt, $content, $featId, $status, $pubDate, $_SESSION['user_id']]);
                $id   = (int)db()->lastInsertId();
                $post = db()->prepare('SELECT * FROM posts WHERE id=?');
                $post->execute([$id]);
                $post = $post->fetch();
            }
            $success = 'Guardado correctamente.';

            // Refresh featured media
            if ($featId) {
                $mq = db()->prepare('SELECT * FROM media WHERE id = ?');
                $mq->execute([$featId]);
                $featuredMedia = $mq->fetch();
            } else {
                $featuredMedia = null;
            }
        }
    }
}

$defaultSlug = $post['slug'] ?? '';
$defaultPub  = $post['published_at'] ? date('Y-m-d\TH:i', strtotime($post['published_at'])) : '';
$defaultStatus = $post['status'] ?? 'draft';

// Compute featured thumb URL
$featThumbUrl = '';
if ($featuredMedia && $featuredMedia['type'] === 'image') {
    $sizes = json_decode($featuredMedia['sizes'] ?? '{}', true);
    $thumb = $sizes['medium'] ?? ($sizes['full'] ?? null);
    if ($thumb) $featThumbUrl = '/uploads/images/' . (isset($sizes['medium']) ? 'medium' : 'full') . '/' . $thumb;
}
?>

<div class="page-header">
  <h1><?= $id ? 'Editar noticia' : 'Nueva noticia' ?></h1>
  <div style="display:flex;gap:8px;align-items:center">
    <?php if ($id && $post['status'] !== 'draft' && $post['published_at'] && $post['published_at'] <= date('Y-m-d H:i:s')): ?>
    <a href="/noticias/<?= h($post['slug']) ?>" target="_blank" class="btn-secondary">
      <i class="fas fa-eye"></i> Ver publicada
    </a>
    <?php endif; ?>
    <a href="/admin/news/" class="btn-secondary">← Volver</a>
  </div>
</div>

<?php if ($error): ?>
  <div class="alert alert-error"><?= h($error) ?></div>
<?php endif; ?>
<?php if ($success): ?>
  <div class="alert alert-success"><?= h($success) ?></div>
<?php endif; ?>

<form method="post" id="post-form">
  <input type="hidden" name="csrf" value="<?= csrf_token() ?>">

  <div class="edit-layout">
    <!-- Main column -->
    <div class="edit-main">
      <div class="panel">
        <div class="form-group">
          <label for="title">Título</label>
          <input type="text" id="title" name="title" value="<?= h($post['title'] ?? '') ?>"
                 required class="input-large" placeholder="Título de la noticia">
        </div>
        <div class="form-group">
          <label for="slug">Slug (URL)</label>
          <div class="input-prefix-wrap">
            <span class="input-prefix">/noticias/</span>
            <input type="text" id="slug" name="slug" value="<?= h($defaultSlug) ?>" placeholder="generado-del-titulo">
          </div>
        </div>
        <div class="form-group">
          <label for="excerpt">Extracto (opcional)</label>
          <textarea id="excerpt" name="excerpt" rows="2" placeholder="Breve resumen para listados y SEO"><?= h($post['excerpt'] ?? '') ?></textarea>
        </div>
      </div>

      <div class="panel">
        <label style="display:block;margin-bottom:12px;font-weight:600">Contenido</label>
        <textarea id="content" name="content"><?= htmlspecialchars($post['content'] ?? '', ENT_NOQUOTES) ?></textarea>
      </div>
    </div>

    <!-- Sidebar column -->
    <div class="edit-sidebar">

      <!-- Publish panel -->
      <div class="panel">
        <h3 class="panel-title">Publicación</h3>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="status" value="draft" <?= $defaultStatus==='draft'?'checked':'' ?>>
            <span><strong>Borrador</strong><br><small>No visible públicamente</small></span>
          </label>
          <label class="radio-label">
            <input type="radio" name="status" value="publish_now" <?= $defaultStatus==='published'?'checked':'' ?>>
            <span><strong>Publicar ahora</strong><br><small>Visible inmediatamente</small></span>
          </label>
          <label class="radio-label">
            <input type="radio" name="status" value="published" id="radio-backdate">
            <span><strong>Publicar con fecha</strong><br><small>Fecha pasada o personalizada</small></span>
          </label>
          <label class="radio-label">
            <input type="radio" name="status" value="scheduled" id="radio-scheduled" <?= $defaultStatus==='scheduled'?'checked':'' ?>>
            <span><strong>Programar</strong><br><small>Se publicará en la fecha indicada</small></span>
          </label>
        </div>
        <div id="pub-date-wrap" style="margin-top:12px;<?= in_array($defaultStatus,['published','scheduled'])?'':'display:none' ?>">
          <label>Fecha de publicación</label>
          <input type="datetime-local" name="published_at" id="published_at" value="<?= h($defaultPub) ?>">
        </div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button type="submit" class="btn-primary btn-full">Guardar</button>
        </div>
      </div>

      <!-- Featured image panel -->
      <div class="panel">
        <h3 class="panel-title">Imagen destacada</h3>
        <input type="hidden" name="featured_image_id" id="featured_image_id" value="<?= (int)($post['featured_image_id']??0) ?>">
        <div id="featured-preview" style="<?= $featThumbUrl?'':'display:none' ?>;margin-bottom:12px">
          <img id="featured-img" src="<?= h($featThumbUrl) ?>" alt="" style="width:100%;border-radius:4px;display:block">
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn-secondary" onclick="openMediaPicker('featured')">
            <i class="fas fa-image"></i> <?= $featuredMedia?'Cambiar imagen':'Seleccionar imagen' ?>
          </button>
          <?php if ($featuredMedia): ?>
          <button type="button" class="btn-secondary btn-danger-soft" onclick="clearFeaturedImage()">
            <i class="fas fa-xmark"></i> Quitar
          </button>
          <?php endif; ?>
        </div>
      </div>

    </div><!-- /.edit-sidebar -->
  </div>
</form>

<!-- TinyMCE -->
<script src="/admin/lib/tinymce/tinymce.min.js"></script>
<script>
const TINYMCE_MEDIA_BTN = 'glsp_media';
tinymce.init({
  selector: '#content',
  promotion: false,
  branding: false,
  license_key: 'gpl',
  height: 520,
  menubar: 'edit view insert format table',
  plugins: 'lists link image table code fullscreen wordcount',
  toolbar: 'undo redo | styles | bold italic | bullist numlist blockquote | link glsp_media | table | fullscreen code',
  style_formats: [
    {title:'Párrafo',     block:'p'},
    {title:'Título 2',    block:'h2'},
    {title:'Título 3',    block:'h3'},
    {title:'Cita',        block:'blockquote'},
  ],
  image_uploadtab: false,
  relative_urls: false,
  remove_script_host: false,
  setup(editor) {
    editor.ui.registry.addButton(TINYMCE_MEDIA_BTN, {
      icon: 'image',
      tooltip: 'Insertar imagen de biblioteca',
      onAction() { openMediaPicker('tinymce', editor); }
    });
  }
});

// Auto-generate slug from title
const titleInput = document.getElementById('title');
const slugInput  = document.getElementById('slug');
let slugEdited = <?= $id ? 'true' : 'false' ?>;
slugInput.addEventListener('input', () => slugEdited = true);
titleInput.addEventListener('input', () => {
  if (slugEdited) return;
  slugInput.value = titleInput.value
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
});

// Publish date toggle
document.querySelectorAll('input[name=status]').forEach(r => {
  r.addEventListener('change', () => {
    const show = r.value === 'scheduled' || r.value === 'published';
    document.getElementById('pub-date-wrap').style.display = show ? '' : 'none';
  });
});

function clearFeaturedImage() {
  document.getElementById('featured_image_id').value = '';
  document.getElementById('featured-preview').style.display = 'none';
}
</script>

<?php require __DIR__ . '/../layout-end.php'; ?>
