<?php
$activePage = 'museo';
$pageTitle  = 'Museo y Centro Cultural Masónico — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>

<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('templos/palma-asuncion/cover.jpg')"></div>
  <div class="page-hero-inner">
    <div class="breadcrumb"><a href="index.php">Inicio</a><span class="sep">/</span><span>Museo y Centro Cultural Masónico</span></div>
    <div class="page-chapter"><span class="num">Nº 04</span><span class="line"></span><span class="label">Patrimonio</span></div>
    <h1>Museo y Centro Cultural <em>Masónico</em></h1>
    <p class="lede">Conservar, exhibir y abrir al público el patrimonio histórico, documental y arquitectónico de la Masonería paraguaya — un siglo y medio de objetos, documentos y memoria reunidos en un solo espacio.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <!-- Tabs interactivos -->
    <div class="cc-tabs reveal" role="tablist">
      <button class="cc-tab active" data-pane="museo"><i class="fas fa-landmark"></i> Museo</button>
      <button class="cc-tab" data-pane="archivo"><i class="fas fa-book"></i> Gran Archivo</button>
      <button class="cc-tab" data-pane="templos"><i class="fas fa-torii-gate"></i> Templos</button>
      <a class="cc-tab" href="https://glsp.org.py/eventos" target="_blank" rel="noopener"><i class="fas fa-masks-theater"></i> Eventos <i class="fas fa-arrow-up-right-from-square" style="font-size:.7rem;opacity:.5;margin-left:4px"></i></a>
    </div>

    <!-- MUSEO -->
    <div class="cc-pane active" id="pane-museo">
      <div class="museo-hero">
        <img src="glsp_assets/masoneria-slide03.jpg" alt="Museo Masónico del Paraguay">
        <div class="museo-hero-overlay">
          <div class="museo-hero-info">
            <span class="virtual-badge" style="background:var(--gold);color:var(--ink)">El museo masónico más completo del Paraguay</span>
            <h3>Museo de la Francmasonería Paraguaya</h3>
            <p>Situado en la sede del Gran Oriente del Paraguay — calle Luís Alberto de Herrera Nº 1071 c/ Brasil, Asunción — el Museo conserva la colección más extensa y completa del país sobre la tradición masónica paraguaya.</p>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:center;margin-bottom:80px">
        <div class="reveal">
          <div class="chapter-mark"><span class="num">i.</span><span class="line"></span><span class="label">Sobre el museo</span></div>
          <h2 style="font-family:'Lora',serif;font-weight:500;font-size:clamp(1.8rem,2.8vw,2.4rem);margin-bottom:24px;letter-spacing:-.01em">Un siglo y medio <em style="font-style:italic;color:var(--gold-deep)">de memoria viva</em></h2>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.8;color:#2a2b35;margin-bottom:18px">El Museo de la Francmasonería Paraguaya reúne objetos rituales, mobiliario, regalia, obras de arte, fotografías y documentos que abarcan desde la fundación de la Logia Fe en 1869 hasta nuestros días.</p>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.8;color:#2a2b35;margin-bottom:18px">Cada vitrina, cada sala, cada pieza expuesta narra un capítulo de la historia masónica del país — un patrimonio único que combina valor histórico, artístico y simbólico.</p>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.8;color:#2a2b35">El Museo está abierto a visitas guiadas con cita previa, tanto para hermanos como para el público no iniciado interesado en conocer este patrimonio cultural paraguayo.</p>
        </div>
        <div class="reveal">
          <img src="glsp_assets/masoneria-slide02.jpg" alt="" style="width:100%;aspect-ratio:4/5;object-fit:cover;border:1px solid var(--rule)">
        </div>
      </div>

      <div class="chapter-mark reveal"><span class="num">ii.</span><span class="line"></span><span class="label">Galería de fotos</span></div>
      <h2 class="reveal" style="font-family:'Lora',serif;font-weight:500;font-size:2.2rem;margin-bottom:50px;letter-spacing:-.01em">Recorrido <em style="color:var(--gold-deep)">visual</em></h2>

      <div class="gallery reveal">
        <div class="gallery-item">
          <img src="glsp_assets/museo-01-sala-principal.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-02-vitrina.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-03-simbolos.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-04-documentos.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-05-biblioteca.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-06-retratos.jpg" alt="Museo Masónico">
        </div>
        <div class="gallery-item">
          <img src="glsp_assets/museo-07-arquitectura.jpg" alt="Museo Masónico">
        </div>
      </div>

      <div style="text-align:center;margin-top:40px" class="reveal">
        <a href="contacto.php" class="btn-primary">Agendar una visita guiada <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>

    <!-- GRAN ARCHIVO -->
    <div class="cc-pane" id="pane-archivo">
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:80px;align-items:center;margin-bottom:80px">
        <div class="reveal">
          <div class="chapter-mark"><span class="num">i.</span><span class="line"></span><span class="label">Parte del Centro Cultural</span></div>
          <h2 style="font-family:'Lora',serif;font-weight:500;font-size:clamp(2rem,3.2vw,2.8rem);margin-bottom:28px;letter-spacing:-.01em">El Gran <em style="font-style:italic;color:var(--gold-deep)">Archivo</em></h2>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.85;color:#2a2b35;margin-bottom:20px">El Gran Archivo es uno de los pilares del Centro Cultural Masónico. Custodia miles de textos, documentos y objetos que forman parte de la historia de la masonería paraguaya — desde las primeras actas del siglo XIX hasta el material institucional contemporáneo.</p>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.85;color:#2a2b35;margin-bottom:20px">Entre sus fondos se conservan cartas patentes, balaustres originales, correspondencia diplomática con obediencias del mundo entero, fotografías históricas, libros antiguos, sellos institucionales, mobiliario ritual y objetos personales de los Grandes Maestros que precedieron al actual.</p>
          <p style="font-family:'Lora',serif;font-size:1.08rem;line-height:1.85;color:#2a2b35">Es, en esencia, la memoria documental de un siglo y medio de masonería en suelo paraguayo — un patrimonio que se preserva, se cataloga y se pone a disposición de la investigación histórica.</p>
        </div>
        <div class="reveal">
          <img src="glsp_assets/masoneria-slide01.jpg" alt="Gran Archivo" style="width:100%;aspect-ratio:4/5;object-fit:cover;border:1px solid var(--rule)">
        </div>
      </div>

      <p style="font-family:'Lora',serif;font-style:italic;font-size:1.05rem;line-height:1.7;color:var(--text-mute);max-width:780px;border-left:2px solid var(--gold);padding-left:24px">El Gran Archivo se conserva en condiciones de archivo histórico y está abierto a investigadores con autorización previa de la Secretaría Ejecutiva.</p>
    </div>

    <!-- TEMPLOS -->
    <div class="cc-pane" id="pane-templos">
      <div style="max-width:780px;margin-bottom:60px">
        <h2 style="font-family:'Lora',serif;font-weight:500;font-size:2.4rem;margin-bottom:24px;letter-spacing:-.01em">28 Templos <em style="font-style:italic;color:var(--gold-deep)">en territorio paraguayo</em></h2>
        <p style="font-family:'Lora',serif;font-size:1.15rem;line-height:1.7;color:var(--text-mute)">Patrimonio arquitectónico masónico de Paraguay — desde el histórico Templo de Palma de 1899 hasta los talleres contemporáneos.</p>
      </div>

      <div class="templos-grid">
        <article class="templo-card"><div class="templo-img"><img src="templos/palma-asuncion/cover.jpg" alt=""></div><h4>Templo Histórico de Palma</h4><span class="templo-loc">Asunción · 1899</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-genesis-asuncion/cover.jpg" alt=""></div><h4>Solar Génesis</h4><span class="templo-loc">Asunción</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-aurora-asuncion/cover.jpg" alt=""></div><h4>Templo José Félix Bogado · Solar Aurora</h4><span class="templo-loc">Asunción</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-aurora-asuncion-2/cover.jpg" alt=""></div><h4>Solar Aurora</h4><span class="templo-loc">Asunción</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-herrera-asuncion/cover.jpg" alt=""></div><h4>Solar Herrera</h4><span class="templo-loc">Asunción</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/ernesto-reinecke-encarnacion/cover.jpg" alt=""></div><h4>Templo Ernesto Reinecke</h4><span class="templo-loc">Encarnación · Itapúa</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/villarrica/cover.jpg" alt=""></div><h4>Templo de Villarrica</h4><span class="templo-loc">Guairá</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/concepcion/cover.jpg" alt=""></div><h4>Templo de Concepción</h4><span class="templo-loc">Concepción</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-luz-y-progreso-san-lorenzo/cover.jpg" alt=""></div><h4>Solar Luz y Progreso</h4><span class="templo-loc">San Lorenzo</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/km-4-ciudad-del-este/cover.jpg" alt=""></div><h4>Templo Km. 4</h4><span class="templo-loc">Ciudad del Este · Alto Paraná</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/km-7-ciudad-del-este/cover.jpg" alt=""></div><h4>Templo Km. 7</h4><span class="templo-loc">Ciudad del Este · Alto Paraná</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/km-13-ciudad-del-este/cover.jpg" alt=""></div><h4>Templo Km. 13</h4><span class="templo-loc">Ciudad del Este · Alto Paraná</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/km-14-minga-guazu/cover.jpg" alt=""></div><h4>Templo Km. 14</h4><span class="templo-loc">Minga Guazú · Alto Paraná</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/solar-primero-de-marzo-presidente-franco/cover.jpg" alt=""></div><h4>Solar Primero de Marzo</h4><span class="templo-loc">Presidente Franco · Alto Paraná</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/pedro-juan-caballero-1/cover.jpg" alt=""></div><h4>Templo PJC I</h4><span class="templo-loc">Pedro Juan Caballero · Amambay</span></article>
        <article class="templo-card"><div class="templo-img"><img src="templos/pedro-juan-caballero-2/cover.jpg" alt=""></div><h4>Templo PJC II</h4><span class="templo-loc">Pedro Juan Caballero · Amambay</span></article>
      </div>
    </div>

  </div>
