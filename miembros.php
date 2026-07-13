<?php
$activePage = 'miembros';
$pageTitle  = 'Área de Hermanos — Gran Logia Simbólica del Paraguay';
$pageDesc   = 'Acceso reservado a los hermanos en regularidad de la Gran Logia Simbólica del Paraguay.';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>

<section class="member-page">
  <div class="member-spread">
    <div class="member-form-wrap reveal">
      <div class="page-chapter" style="margin-bottom:24px"><span class="num">Nº 10</span><span class="line"></span><span class="label">Acceso restringido</span></div>
      <h1>Área de <em>Hermanos</em></h1>
      <p class="member-lead">Portal interno de la Gran Logia Simbólica del Paraguay.</p>
      <form class="member-form" method="post" action="miembros.php">
        <label>Usuario o correo electrónico</label>
        <input type="text" name="usuario" placeholder="hermano@glsp.org.py" autocomplete="username" required>
        <label>Contraseña</label>
        <input type="password" name="password" placeholder="••••••••••" autocomplete="current-password" required>
        <div class="form-options">
          <label><input type="checkbox" name="recordar" value="1" style="width:auto;margin:0"> Recordar sesión</label>
          <a href="contacto.php">¿Olvidó la contraseña?</a>
        </div>
        <button type="submit" class="btn-primary">Iniciar sesión <i class="fas fa-arrow-right"></i></button>
      </form>
      <div class="member-protected"><i class="fas fa-lock"></i> Zona protegida — Sólo hermanos en regularidad</div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
