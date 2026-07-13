<?php
session_start();
define('GLSP_ROOT', dirname(__DIR__));
require_once GLSP_ROOT . '/includes/db.php';

// Only accessible when no users exist
$count = (int)db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
if ($count > 0) {
    http_response_code(404);
    exit('Página no disponible.');
}

$error = '';
$done  = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email']    ?? '');
    $pass     = $_POST['password']      ?? '';
    $pass2    = $_POST['password2']     ?? '';

    if (!$username || !$email || !$pass) {
        $error = 'Todos los campos son requeridos.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Email inválido.';
    } elseif (strlen($pass) < 8) {
        $error = 'La contraseña debe tener al menos 8 caracteres.';
    } elseif ($pass !== $pass2) {
        $error = 'Las contraseñas no coinciden.';
    } else {
        $hash = password_hash($pass, PASSWORD_DEFAULT);
        db()->prepare("INSERT INTO users (username, email, password_hash, role, created_at) VALUES (?,?,?,'admin', datetime('now'))")
           ->execute([$username, $email, $hash]);
        $done = true;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Configuración inicial — GLSP Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Lora:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body class="login-page">
<div class="login-wrap">
  <div class="login-logo">
    <img src="/glsp_assets/logo_glsp2026.png" alt="GLSP">
    <div class="login-logo-text">Configuración inicial</div>
  </div>
<?php if ($done): ?>
  <div class="alert alert-success">
    ✓ Administrador creado correctamente. <a href="/admin/login.php">Iniciar sesión</a>
  </div>
<?php else: ?>
  <?php if ($error): ?><div class="alert alert-error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
  <form method="post" class="login-form">
    <div class="form-group">
      <label>Nombre de usuario</label>
      <input type="text" name="username" required>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" name="email" required>
    </div>
    <div class="form-group">
      <label>Contraseña (mínimo 8 caracteres)</label>
      <input type="password" name="password" minlength="8" required>
    </div>
    <div class="form-group">
      <label>Confirmar contraseña</label>
      <input type="password" name="password2" required>
    </div>
    <button type="submit" class="btn-primary btn-full">Crear administrador</button>
  </form>
<?php endif; ?>
</div>
</body>
</html>
