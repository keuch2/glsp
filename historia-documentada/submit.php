<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$db_path = __DIR__ . '/data/formularios.db';

if (!is_dir(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

try {
    $db = new SQLite3($db_path);
    $db->enableExceptions(true);

    $db->exec("CREATE TABLE IF NOT EXISTS notificaciones (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre    TEXT NOT NULL,
        canal     TEXT NOT NULL,
        email     TEXT,
        whatsapp  TEXT,
        fecha     TEXT NOT NULL
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS pedidos (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre    TEXT NOT NULL,
        pais      TEXT,
        ciudad    TEXT,
        email     TEXT NOT NULL,
        telefono  TEXT,
        cantidad  INTEGER DEFAULT 1,
        envio     TEXT,
        direccion TEXT,
        mensaje   TEXT,
        fecha     TEXT NOT NULL
    )");
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo inicializar la base de datos.']);
    exit;
}

$action = $_POST['action'] ?? '';
$now    = date('Y-m-d H:i:s');

if ($action === 'notificacion') {
    $nombre   = trim($_POST['nombre']   ?? '');
    $canal    = trim($_POST['canal']    ?? '');
    $email    = trim($_POST['email']    ?? '');
    $whatsapp = trim($_POST['whatsapp'] ?? '');

    if (!$nombre || !$canal) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Datos incompletos.']);
        exit;
    }
    if (($canal === 'email' || $canal === 'both') && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Email inválido.']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO notificaciones (nombre, canal, email, whatsapp, fecha)
                          VALUES (:nombre, :canal, :email, :whatsapp, :fecha)");
    $stmt->bindValue(':nombre',   $nombre,   SQLITE3_TEXT);
    $stmt->bindValue(':canal',    $canal,    SQLITE3_TEXT);
    $stmt->bindValue(':email',    $email,    SQLITE3_TEXT);
    $stmt->bindValue(':whatsapp', $whatsapp, SQLITE3_TEXT);
    $stmt->bindValue(':fecha',    $now,      SQLITE3_TEXT);
    $stmt->execute();

    echo json_encode(['ok' => true]);

} elseif ($action === 'pedido') {
    $nombre    = trim($_POST['nombre']    ?? '');
    $pais      = trim($_POST['pais']      ?? '');
    $ciudad    = trim($_POST['ciudad']    ?? '');
    $email     = trim($_POST['email']     ?? '');
    $telefono  = trim($_POST['telefono']  ?? '');
    $cantidad  = (int)($_POST['cantidad'] ?? 1);
    $envio     = trim($_POST['envio']     ?? '');
    $direccion = trim($_POST['direccion'] ?? '');
    $mensaje   = trim($_POST['mensaje']   ?? '');

    if (!$nombre || !$email || !$pais) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Datos incompletos.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Email inválido.']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO pedidos
        (nombre, pais, ciudad, email, telefono, cantidad, envio, direccion, mensaje, fecha)
        VALUES (:nombre, :pais, :ciudad, :email, :telefono, :cantidad, :envio, :direccion, :mensaje, :fecha)");
    $stmt->bindValue(':nombre',    $nombre,    SQLITE3_TEXT);
    $stmt->bindValue(':pais',      $pais,      SQLITE3_TEXT);
    $stmt->bindValue(':ciudad',    $ciudad,    SQLITE3_TEXT);
    $stmt->bindValue(':email',     $email,     SQLITE3_TEXT);
    $stmt->bindValue(':telefono',  $telefono,  SQLITE3_TEXT);
    $stmt->bindValue(':cantidad',  $cantidad,  SQLITE3_INTEGER);
    $stmt->bindValue(':envio',     $envio,     SQLITE3_TEXT);
    $stmt->bindValue(':direccion', $direccion, SQLITE3_TEXT);
    $stmt->bindValue(':mensaje',   $mensaje,   SQLITE3_TEXT);
    $stmt->bindValue(':fecha',     $now,       SQLITE3_TEXT);
    $stmt->execute();

    echo json_encode(['ok' => true]);

} else {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Acción no reconocida.']);
}

$db->close();