</section>

<?php /* OCULTO — Recorrido Virtual y Tour Autoguiado (a pedido del cliente, 2026-07). Reactivar quitando este comentario.
<!-- Próximamente highlights (después del contenido principal) -->
<section class="section section-paper">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">—</span><span class="line"></span><span class="label">Próximamente</span></div>
        <h2>Nuevas <em>experiencias culturales</em></h2>
      </div>
      <p class="lede">Dos proyectos en desarrollo que ampliarán la forma en que el público se relaciona con el patrimonio masónico paraguayo — uno desde tu casa, otro durante la visita al museo.</p>
    </div>

    <div class="cs-features reveal">
      <article class="cs-feature">
        <div class="cs-feature-icon"><i class="fas fa-vr-cardboard"></i></div>
        <div class="cs-feature-tag">Próximamente</div>
        <h3>Recorrido Virtual</h3>
        <p>Recorré el Museo Masónico desde tu navegador. Una visita inmersiva en alta resolución para conocer las salas, vitrinas y piezas más destacadas sin moverte de tu casa.</p>
        <div class="cs-feature-meta">En desarrollo</div>
      </article>
      <article class="cs-feature">
        <div class="cs-feature-icon"><i class="fas fa-headphones"></i></div>
        <div class="cs-feature-tag">Próximamente</div>
        <h3>Tour Autoguiado al Museo</h3>
        <p>Una playlist de audio diseñada para acompañar al visitante presencial del Museo de la Masonería. Cada sala, vitrina y objeto contará con su propia explicación narrada.</p>
        <div class="cs-feature-meta">Acceso vía código QR en el museo · Reproducción gratuita</div>
        <a href="tour-autoguiado.php" class="cs-feature-link">Ver vista previa <i class="fas fa-arrow-right"></i></a>
      </article>
    </div>
  </div>
</section>
*/ ?>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <div class="lightbox-content">
    <button class="lightbox-close" id="lbClose">&times;</button>
    <button class="lightbox-nav lightbox-prev" id="lbPrev"><i class="fas fa-chevron-left"></i></button>
    <button class="lightbox-nav lightbox-next" id="lbNext"><i class="fas fa-chevron-right"></i></button>
    <div class="lightbox-img" id="lbImg">[ Imagen del objeto ]</div>
    <div class="lightbox-meta">
      <div>
        <span class="info" id="lbInfo">Información</span>
        <h4 id="lbTitle">Título</h4>
        <p id="lbDesc">Descripción</p>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
