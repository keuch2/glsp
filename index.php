<?php
$activePage = 'inicio';
$pageTitle  = 'Gran Logia Simbólica del Paraguay — Fundada en 1923';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>

<section class="hero" id="hero">
  <div class="hero-slide active">
    <div class="hero-slide-img" style="background-image:url('glsp_assets/hero-slide01.jpg')"></div>
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-chapter"><span class="num">Nº 01</span><span class="line"></span><span class="label">Editorial</span></div>
        <h1>Masonería <em>en Paraguay</em></h1>
        <p class="hero-lead">La Gran Logia Simbólica del Paraguay es el origen y la continuidad de la verdadera masonería paraguaya — una obediencia regular reconocida en todo el mundo desde su constitución en 1923.</p>
        <div class="hero-actions">
          <a href="historia.php" class="btn-primary">Conocer nuestra historia <i class="fas fa-arrow-right"></i></a>
          <a href="masoneria.php" class="btn-text">¿Qué es la Masonería? <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-slide">
    <div class="hero-slide-img" style="background-image:url('glsp_assets/hero-slide02.jpg')"></div>
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-chapter"><span class="num">Nº 02</span><span class="line"></span><span class="label">Doctrina</span></div>
        <h1>Fomentamos <em>la sabiduría</em></h1>
        <p class="hero-lead">La masonería es una institución esencialmente filantrópica, filosófica y progresista. Tiene por objeto la búsqueda de la verdad, el estudio de la moral y la práctica de la solidaridad.</p>
        <div class="hero-actions"><a href="masoneria.php" class="btn-primary">Profundizar <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </div>
  </div>
  <div class="hero-slide">
    <div class="hero-slide-img" style="background-image:url('glsp_assets/hero-slide03.jpg')"></div>
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-chapter"><span class="num">Nº 03</span><span class="line"></span><span class="label">Principios</span></div>
        <h1>Libertad, Igualdad <em>y Fraternidad</em></h1>
        <p class="hero-lead">La forma concreta de entender y aplicar esos principios no está marcada — y cada masón debe buscarla y realizarla personalmente, en libertad de conciencia.</p>
        <div class="hero-actions"><a href="masoneria.php" class="btn-primary">Descubrir <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </div>
  </div>

  <div class="hero-content" style="position:absolute;inset:0;pointer-events:none">
    <div></div>
    <aside class="hero-rail" style="pointer-events:auto">
      <div class="rail-item active" data-slide="0"><span class="y">Editorial</span><span class="t">01</span></div>
      <div class="rule-h" style="background:rgba(255,255,255,.1);width:60px;align-self:flex-end;margin-right:14px"></div>
      <div class="rail-item" data-slide="1"><span class="y">Doctrina</span><span class="t">02</span></div>
      <div class="rule-h" style="background:rgba(255,255,255,.1);width:60px;align-self:flex-end;margin-right:14px"></div>
      <div class="rail-item" data-slide="2"><span class="y">Principios</span><span class="t">03</span></div>
    </aside>
  </div>
  <div class="hero-meta">
    <span class="ed">Edición Digital <em>· glsp.org.py</em></span>
    <div class="hero-arrows">
      <button onclick="changeSlide(-1)"><i class="fas fa-arrow-left"></i></button>
      <button onclick="changeSlide(1)"><i class="fas fa-arrow-right"></i></button>
    </div>
  </div>
</section>

<section class="stats">
  <div class="stats-inner">
    <div class="stat reveal"><div class="stat-num"><span data-target="82">0</span></div><div class="stat-rule"></div><div class="stat-label">Logias</div><div class="stat-sub">Talleres en actividad regular</div></div>
    <div class="stat reveal"><div class="stat-num"><span data-target="2472" data-format="dot">0</span></div><div class="stat-rule"></div><div class="stat-label">Hermanos</div><div class="stat-sub">Activos en territorio nacional</div></div>
    <div class="stat reveal"><div class="stat-num"><span data-target="28">0</span></div><div class="stat-rule"></div><div class="stat-label">Templos</div><div class="stat-sub">Patrimonio masónico</div></div>
    <div class="stat reveal"><div class="stat-num"><span data-target="70">0</span><sup>+</sup></div><div class="stat-rule"></div><div class="stat-label">Reconocimientos</div><div class="stat-sub">Obediencias regulares del mundo</div></div>
  </div>
</section>

