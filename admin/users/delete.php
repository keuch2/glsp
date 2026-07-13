<?php
session_start();
define('GLSP_ROOT', dirname(dirname(__DIR__)));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_admin();

$id = (int)($_GET['id'] ?? 0);
if (!$id || !hash_equals($_SESSION['csrf'] ?? '', $_GET['csrf'] ?? '')) {
    header('Location: /admin/users/'); exit;
}

// Prevent self-deletion and deleting the last admin
$admins = (int)db()->query("SELECT COUNT(*) FROM users WHERE role='admin'")->fetchColumn();
$target = db()->prepare('SELECT role FROM users WHERE id=?');
$target->execute([$id]);
$target = $target->fetch();

if ($id === (int)$_SESSION['user_id'] || ($target && $target['role']==='admin' && $admins <= 1)) {
    header('Location: /admin/users/'); exit;
}

db()->prepare('DELETE FROM users WHERE id=?')->execute([$id]);
header('Location: /admin/users/');
