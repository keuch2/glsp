<?php
$adminTitle = 'Usuarios';
$adminPage  = 'users';
require __DIR__ . '/../layout.php';
require_admin();

$users = db()->query("SELECT * FROM users ORDER BY created_at")->fetchAll();
?>
<div class="page-header">
  <h1>Usuarios</h1>
  <a href="/admin/users/edit.php" class="btn-primary"><i class="fas fa-plus"></i> Nuevo usuario</a>
</div>

<table class="data-table">
  <thead>
    <tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Último acceso</th><th></th></tr>
  </thead>
  <tbody>
  <?php foreach ($users as $u): ?>
    <tr>
      <td><?= h($u['username']) ?></td>
      <td><?= h($u['email']) ?></td>
      <td><span class="badge badge-<?= $u['role'] ?>"><?= h($u['role']) ?></span></td>
      <td><?= $u['last_login'] ? time_ago($u['last_login']) : 'Nunca' ?></td>
      <td class="table-actions">
        <a href="/admin/users/edit.php?id=<?= $u['id'] ?>" class="btn-icon" title="Editar"><i class="fas fa-pencil"></i></a>
        <?php if ($u['id'] !== (int)$_SESSION['user_id']): ?>
        <a href="/admin/users/delete.php?id=<?= $u['id'] ?>&csrf=<?= csrf_token() ?>"
           class="btn-icon btn-danger" title="Eliminar"
           onclick="return confirm('¿Eliminar este usuario?')"><i class="fas fa-trash"></i></a>
        <?php endif; ?>
      </td>
    </tr>
  <?php endforeach; ?>
  </tbody>
</table>

<?php require __DIR__ . '/../layout-end.php'; ?>
