<?php
session_start();
header('Content-Type: application/json');
define('GLSP_ROOT', dirname(dirname(__DIR__)));
require_once GLSP_ROOT . '/includes/db.php';
require_once GLSP_ROOT . '/includes/functions.php';
require_once GLSP_ROOT . '/includes/auth.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'No se recibió ningún archivo.']);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Error de carga: ' . $file['error']]);
    exit;
}

// Validate MIME
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$realMime = $finfo->file($file['tmp_name']);

$imageTypes    = ['image/jpeg','image/png','image/gif','image/webp'];
$documentTypes = ['application/pdf','application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/vnd.ms-excel',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'application/vnd.ms-powerpoint',
                  'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
$videoTypes    = ['video/mp4','video/quicktime','video/x-msvideo','video/webm','video/mpeg'];

$maxSizes = [
    'image'    => 20 * 1024 * 1024,
    'document' => 10 * 1024 * 1024,
    'video'    => 200 * 1024 * 1024,
];

if (in_array($realMime, $imageTypes)) {
    $type = 'image';
} elseif (in_array($realMime, $documentTypes)) {
    $type = 'document';
} elseif (in_array($realMime, $videoTypes)) {
    $type = 'video';
} else {
    http_response_code(415);
    echo json_encode(['ok'=>false,'error'=>'Tipo de archivo no permitido: ' . $realMime]);
    exit;
}

if ($file['size'] > $maxSizes[$type]) {
    http_response_code(413);
    echo json_encode(['ok'=>false,'error'=>'El archivo supera el tamaño máximo permitido.']);
    exit;
}

$originalName = basename($file['name']);

try {
    if ($type === 'image') {
        $result = process_image($file['tmp_name'], $realMime);
        $uuid   = $result['uuid'];
        $sizes  = json_encode($result['sizes']);
        $width  = $result['width'];
        $height = $result['height'];
        $stored = $uuid; // no single file path for images

        db()->prepare("INSERT INTO media (filename,original_name,type,mime_type,file_size,width,height,sizes,uploaded_by,created_at)
                       VALUES (?,?,?,?,?,?,?,?,?,datetime('now'))")
           ->execute([$uuid, $originalName, $type, $realMime, $file['size'], $width, $height, $sizes, $_SESSION['user_id']]);

    } elseif ($type === 'document') {
        $uuid   = generate_uuid();
        $ext    = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $stored = $uuid . '.' . $ext;
        $dest   = GLSP_ROOT . '/uploads/documents/' . $stored;
        if (!move_uploaded_file($file['tmp_name'], $dest)) throw new RuntimeException('Error al mover el archivo.');

        db()->prepare("INSERT INTO media (filename,original_name,type,mime_type,file_size,uploaded_by,created_at)
                       VALUES (?,?,?,?,?,?,datetime('now'))")
           ->execute([$stored, $originalName, $type, $realMime, $file['size'], $_SESSION['user_id']]);

    } else { // video
        $uuid   = generate_uuid();
        $ext    = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $stored = $uuid . '.' . $ext;
        $dest   = GLSP_ROOT . '/uploads/videos/' . $stored;
        if (!move_uploaded_file($file['tmp_name'], $dest)) throw new RuntimeException('Error al mover el archivo.');

        db()->prepare("INSERT INTO media (filename,original_name,type,mime_type,file_size,uploaded_by,created_at)
                       VALUES (?,?,?,?,?,?,datetime('now'))")
           ->execute([$stored, $originalName, $type, $realMime, $file['size'], $_SESSION['user_id']]);
    }

    $newId = (int)db()->lastInsertId();
    $media = db()->prepare('SELECT * FROM media WHERE id = ?');
    $media->execute([$newId]);
    $media = $media->fetch();

    echo json_encode([
        'ok'   => true,
        'id'   => $newId,
        'type' => $type,
        'name' => $originalName,
        'thumb_url' => media_thumb_url($media),
        'url'       => media_url($media, 'full'),
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>$e->getMessage()]);
}
