<?php
defined('GLSP_ROOT') or define('GLSP_ROOT', dirname(__DIR__));

function make_slug(string $text): string {
    $text = mb_strtolower($text, 'UTF-8');
    $map = ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ü'=>'u','ñ'=>'n',
            'à'=>'a','è'=>'e','ì'=>'i','ò'=>'o','ù'=>'u','â'=>'a','ê'=>'e',
            'î'=>'i','ô'=>'o','û'=>'u','ã'=>'a','õ'=>'o','ç'=>'c'];
    $text = strtr($text, $map);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', trim($text));
    return $text;
}

function unique_slug(string $title, ?int $excludeId = null): string {
    $base = make_slug($title);
    $slug = $base;
    $i = 1;
    while (true) {
        $q = db()->prepare('SELECT id FROM posts WHERE slug = ?');
        $q->execute([$slug]);
        $row = $q->fetch();
        if (!$row || $row['id'] === $excludeId) break;
        $slug = $base . '-' . $i++;
    }
    return $slug;
}

function h(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function csrf_token(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_check(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(403);
        exit('Token CSRF inválido.');
    }
}

function time_ago(string $datetime): string {
    $diff = time() - strtotime($datetime);
    if ($diff < 60) return 'hace un momento';
    if ($diff < 3600) return 'hace ' . floor($diff/60) . ' min';
    if ($diff < 86400) return 'hace ' . floor($diff/3600) . ' h';
    if ($diff < 604800) return 'hace ' . floor($diff/86400) . ' días';
    return date('d/m/Y', strtotime($datetime));
}

function format_date_es(string $datetime): string {
    $months = ['enero','febrero','marzo','abril','mayo','junio',
               'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    $t = strtotime($datetime);
    return intval(date('j', $t)) . ' de ' . $months[intval(date('n', $t))-1] . ' de ' . date('Y', $t);
}

// ── Image processing ─────────────────────────────────────────────────────────

function generate_uuid(): string {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function process_image(string $tmpPath, string $mime): array {
    $img = match($mime) {
        'image/jpeg' => imagecreatefromjpeg($tmpPath),
        'image/png'  => imagecreatefrompng($tmpPath),
        'image/gif'  => imagecreatefromgif($tmpPath),
        'image/webp' => imagecreatefromwebp($tmpPath),
        default      => throw new RuntimeException('Tipo de imagen no soportado'),
    };

    $origW = imagesx($img);
    $origH = imagesy($img);
    $hasAlpha = ($mime === 'image/png' || $mime === 'image/gif');
    $ext = $hasAlpha ? 'png' : 'jpg';

    $uuid = generate_uuid();
    $sizes = [];
    $root = GLSP_ROOT . '/uploads/images/';

    $configs = [
        'full'   => ['dir' => 'full/',   'maxW' => 1920, 'maxH' => 0, 'q' => 85],
        'large'  => ['dir' => 'large/',  'maxW' => 1200, 'maxH' => 0, 'q' => 82],
        'medium' => ['dir' => 'medium/', 'maxW' => 640,  'maxH' => 0, 'q' => 80],
        'thumb'  => ['dir' => 'thumbs/', 'maxW' => 150,  'maxH' => 150, 'q' => 78],
    ];

    foreach ($configs as $key => $cfg) {
        $filename = $uuid . '_' . $key . '.' . $ext;
        $path = $root . $cfg['dir'] . $filename;

        if ($key === 'thumb') {
            $dst = scale_crop($img, $origW, $origH, 150, 150, $hasAlpha);
        } else {
            $dst = scale_fit($img, $origW, $origH, $cfg['maxW'], $hasAlpha);
        }

        save_image($dst, $path, $ext, $cfg['q']);
        imagedestroy($dst);
        $sizes[$key] = $filename;
    }

    imagedestroy($img);
    return ['uuid' => $uuid, 'sizes' => $sizes, 'width' => $origW, 'height' => $origH, 'ext' => $ext];
}

function scale_fit($src, int $sw, int $sh, int $maxW, bool $alpha): GdImage {
    if ($sw <= $maxW) {
        $dw = $sw; $dh = $sh;
    } else {
        $dw = $maxW;
        $dh = (int)round($sh * $maxW / $sw);
    }
    $dst = imagecreatetruecolor($dw, $dh);
    if ($alpha) {
        imagealphablending($dst, false);
        imagesavealpha($dst, true);
        $t = imagecolorallocatealpha($dst, 0, 0, 0, 127);
        imagefill($dst, 0, 0, $t);
    }
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $dw, $dh, $sw, $sh);
    return $dst;
}

function scale_crop($src, int $sw, int $sh, int $tw, int $th, bool $alpha): GdImage {
    $srcRatio = $sw / $sh;
    $tgtRatio = $tw / $th;
    if ($srcRatio > $tgtRatio) {
        $cropH = $sh; $cropW = (int)round($sh * $tgtRatio);
        $cropX = (int)round(($sw - $cropW) / 2); $cropY = 0;
    } else {
        $cropW = $sw; $cropH = (int)round($sw / $tgtRatio);
        $cropX = 0; $cropY = (int)round(($sh - $cropH) / 2);
    }
    $dst = imagecreatetruecolor($tw, $th);
    if ($alpha) {
        imagealphablending($dst, false);
        imagesavealpha($dst, true);
    }
    imagecopyresampled($dst, $src, 0, 0, $cropX, $cropY, $tw, $th, $cropW, $cropH);
    return $dst;
}

function save_image(GdImage $img, string $path, string $ext, int $quality): void {
    if ($ext === 'png') {
        $pngQ = (int)round((100 - $quality) * 9 / 100);
        imagepng($img, $path, $pngQ);
    } else {
        imagejpeg($img, $path, $quality);
    }
}

// ── Media helpers ─────────────────────────────────────────────────────────────

function media_thumb_url(array $media): string {
    if ($media['type'] !== 'image') return '/admin/css/file-icon.svg';
    $sizes = json_decode($media['sizes'] ?? '{}', true);
    $file = $sizes['thumb'] ?? ($sizes['medium'] ?? null);
    return $file ? '/uploads/images/thumbs/' . $file : '';
}

function media_url(array $media, string $size = 'full'): string {
    if ($media['type'] !== 'image') return '/uploads/documents/' . $media['filename'];
    $sizes = json_decode($media['sizes'] ?? '{}', true);
    $dirs = ['full'=>'full','large'=>'large','medium'=>'medium','thumb'=>'thumbs'];
    $file = $sizes[$size] ?? ($sizes['full'] ?? null);
    return $file ? '/uploads/images/' . ($dirs[$size] ?? 'full') . '/' . $file : '';
}

function format_bytes(int $bytes): string {
    if ($bytes < 1024) return $bytes . ' B';
    if ($bytes < 1048576) return round($bytes/1024, 1) . ' KB';
    return round($bytes/1048576, 1) . ' MB';
}

// ── Post queries ──────────────────────────────────────────────────────────────

function get_published_posts(int $page = 1, int $perPage = 10): array {
    $offset = ($page - 1) * $perPage;
    $q = db()->prepare("
        SELECT p.*, u.username as author_name,
               m.sizes as img_sizes, m.type as img_type
        FROM posts p
        LEFT JOIN users u ON u.id = p.author_id
        LEFT JOIN media m ON m.id = p.featured_image_id
        WHERE p.status IN ('published','scheduled')
          AND p.published_at IS NOT NULL
          AND p.published_at <= datetime('now')
        ORDER BY p.published_at DESC
        LIMIT ? OFFSET ?
    ");
    $q->execute([$perPage, $offset]);
    return $q->fetchAll();
}

function count_published_posts(): int {
    $q = db()->query("
        SELECT COUNT(*) FROM posts
        WHERE status IN ('published','scheduled')
          AND published_at IS NOT NULL
          AND published_at <= datetime('now')
    ");
    return (int)$q->fetchColumn();
}

function get_post_by_slug(string $slug): ?array {
    $q = db()->prepare("
        SELECT p.*, u.username as author_name,
               m.sizes as img_sizes, m.type as img_type, m.alt_text as img_alt
        FROM posts p
        LEFT JOIN users u ON u.id = p.author_id
        LEFT JOIN media m ON m.id = p.featured_image_id
        WHERE p.slug = ?
          AND p.status IN ('published','scheduled')
          AND p.published_at IS NOT NULL
          AND p.published_at <= datetime('now')
    ");
    $q->execute([$slug]);
    return $q->fetch() ?: null;
}
