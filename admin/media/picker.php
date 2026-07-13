<?php
session_start();
header('Content-Type: application/json');
define('GLSP_ROOT', dirname(dirname(__DIR__)));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_login();

$type = $_GET['type'] ?? '';
$q    = trim($_GET['q'] ?? '');
$page = max(1, (int)($_GET['page'] ?? 1));
$per  = 24;
$off  = ($page - 1) * $per;

$where  = [];
$params = [];
if ($type && in_array($type, ['image','document','video'])) {
    $where[]  = 'type = ?';
    $params[] = $type;
}
if ($q) {
    $where[]  = 'original_name LIKE ?';
    $params[] = '%' . $q . '%';
}
$whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

$countQ = db()->prepare("SELECT COUNT(*) FROM media $whereSQL");
$countQ->execute($params);
$total = (int)$countQ->fetchColumn();

$params[] = $per;
$params[] = $off;
$rows = db()->prepare("SELECT * FROM media $whereSQL ORDER BY created_at DESC LIMIT ? OFFSET ?");
$rows->execute($params);
$items = $rows->fetchAll();

$result = [];
foreach ($items as $m) {
    $sizes = json_decode($m['sizes'] ?? '{}', true);
    $thumb = '';
    $url   = '';
    if ($m['type'] === 'image') {
        $tf  = $sizes['thumb'] ?? null;
        $ff  = $sizes['full']  ?? null;
        $mf  = $sizes['medium']?? null;
        $thumb = $tf ? '/uploads/images/thumbs/' . $tf : '';
        $url   = $mf ? '/uploads/images/medium/' . $mf : ($ff ? '/uploads/images/full/' . $ff : '');
    } elseif ($m['type'] === 'document') {
        $url = '/uploads/documents/' . $m['filename'];
    } else {
        $url = '/uploads/videos/' . $m['filename'];
    }

    $result[] = [
        'id'        => $m['id'],
        'type'      => $m['type'],
        'name'      => $m['original_name'],
        'size'      => format_bytes($m['file_size']),
        'thumb_url' => $thumb,
        'url'       => $url,
        'date'      => date('d/m/Y', strtotime($m['created_at'])),
        'alt'       => $m['alt_text'],
        'title'     => $m['title'],
    ];
}

echo json_encode([
    'ok'    => true,
    'items' => $result,
    'total' => $total,
    'pages' => (int)ceil($total / $per),
    'page'  => $page,
]);
