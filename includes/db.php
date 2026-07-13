<?php
defined('GLSP_ROOT') or define('GLSP_ROOT', dirname(__DIR__));

function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $path = GLSP_ROOT . '/data/cms.db';
        $pdo = new PDO('sqlite:' . $path);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->exec('PRAGMA journal_mode=WAL');
        $pdo->exec('PRAGMA foreign_keys=ON');
    }
    return $pdo;
}
