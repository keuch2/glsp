<?php
session_start();
define('GLSP_ROOT', dirname(dirname(__DIR__)));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_login();

$id = (int)($_GET['id'] ?? 0);
if (!$id || !hash_equals($_SESSION['csrf'] ?? '', $_GET['csrf'] ?? '')) {
    header('Location: /admin/news/');
    exit;
}
db()->prepare('DELETE FROM posts WHERE id = ?')->execute([$id]);
header('Location: /admin/news/?deleted=1');