<section class="section" id="noticias">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">Nº 01</span><span class="line"></span><span class="label">Actualidad</span></div>
        <h2>Noticias</h2>
      </div>
      <p class="lede">Tenidas, ceremonias internacionales, presencia regional y vida institucional. La actualidad de la Gran Logia Simbólica del Paraguay, mes a mes.</p>
    </div>
    <article class="news-feature reveal">
      <div class="news-feature-img"><img src="glsp_assets/noticia-santa-catarina.jpeg" alt=""></div>
      <div>
        <div class="news-meta">
          <div class="news-date-block"><span class="d">27</span><span class="my">Abril · 2026</span></div>
          
        </div>
        <h3><a href="#">La GLSP, presente en el 70° Aniversario de la Muy Respetable Gran Logia de Santa Catarina</a></h3>
        <p>La Gran Logia Simbólica del Paraguay estuvo presente en la Ceremonia de Posesión de Cargo del Serenísimo Gran Maestro de la jurisdicción brasileña, reafirmando los lazos de fraternidad regional que vinculan a las obediencias regulares del Cono Sur.</p>
        <a href="#" class="read-more">Leer noticia <i class="fas fa-arrow-right"></i></a>
      </div>
    </article>
    <div class="news-grid reveal">
      <article class="news-item">
        <div class="news-item-img"><img src="glsp_assets/noticia-tenida-magna.jpeg" alt=""></div>
        <div>
          <div class="news-item-meta"><span class="news-item-date">23 Mar 2026</span></div>
          <h4><a href="#">Tenida Magna Histórica — ¡3 logias levantaron columnas!</a></h4>
          <p style="font-family:Lora,serif;font-size:.95rem;color:var(--text-mute);line-height:1.6">El viernes 20 de marzo, el Templo Génesis del Solar Génesis fue escenario de una noche que quedará en la memoria…</p>
        </div>
      </article>
      <article class="news-item">
        <div class="news-item-img"><img src="glsp_assets/noticia-eeuu.jpg" alt=""></div>
        <div>
          <div class="news-item-meta"><span class="news-item-date">26 Feb 2026</span></div>
          <h4><a href="#">La GLSP fortalece su presencia internacional en Estados Unidos</a></h4>
          <p style="font-family:Lora,serif;font-size:.95rem;color:var(--text-mute);line-height:1.6">Durante el mes de febrero, la GLSP desarrolló una activa agenda internacional con visitas a obediencias norteamericanas…</p>
        </div>
      </article>
      <article class="news-item">
        <div class="news-item-img"><img src="glsp_assets/noticia-apertura-2026.jpg" alt=""></div>
        <div>
          <div class="news-item-meta"><span class="news-item-date">17 Feb 2026</span></div>
          <h4><a href="#">Apertura Oficial de los Trabajos del Año Masónico 2026</a></h4>
          <p style="font-family:Lora,serif;font-size:.95rem;color:var(--text-mute);line-height:1.6">La GLSP inauguró oficialmente el año masónico con una ceremonia que reunió a hermanos de todo el país…</p>
        </div>
      </article>
      <article class="news-item">
        <div class="news-item-img"><img src="glsp_assets/noticia-vice-gran-maestro.jpg" alt=""></div>
        <div>
          <div class="news-item-meta"><span class="news-item-date">29 Dic 2025</span></div>
          <h4><a href="#">Juramento del nuevo Serenísimo Vice Gran Maestro</a></h4>
          <p style="font-family:Lora,serif;font-size:.95rem;color:var(--text-mute);line-height:1.6">En una ceremonia solemne, la GLSP tomó juramento al nuevo Vice Gran Maestro de la institución…</p>
        </div>
      </article>
    </div>
    <div class="news-cta-row reveal">
      <a href="noticias.php" class="btn-primary" style="background:var(--ink);color:#fff">Ver todas las noticias <i class="fas fa-arrow-right"></i></a>
    </div>
  </div>
</section>

