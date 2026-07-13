# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public website + lightweight CMS for the **Gran Logia Simbólica del Paraguay** (GLSP). Plain PHP 8.4, no framework, no Composer. All content and UI copy is in Spanish and must stay in Spanish.

The directory lives inside the `/opt/homebrew` Homebrew git checkout but is **not tracked by that repo** — it is gitignored. The `git branch`/`git remote` you see (Homebrew branches, `keuch2/verticepro.git`) belong to the enclosing checkout, **not** to this project. Treat this project as untracked working files; there is no project-specific git history here.

## Running locally

Served from the Homebrew Apache docroot at `/opt/homebrew/var/www/glsp2026`. Use the Homebrew LAMP stack (httpd + PHP + no MySQL needed — data is SQLite). Do **not** use XAMPP/MAMP.

- Restart Apache after config changes: `brew services restart httpd`
- Quick standalone alternative (honors most routing but **not** `.htaccess` rewrites): `php -S localhost:8000` from the project root.
- `.htaccess` handles: clean news URLs (`/noticias/slug` → `noticias/article.php?slug=slug`), a permanent `.html` → `.php` redirect, and `Options -Indexes`. Rewrite-dependent behavior only works under Apache, not the PHP built-in server.

There is no build step, no linter config, and no test suite. Changes to `.php`/`.css`/`.js` are live on next request.

## Architecture

### Two surfaces
- **Public site** — PHP pages at the root (`index.php`, `historia.php`, `noticias/`, etc.). Mostly static, hand-authored markup; only `noticias/` reads from the database.
- **Admin CMS** — everything under `admin/`. Session-authenticated, manages news posts, a media library, and users.

### Request lifecycle (public pages)
Each page sets `$activePage`, `$pageTitle` (optionally `$pageDesc`, `$depth`), requires `includes/db.php` + `includes/functions.php`, then wraps content between `includes/header.php` and `includes/footer.php`. `$depth` (0 at root, 1 in `noticias/`) drives the `$base` relative-path prefix used throughout header/footer links — set it correctly in any page placed in a subdirectory, or asset and nav links break.

### Per-page CSS/JS (`assets/pages/`)
`site.css` + `site.js` + `i18n.js` are global. Anything page-specific lives in `assets/pages/<name>.css` and `assets/pages/<name>.js`, where `<name>` is the page's script basename (e.g. `historia.php` → `assets/pages/historia.css`). `header.php` auto-links the `.css` and `footer.php` auto-links the `.js` **if the file exists** — no per-page `<link>`/`<script>` tags needed. The lookup key is `basename($_SERVER['SCRIPT_NAME'], '.php')`; override it by setting `$pageKey` before including the header (needed for subdir pages like `noticias/` to avoid colliding with `index`). These files were extracted from the original `html/*.html` mockups, which had this CSS/JS inline in a `<style>`/`<script>`; the conversion to `.php` dropped it, so **if a page renders unstyled, check whether its `assets/pages/` file exists**. Paths inside these CSS files must be **absolute** (`/glsp_assets/...`), since the file is served from `assets/pages/`, not the page's own directory.

### Data layer
- Single SQLite DB at `data/cms.db` (WAL mode, foreign keys ON), accessed via the `db()` singleton in `includes/db.php`.
- Three tables: `users`, `media`, `posts`. Schema is created by `admin/setup.php` / migrations already applied — inspect with `sqlite3 data/cms.db ".schema"`.
- `posts.status` is `draft` | `published` | `scheduled`. A post is publicly visible only when `status IN ('published','scheduled')` AND `published_at <= now`. This exact predicate lives in `get_published_posts()` / `get_post_by_slug()` / `count_published_posts()` in `includes/functions.php` — reuse those helpers rather than re-deriving the visibility rule.

### `includes/functions.php` is the shared toolbox
Contains slug generation (`make_slug`/`unique_slug`, which transliterates Spanish accents), `h()` for HTML escaping, CSRF (`csrf_token`/`csrf_check`), Spanish date formatting (`format_date_es`, `time_ago`), the GD-based image pipeline (`process_image` → generates `full`/`large`/`medium`/`thumb` renditions into `uploads/images/<size>/`, filenames keyed by UUID and stored as JSON in `media.sizes`), and the `media_url`/`media_thumb_url` accessors that read that JSON. When adding image-backed features, go through `process_image` and `media_url`, not ad-hoc file paths.

### Auth (`includes/auth.php`)
Session-based. `require_login()` gates any admin page; `require_admin()` additionally requires `role === 'admin'` (only Users management uses this). Roles are `admin` | `editor`. `admin/setup.php` self-disables once any user exists — it's the one-time bootstrap for the first admin.

### Admin page pattern
An admin page sets `$adminPage` (sidebar active state) + `$adminTitle`, then `require`s `admin/layout.php` (which calls `require_login()` and opens the chrome) and closes with `admin/layout-end.php`. All admin `POST` handlers must call `csrf_check()` and render the token via `csrf_token()`. News editing (`admin/news/edit.php`) uses the bundled TinyMCE at `admin/lib/tinymce/` (vendored, do not fetch from CDN).

## Conventions & gotchas

- **Escape all dynamic output** with `h()` (or `htmlspecialchars`). The codebase does this consistently — match it.
- **`.php` is the source of truth.** The `html/` directory holds the **original static mockups** the PHP pages were derived from (legacy, kept for reference). Don't edit `html/*.html` expecting site changes; edit the corresponding root `.php`.
- Front-end assets live in `assets/` (`site.css`, `site.js`, `i18n.js`); brand imagery in `glsp_assets/`. Fonts (Google Fonts: Lora + Montserrat) and Font Awesome load from CDN in header/footer.
- Uploaded media is written under `uploads/` (`images/{full,large,medium,thumbs}/`, `documents/`, `videos/`) — user data, not fixtures.
- `certificacion/` and `historia-documentada/` are semi-standalone mini-sites (their own `index.html`, CSS/JS, and in the latter a `submit.php`) — separate from the main PHP page flow.
- Masonic terminology and the Spanish institutional voice are intentional throughout — preserve tone and terms (e.g. "tenida", "Serenísimo Gran Maestro", "A∴L∴") when editing copy.
