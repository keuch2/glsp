<?php
$activePage = 'miembros';
$pageTitle  = 'Área de Hermanos — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>
        <button type="submit" class="btn-primary">Iniciar sesión <i class="fas fa-arrow-right"></i></button>
      </form>
      <div class="member-protected"><i class="fas fa-lock"></i> Zona protegida — Sólo hermanos en regularidad</div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
