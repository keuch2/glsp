<?php
// Expected variables set by each page:
// $activePage  string  — 'inicio'|'historia'|'noticias'|'museo'|'masoneria'|'filantropia'|'gran-logia'|'contacto'
// $pageTitle   string  — full <title> text
// $pageDesc    string  — meta description (optional)
$activePage = $activePage ?? '';
$pageTitle  = $pageTitle  ?? 'Gran Logia Simbólica del Paraguay';
$pageDesc   = $pageDesc   ?? 'La obediencia masónica regular del Paraguay. Origen y continuidad de la verdadera masonería paraguaya desde 1869.';

// Detect depth so relative paths resolve correctly (root vs subdir)
$depth = $depth ?? 0; // pages at root level use $depth=0; noticias/ uses $depth=1
$base  = str_repeat('../', $depth);

function nav_class(string $page, string $active): string {
    return $page === $active ? 'nav-item active' : 'nav-item';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title><?= htmlspecialchars($pageTitle) ?></title>
<meta name="description" content="<?= htmlspecialchars($pageDesc) ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="<?= $base ?>assets/site.css">
<?php
// Per-page CSS: assets/pages/<script>.css (e.g. historia.php → historia.css)
$pageKey  = $pageKey ?? basename($_SERVER['SCRIPT_NAME'] ?? '', '.php');
$pageCss  = GLSP_ROOT . '/assets/pages/' . $pageKey . '.css';
if (is_file($pageCss)): ?>
<link rel="stylesheet" href="<?= $base ?>assets/pages/<?= $pageKey ?>.css">
<?php endif; ?>
</head>
<body>

<div class="utility-bar">
  <div class="utility-inner">
    <div class="utility-left">
      <span><span class="dot"></span> Asunción · Paraguay</span>
      <span class="utility-meta"><em>Año Masónico</em> 2026 · A∴L∴ 6026</span>
    </div>
    <div class="utility-right">
      <div class="lang">
        <span class="active">ES</span><span>EN</span><span>PT</span>
      </div>
      <a class="member-link" href="<?= $base ?>miembros.php"><i class="fas fa-key"></i> Área de Hermanos</a>
    </div>
  </div>
</div>

<header class="masthead" id="masthead">
  <div class="masthead-inner">
    <a href="<?= $base ?>index.php" class="wordmark">
      <img src="<?= $base ?>glsp_assets/logo_glsp2026.png" alt="GLSP" class="wordmark-seal">
    </a>
    <nav class="primary-nav">
      <div class="<?= nav_class('gran-logia', $activePage) ?> has-sub">Gran Logia
        <div class="submenu">
          <a href="<?= $base ?>gran-logia.php#mensaje"><span class="num">i</span> Mensaje del Gran Maestro</a>
          <a href="<?= $base ?>noticias/"><span class="num">ii</span> Actualidad</a>
          <a href="<?= $base ?>gran-logia.php#gran-cuadro"><span class="num">iii</span> Gran Cuadro</a>
          <a href="<?= $base ?>grandes-maestros.php"><span class="num">iv</span> Histórico de Grandes Maestros</a>
        </div>
      </div>
      <a class="<?= nav_class('historia', $activePage) ?>" href="<?= $base ?>historia.php">Historia</a>
      <a class="<?= nav_class('noticias', $activePage) ?>" href="<?= $base ?>noticias/">Noticias</a>
      <a class="<?= nav_class('museo', $activePage) ?>" href="<?= $base ?>museo.php">Museo</a>
      <a class="<?= nav_class('eventos', $activePage) ?>" href="https://glsp.org.py/eventos" target="_blank" rel="noopener">Eventos<i class="fas fa-arrow-up-right-from-square nav-ext"></i></a>
      <a class="<?= nav_class('filantropia', $activePage) ?>" href="<?= $base ?>filantropia.php">Filantropía</a>
      <a class="<?= nav_class('masoneria', $activePage) ?>" href="<?= $base ?>masoneria.php">Masonería</a>
      <a class="<?= nav_class('contacto', $activePage) ?>" href="<?= $base ?>contacto.php">Contacto</a>
    </nav>
    <button class="menu-toggle" id="menuToggle"><i class="fas fa-bars"></i></button>
  </div>
</header>

<div class="mobile-panel" id="mobilePanel">
  <button class="mobile-close" id="mobileClose">&times;</button>
  <a href="<?= $base ?>gran-logia.php"><span class="num">01</span> Gran Logia</a>
  <a href="<?= $base ?>historia.php"><span class="num">02</span> Historia</a>
  <a href="<?= $base ?>noticias/"><span class="num">03</span> Noticias</a>
  <a href="<?= $base ?>museo.php"><span class="num">04</span> Museo</a>
  <a href="https://glsp.org.py/eventos" target="_blank" rel="noopener"><span class="num">05</span> Eventos <i class="fas fa-arrow-up-right-from-square" style="font-size:.7rem;opacity:.5;margin-left:4px"></i></a>
  <a href="<?= $base ?>masoneria.php"><span class="num">06</span> Masonería</a>
  <a href="<?= $base ?>filantropia.php"><span class="num">07</span> Filantropía</a>
  <a href="<?= $base ?>articulos.php"><span class="num">08</span> Artículos</a>
  <a href="<?= $base ?>grandes-maestros.php"><span class="num">09</span> Grandes Maestros</a>
  <a href="<?= $base ?>miembros.php"><span class="num">10</span> Área de Hermanos</a>
  <a href="<?= $base ?>contacto.php"><span class="num">11</span> Contacto</a>
</div>
