<?php
session_start();
define('GLSP_ROOT', dirname(dirname(__DIR__)));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_login();

$id = (int)($_GET['id'] ?? 0);
if (!$id || !hash_equals($_SESSION['csrf'] ?? '', $_GET['csrf'] ?? '')) {
    header('Location: /admin/media/');
    exit;
}

$media = db()->prepare('SELECT * FROM media WHERE id = ?');
$media->execute([$id]);
$media = $media->fetch();

if ($media) {
    // Delete physical files
    if ($media['type'] === 'image') {
        $sizes = json_decode($media['sizes'] ?? '{}', true);
        $dirs  = ['full'=>'full','large'=>'large','medium'=>'medium','thumb'=>'thumbs'];
        foreach ($sizes as $key => $file) {
            $dir  = $dirs[$key] ?? $key;
            $path = GLSP_ROOT . '/uploads/images/' . $dir . '/' . $file;
            if (file_exists($path)) unlink($path);
        }
    } elseif ($media['type'] === 'document') {
        $path = GLSP_ROOT . '/uploads/documents/' . $media['filename'];
        if (file_exists($path)) unlink($path);
    } elseif ($media['type'] === 'video') {
        $path = GLSP_ROOT . '/uploads/videos/' . $media['filename'];
        if (file_exists($path)) unlink($path);
    }

    db()->prepare('DELETE FROM media WHERE id = ?')->execute([$id]);
}

header('Location: /admin/media/');
