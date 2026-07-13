<?php
if (session_status() === PHP_SESSION_NONE) session_start();

function require_login(): void {
    if (empty($_SESSION['user_id'])) {
        $back = urlencode($_SERVER['REQUEST_URI'] ?? '');
        header('Location: /admin/login.php' . ($back ? '?back=' . $back : ''));
        exit;
    }
}

function require_admin(): void {
    require_login();
    if (($_SESSION['user_role'] ?? '') !== 'admin') {
        http_response_code(403);
        exit('Acceso restringido a administradores.');
    }
}

function current_user(): ?array {
    if (empty($_SESSION['user_id'])) return null;
    static $user = null;
    if ($user === null) {
        $q = db()->prepare('SELECT id, username, email, role FROM users WHERE id = ?');
        $q->execute([$_SESSION['user_id']]);
        $user = $q->fetch() ?: null;
    }
    return $user;
}

function login_user(array $user): void {
    session_regenerate_id(true);
    $_SESSION['user_id']   = $user['id'];
    $_SESSION['user_role'] = $user['role'];
    db()->prepare('UPDATE users SET last_login = datetime(\'now\') WHERE id = ?')
       ->execute([$user['id']]);
}

function logout_user(): void {
    $_SESSION = [];
    session_destroy();
}
