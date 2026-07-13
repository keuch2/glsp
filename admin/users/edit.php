<?php
$id = (int)($_GET['id'] ?? 0);
$adminTitle = $id ? 'Editar usuario' : 'Nuevo usuario';
$adminPage  = 'users';
require __DIR__ . '/../layout.php';
require_admin();

$u = null;
if ($id) {
    $q = db()->prepare('SELECT * FROM users WHERE id = ?');
    $q->execute([$id]);
    $u = $q->fetch();
    if (!$u) { http_response_code(404); exit('Usuario no encontrado.'); }
}

$error = ''; $success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email']    ?? '');
    $role     = in_array($_POST['role'] ?? '', ['admin','editor']) ? $_POST['role'] : 'editor';
    $pass     = $_POST['password']  ?? '';
    $pass2    = $_POST['password2'] ?? '';

    if (!$username || !$email) {
        $error = 'Usuario y email son requeridos.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Email inválido.';
    } elseif (!$id && !$pass) {
        $error = 'La contraseña es requerida para nuevos usuarios.';
    } elseif ($pass && strlen($pass) < 8) {
        $error = 'La contraseña debe tener al menos 8 caracteres.';
    } elseif ($pass && $pass !== $pass2) {
        $error = 'Las contraseñas no coinciden.';
    } else {
        if ($id) {
            $sql    = 'UPDATE users SET username=?,email=?,role=?';
            $params = [$username, $email, $role];
            if ($pass) { $sql .= ',password_hash=?'; $params[] = password_hash($pass, PASSWORD_DEFAULT); }
            $sql .= ' WHERE id=?'; $params[] = $id;
            db()->prepare($sql)->execute($params);
        } else {
            db()->prepare("INSERT INTO users (username,email,password_hash,role,created_at) VALUES (?,?,?,?,datetime('now'))")
               ->execute([$username, $email, password_hash($pass, PASSWORD_DEFAULT), $role]);
        }
        $success = 'Usuario guardado correctamente.';
        if ($id) { $q = db()->prepare('SELECT * FROM users WHERE id=?'); $q->execute([$id]); $u = $q->fetch(); }
    }
}
?>
<div class="page-header">
  <h1><?= $id ? 'Editar usuario' : 'Nuevo usuario' ?></h1>
  <a href="/admin/users/" class="btn-secondary">← Volver</a>
</div>

<?php if ($error): ?><div class="alert alert-error"><?= h($error) ?></div><?php endif; ?>
<?php if ($success): ?><div class="alert alert-success"><?= h($success) ?></div><?php endif; ?>

<form method="post" class="form-narrow">
  <input type="hidden" name="csrf" value="<?= csrf_token() ?>">
  <div class="form-group">
    <label>Nombre de usuario</label>
    <input type="text" name="username" value="<?= h($u['username']??'') ?>" required>
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" name="email" value="<?= h($u['email']??'') ?>" required>
  </div>
  <div class="form-group">
    <label>Rol</label>
    <select name="role">
      <option value="editor" <?= ($u['role']??'editor')==='editor'?'selected':'' ?>>Editor</option>
      <option value="admin"  <?= ($u['role']??'')==='admin'?'selected':'' ?>>Administrador</option>
    </select>
  </div>
  <div class="form-group">
    <label><?= $id ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña' ?></label>
    <input type="password" name="password" minlength="8" <?= $id?'':'required' ?>>
  </div>
  <div class="form-group">
    <label>Confirmar contraseña</label>
    <input type="password" name="password2">
  </div>
  <button type="submit" class="btn-primary">Guardar</button>
</form>

<?php require __DIR__ . '/../layout-end.php'; ?>
