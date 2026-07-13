<?php
session_start();
define('GLSP_ROOT', dirname(__DIR__));
require_once GLSP_ROOT . '/includes/db.php';

if (!empty($_SESSION['user_id'])) {
    header('Location: /admin/'); exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username && $password) {
        $q = db()->prepare('SELECT * FROM users WHERE username = ? OR email = ?');
        $q->execute([$username, $username]);
        $user = $q->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['user_id']   = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            db()->prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?")
               ->execute([$user['id']]);
            $back = $_GET['back'] ?? '/admin/';
            header('Location: ' . $back); exit;
        }
    }
    $error = 'Usuario o contraseña incorrectos.';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Acceso — GLSP Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Lora:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body class="login-page">
<div class="login-wrap">
  <div class="login-logo">
    <img src="/glsp_assets/logo_glsp2026.png" alt="GLSP">
    <div class="login-logo-text">Admin CMS</div>
  </div>
  <form method="post" class="login-form">
    <?php if ($error): ?>
      <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <div class="form-group">
      <label>Usuario o email</label>
      <input type="text" name="username" required autofocus>
    </div>
    <div class="form-group">
      <label>Contraseña</label>
      <input type="password" name="password" required>
    </div>
    <button type="submit" class="btn-primary btn-full">Ingresar</button>
  </form>
  <?php
  $q = db()->query('SELECT COUNT(*) FROM users');
  if ((int)$q->fetchColumn() === 0):
  ?>
  <p style="text-align:center;margin-top:24px;font-size:.85rem;color:#888">
    ¿Primera vez? <a href="/admin/setup.php">Crear cuenta de administrador</a>
  </p>
  <?php endif; ?>
</div>
</body>
</html>