<section class="section section-paper" id="mensaje-gm">
  <div class="wrap">
    <div class="gm-spread">
      <div class="gm-portrait reveal">
        <div class="gm-portrait-frame"><img src="glsp_assets/gran-maestro.png" alt=""></div>
        <div class="gm-credit">
          <span class="gm-credit-line"></span>
          <div class="gm-credit-text"><div class="name">Carlos Sosa Jovellanos</div><div class="role">Gran Maestro · 2025 / 2027</div></div>
        </div>
      </div>
      <div class="gm-text reveal">
        <div class="chapter-mark"><span class="num">Nº 02</span><span class="line"></span><span class="label">Mensaje</span></div>
        <h2>Mensaje del <em>Gran Maestro</em></h2>
        <div class="gm-prose">
          <p>Mis apreciados hermanos, la Masonería en nuestro país cumple este año 130 años de existencia desde la Constitución del Gran Oriente del Paraguay en 1895, que diera origen posterior a la Gran Logia Simbólica del Paraguay en 1923, institución que cumple 102 años de vida institucional.</p>
          <div class="gm-pullquote">"Nos abrimos al mundo a través de este espacio informático para contribuir, con todas las otras Grandes Logias Regulares del Mundo, en el incansable objetivo de superación personal y social."</div>
          <p>La Masonería ha hecho posible la evolución de la humanidad mediante la superación personal y los aportes que cada uno de los hermanos han hecho en diferentes épocas apostando por la libertad, la igualdad y la fraternidad. Seguiremos en la misma línea cumpliendo nuestra misión filantrópica.</p>
        </div>
        <div style="margin-top:40px"><a href="gran-logia.html#mensaje" class="read-more">Leer el mensaje completo <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </div>
  </div>
</section>

<section class="section section-ink" id="historia">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">Nº 03</span><span class="line"></span><span class="label">Historia</span></div>
        <h2>Historia de la Masonería <em>en Paraguay</em></h2>
      </div>
      <p class="lede">Desde 1869 hasta nuestros días — siglo y medio de presencia masónica en suelo paraguayo, atravesando reconstrucciones, guerras y la fundación de la república moderna.</p>
    </div>
    <div class="timeline reveal">
      <div class="tl-item"><div class="tl-year">1869</div><div class="tl-text">Levantamiento de columnas de la Logia Fe, primera en territorio paraguayo.</div></div>
      <div class="tl-item"><div class="tl-year">1894</div><div class="tl-text">Constitución del Serenísimo Gran Oriente del Paraguay.</div></div>
      <div class="tl-item"><div class="tl-year">1899</div><div class="tl-text">Adquisición del Templo Masónico de Palma.</div></div>
      <div class="tl-item"><div class="tl-year">1910</div><div class="tl-text">Reconocimiento de la Gran Logia Unida de Inglaterra.</div></div>
      <div class="tl-item"><div class="tl-year">1923</div><div class="tl-text">Fundación de la Gran Logia Simbólica del Paraguay.</div></div>
      <div class="tl-item"><div class="tl-year">2018</div><div class="tl-text">Restauración del Templo Histórico de Palma. Patrimonio Histórico.</div></div>
    </div>
    <div style="margin-top:50px;text-align:center"><a href="historia.php" class="btn-primary">Recorrer la historia completa <i class="fas fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="section" id="museo">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">Nº 04</span><span class="line"></span><span class="label">Patrimonio</span></div>
        <h2>Museo y Centro Cultural <em>Masónico</em></h2>
      </div>
      <p class="lede">Un espacio para conservar, exhibir y abrir al público el patrimonio histórico, documental y cultural de la Masonería paraguaya.</p>
    </div>
    <div class="cc-teaser reveal">
      <div class="cc-teaser-img">
        <img src="glsp_assets/masoneria-slide01.jpg" alt="Templo Histórico de Palma">
        <?php /* OCULTO — badge "Visita virtual disponible" (a pedido del cliente, 2026-07)
        <div class="cc-teaser-overlay"><span class="cc-teaser-tag">Visita virtual disponible</span></div>
        */ ?>
      </div>
      <div class="cc-teaser-pills">
        <span class="pill"><i class="fas fa-landmark"></i> Museo</span>
        <span class="pill"><i class="fas fa-book"></i> Gran Archivo</span>
        <span class="pill"><i class="fas fa-torii-gate"></i> Templos</span>
        <span class="pill"><i class="fas fa-masks-theater"></i> Eventos</span>
      </div>
      <div class="cc-teaser-cta"><a href="museo.php" class="btn-primary">Visitar el Museo <i class="fas fa-arrow-right"></i></a></div>
    </div>
  </div>
</section>

