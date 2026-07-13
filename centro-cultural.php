<?php
$activePage = 'centro-cultural';
$pageTitle  = 'Centro Cultural — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>

<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('templos/palma-asuncion/cover.jpg')"></div>
  <div class="page-hero-inner">
    <div class="breadcrumb"><a href="index.php">Inicio</a><span class="sep">/</span><span>Centro Cultural</span></div>
    <div class="page-chapter"><span class="num">Nº 04</span><span class="line"></span><span class="label">Patrimonio</span></div>
    <h1>Centro Cultural <em>Masónico</em></h1>
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
        <div class="gallery-item" data-title="Sala principal del Museo" data-desc="Vista panorámica de la sala central del Museo Masónico, con las vitrinas de regalia y documentos fundacionales." data-info="Sala central">
          <img src="glsp_assets/masoneria-slide01.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— I.</span><span class="name">Sala principal</span></div>
        </div>
        <div class="gallery-item" data-title="Vitrina histórica" data-desc="Mobiliario ritual y mandiles ceremoniales pertenecientes a los primeros Grandes Maestros." data-info="Vitrina · siglo XX">
          <div class="gallery-item-placeholder"><i class="fas fa-image"></i><span>Foto del museo</span></div>
          <div class="gallery-item-meta"><span class="num">— II.</span><span class="name">Vitrina histórica</span></div>
        </div>
        <div class="gallery-item" data-title="Sala de los símbolos" data-desc="Espacio dedicado a los elementos simbólicos de la tradición masónica — compás, escuadra, plomada y nivel." data-info="Sala temática">
          <div class="gallery-item-placeholder"><i class="fas fa-compass-drafting"></i><span>Sala de símbolos</span></div>
          <div class="gallery-item-meta"><span class="num">— III.</span><span class="name">Sala de los símbolos</span></div>
        </div>
        <div class="gallery-item" data-title="Documentos fundacionales" data-desc="Actas, cartas patentes y sellos institucionales originales conservados desde 1869." data-info="Archivo expuesto">
          <div class="gallery-item-placeholder"><i class="fas fa-scroll"></i><span>Documentos</span></div>
          <div class="gallery-item-meta"><span class="num">— IV.</span><span class="name">Documentos fundacionales</span></div>
        </div>
        <div class="gallery-item" data-title="Biblioteca histórica" data-desc="Miles de volúmenes sobre simbolismo, filosofía masónica e historia paraguaya." data-info="Biblioteca">
          <img src="glsp_assets/masoneria-slide02.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— V.</span><span class="name">Biblioteca histórica</span></div>
        </div>
        <div class="gallery-item" data-title="Galería de retratos" data-desc="Retratos de los 43 Grandes Maestros que han presidido la Gran Logia Simbólica del Paraguay." data-info="Galería">
          <img src="glsp_assets/hero-slide02.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— VI.</span><span class="name">Galería de retratos</span></div>
        </div>
        <div class="gallery-item" data-title="Detalle arquitectónico" data-desc="Detalle de la ornamentación interior del museo, con elementos simbólicos masónicos integrados al diseño arquitectónico." data-info="Arquitectura">
          <img src="glsp_assets/hero-slide03.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— VII.</span><span class="name">Detalle arquitectónico</span></div>
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

      <div class="chapter-mark reveal"><span class="num">ii.</span><span class="line"></span><span class="label">El acervo en imágenes</span></div>
      <h2 class="reveal" style="font-family:'Lora',serif;font-weight:500;font-size:2rem;margin-bottom:50px;letter-spacing:-.01em">Documentos, libros <em style="color:var(--gold-deep);font-style:italic">y objetos</em></h2>

      <div class="gallery reveal" style="margin-bottom:60px">
        <div class="gallery-item" data-title="Actas históricas" data-desc="Volúmenes encuadernados con las actas originales de las primeras logias paraguayas." data-info="Documentación · siglo XIX">
          <div class="gallery-item-placeholder"><i class="fas fa-scroll"></i><span>Actas históricas</span></div>
          <div class="gallery-item-meta"><span class="num">— I.</span><span class="name">Actas históricas</span></div>
        </div>
        <div class="gallery-item" data-title="Biblioteca masónica" data-desc="Miles de volúmenes sobre filosofía, simbolismo, ritual e historia masónica universal y paraguaya." data-info="Biblioteca">
          <img src="glsp_assets/masoneria-slide02.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— II.</span><span class="name">Biblioteca masónica</span></div>
        </div>
        <div class="gallery-item" data-title="Cartas patentes" data-desc="Cartas patentes de las logias del Paraguay y de las obediencias internacionales que reconocen a la GLSP." data-info="Documentos oficiales">
          <div class="gallery-item-placeholder"><i class="fas fa-stamp"></i><span>Cartas patentes</span></div>
          <div class="gallery-item-meta"><span class="num">— III.</span><span class="name">Cartas patentes</span></div>
        </div>
        <div class="gallery-item" data-title="Fotografías históricas" data-desc="Archivo fotográfico que documenta tenidas, ceremonias y figuras de la masonería paraguaya desde fines del siglo XIX." data-info="Archivo fotográfico">
          <img src="glsp_assets/hero-slide02.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— IV.</span><span class="name">Fotografías históricas</span></div>
        </div>
        <div class="gallery-item" data-title="Objetos rituales" data-desc="Mandiles ceremoniales, joyas masónicas y mobiliario ritual de las primeras logias paraguayas." data-info="Objetos rituales">
          <div class="gallery-item-placeholder"><i class="fas fa-gem"></i><span>Objetos rituales</span></div>
          <div class="gallery-item-meta"><span class="num">— V.</span><span class="name">Objetos rituales</span></div>
        </div>
        <div class="gallery-item" data-title="Correspondencia diplomática" data-desc="Correspondencia oficial con la Gran Logia Unida de Inglaterra, la Confederación Masónica Interamericana y otras obediencias del mundo." data-info="Correspondencia">
          <div class="gallery-item-placeholder"><i class="fas fa-envelope-open-text"></i><span>Correspondencia</span></div>
          <div class="gallery-item-meta"><span class="num">— VI.</span><span class="name">Correspondencia</span></div>
        </div>
        <div class="gallery-item" data-title="Sellos institucionales" data-desc="Sellos del Gran Oriente del Paraguay y de la Gran Logia Simbólica desde sus respectivas constituciones." data-info="Heráldica institucional">
          <img src="glsp_assets/hero-slide03.jpg" alt="">
          <div class="gallery-item-meta"><span class="num">— VII.</span><span class="name">Sellos institucionales</span></div>
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
