<?php
// Include this from admin pages:
// $adminPage = 'news';   // for sidebar active state
// $adminTitle = '...';   // <title> suffix

if (session_status() === PHP_SESSION_NONE) session_start();
defined('GLSP_ROOT') or define('GLSP_ROOT', dirname(__DIR__));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_login();

$adminTitle = $adminTitle ?? 'Admin';
$adminPage  = $adminPage  ?? '';
$user       = current_user();

function admin_nav_class(string $page, string $active): string {
    return $page === $active ? 'sidebar-link active' : 'sidebar-link';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= htmlspecialchars($adminTitle) ?> — GLSP Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body class="admin-body">

<div class="admin-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/glsp_assets/logo_glsp2026.png" alt="GLSP" class="sidebar-logo">
      <span>GLSP<br><small>Admin</small></span>
    </div>
    <nav class="sidebar-nav">
      <a href="/admin/" class="<?= admin_nav_class('dashboard', $adminPage) ?>">
        <i class="fas fa-gauge-high"></i> Dashboard
      </a>
      <a href="/admin/news/" class="<?= admin_nav_class('news', $adminPage) ?>">
        <i class="fas fa-newspaper"></i> Noticias
      </a>
      <a href="/admin/media/" class="<?= admin_nav_class('media', $adminPage) ?>">
        <i class="fas fa-photo-film"></i> Biblioteca de medios
      </a>
      <?php if (($user['role'] ?? '') === 'admin'): ?>
      <a href="/admin/users/" class="<?= admin_nav_class('users', $adminPage) ?>">
        <i class="fas fa-users"></i> Usuarios
      </a>
      <?php endif; ?>
    </nav>
    <div class="sidebar-footer">
      <a href="/" target="_blank" class="sidebar-link-sm">
        <i class="fas fa-arrow-up-right-from-square"></i> Ver sitio
      </a>
      <a href="/admin/logout.php" class="sidebar-link-sm">
        <i class="fas fa-right-from-bracket"></i> Salir
      </a>
      <div class="sidebar-user"><?= htmlspecialchars($user['username'] ?? '') ?></div>
    </div>
  </aside>

  <!-- Main -->
  <main class="admin-main">
    <div class="admin-content">