<section class="section section-paper" id="masoneria">
  <div class="wrap-narrow">
    <div class="section-head-single reveal" style="text-align:left">
      <div class="chapter-mark"><span class="num">Nº 05</span><span class="line"></span><span class="label">Doctrina</span></div>
      <h2 style="max-width:680px">¿Qué es <em>la Masonería</em>?</h2>
    </div>
    <blockquote class="reveal" style="font-family:'Lora',serif;font-size:clamp(1.4rem,2.2vw,1.9rem);line-height:1.5;font-style:italic;color:var(--ink);max-width:780px;border-left:3px solid var(--gold);padding:14px 0 14px 36px;margin:40px 0">
      Una Institución Universal, esencialmente educadora, humanista, filosófica, iniciática, progresista y filantrópica — unida por el vínculo de la fraternidad, el amor a la humanidad y a la verdad.
    </blockquote>
    <div class="reveal" style="margin-top:50px"><a href="masoneria.php" class="btn-primary">Conocer la Orden <i class="fas fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="section section-ink" id="filantropia">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">Nº 06</span><span class="line"></span><span class="label">Acción social</span></div>
        <h2>Filantropía — <em>Fundación Esperanza</em></h2>
      </div>
      <p class="phil-intro">"La Masonería es una institución esencialmente filantrópica" — y desde 1978, la Fundación Esperanza es el brazo concreto de esa vocación.</p>
    </div>
    <div class="phil-grid reveal">
      <article class="phil-piece">
        <div class="phil-img"><span class="phil-piece-num">— I.</span><img src="glsp_assets/filantropia-slide01.jpg" alt=""></div>
        <h3>Educación a sectores vulnerables</h3>
        <p>Capacitación académica, técnica, moral y conductual orientada a la productividad. Desarrollo de actividades culturales, educacionales y sociales que promueven el crecimiento de valores positivos.</p>
      </article>
      <article class="phil-piece">
        <div class="phil-img"><span class="phil-piece-num">— II.</span><img src="glsp_assets/filantropia-slide02.jpg" alt=""></div>
        <h3>Acción Social Proactiva</h3>
        <p>Generación de acciones eficientes con personas físicas y jurídicas, nacionales o internacionales, públicas o privadas. Programas y proyectos de investigación.</p>
      </article>
      <article class="phil-piece">
        <div class="phil-img"><span class="phil-piece-num">— III.</span><img src="glsp_assets/filantropia-slide03.jpg" alt=""></div>
        <h3>Brindamos salud a la comunidad</h3>
        <p>Servicios odontológicos a los niños de la escuela de Itá. Articulación de donaciones de medicamentos, antiparasitarios y donación de sangre.</p>
      </article>
    </div>
    <div class="phil-foundation reveal">
      <div class="est"><strong>1978</strong>Fundada el 21 de Setiembre</div>
      <p>La Fundación Esperanza fue fundada el 21 de Setiembre de 1978, reconocida su personería jurídica por Decreto N° 1.437 del Poder Ejecutivo de la Nación. Desde entonces, materializa la vocación filantrópica de la Gran Logia Simbólica del Paraguay.</p>
    </div>
    <div class="reveal" style="text-align:center;margin-top:60px"><a href="filantropia.php" class="btn-text">Conocer la Fundación Esperanza <i class="fas fa-arrow-right"></i></a></div>
  </div>
</section>

<section class="section" id="grandes-maestros">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">Nº 07</span><span class="line"></span><span class="label">Linaje</span></div>
        <h2>Histórico de <em>Grandes Maestros</em></h2>
      </div>
      <p class="lede">Más de un siglo y medio de continuidad institucional — desde Zerakhial en 1869 hasta el Ser∴ Gran Maestro Carlos Sosa Jovellanos en el período 2025 / 2027.</p>
    </div>
    <div class="gm-feature reveal">
      <div class="gm-feature-img"><img src="glsp_assets/gran-maestro.png" alt=""></div>
      <div class="gm-feature-info">
        <div class="ord">— Gran Maestro Nº 43 —</div>
        <h3>Carlos Sosa <em style="font-style:italic;color:var(--gold-deep)">Jovellanos</em></h3>
        <div class="role">En funciones</div>
        <div class="period">Período 2025 / 2027 — Año Masónico vigente</div>
        <div style="margin-top:30px"><a href="grandes-maestros.php" class="read-more">Ver el listado completo de 43 Grandes Maestros <i class="fas fa-arrow-right"></i></a></div>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
