<?php
$activePage = 'filantropia';
$pageTitle  = 'Filantropía — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">i.</span><span class="line"></span><span class="label">48 años de obra</span></div>
        <h2>Una vocación <em>filantrópica</em></h2>
      </div>
      <p class="lede">La Fundación Esperanza fue fundada el 21 de Setiembre de 1978, reconocida su personería jurídica por Decreto N° 1.437 del Poder Ejecutivo de la Nación. Desde entonces, materializa la vocación filantrópica de la GLSP.</p>
    </div>

    <div class="f-stats reveal">
      <div class="f-stat"><div class="n">48</div><div class="l">Años de obra</div></div>
      <div class="f-stat"><div class="n">3.500+</div><div class="l">Niños beneficiados</div></div>
      <div class="f-stat"><div class="n">12</div><div class="l">Programas activos</div></div>
      <div class="f-stat"><div class="n">1978</div><div class="l">Año fundacional</div></div>
    </div>

    <div class="phil-grid reveal">
      <article class="phil-piece" style="color:var(--text)">
        <div class="phil-img"><span class="phil-piece-num">— I.</span><img src="glsp_assets/filantropia-slide01.jpg" alt=""></div>
        <h3 style="color:var(--ink)">Educación a sectores vulnerables</h3>
        <p style="color:var(--text-mute)">Capacitación académica, técnica, moral y conductual orientada a la productividad. Desarrollo de actividades culturales, educacionales y sociales que promueven el crecimiento de valores positivos.</p>
      </article>
      <article class="phil-piece" style="color:var(--text)">
        <div class="phil-img"><span class="phil-piece-num">— II.</span><img src="glsp_assets/filantropia-slide02.jpg" alt=""></div>
        <h3 style="color:var(--ink)">Acción Social Proactiva</h3>
        <p style="color:var(--text-mute)">Generación de acciones eficientes con personas físicas y jurídicas, nacionales o internacionales, públicas o privadas. Programas y proyectos de investigación.</p>
      </article>
      <article class="phil-piece" style="color:var(--text)">
        <div class="phil-img"><span class="phil-piece-num">— III.</span><img src="glsp_assets/filantropia-slide03.jpg" alt=""></div>
        <h3 style="color:var(--ink)">Brindamos salud a la comunidad</h3>
        <p style="color:var(--text-mute)">Servicios odontológicos a los niños de la escuela de Itá. Articulación de donaciones de medicamentos, antiparasitarios y donación de sangre.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section-paper">
  <div class="wrap">
    <div class="section-head reveal">
      <div>
        <div class="chapter-mark"><span class="num">ii.</span><span class="line"></span><span class="label">Programas</span></div>
        <h2>Líneas <em>de acción</em></h2>
      </div>
      <p class="lede">La Fundación opera a través de programas estructurados que articulan recursos, voluntariado de los hermanos y alianzas con instituciones públicas y privadas.</p>
    </div>

    <div class="programs reveal">
      <div class="program">
        <i class="fas fa-graduation-cap"></i>
        <h3>Escuela de Itá</h3>
        <p>Capacitación académica integral para niños y jóvenes de la comunidad de Itá. Educación primaria y media con foco en valores cívicos y formación técnica.</p>
        <p><strong style="color:var(--ink)">Beneficiarios:</strong> 850 niños y jóvenes anualmente.</p>
      </div>
      <div class="program">
        <i class="fas fa-tooth"></i>
        <h3>Programa de salud bucodental</h3>
        <p>Servicios odontológicos gratuitos para niños de la escuela de Itá. Profilaxis, tratamientos restaurativos y educación sanitaria.</p>
        <p><strong style="color:var(--ink)">Cobertura:</strong> 100% del alumnado.</p>
      </div>
      <div class="program">
        <i class="fas fa-hand-holding-medical"></i>
        <h3>Articulación de donaciones</h3>
        <p>Coordinación de donaciones de medicamentos, antiparasitarios y donación de sangre con hospitales públicos del país.</p>
        <p><strong style="color:var(--ink)">Alianzas:</strong> Hospital de Itá, Hospital de Clínicas, Cruz Roja Paraguaya.</p>
      </div>
      <div class="program">
        <i class="fas fa-users"></i>
        <h3>Educación para adultos mayores</h3>
        <p>Talleres de alfabetización digital, lectura y desarrollo personal para adultos mayores en situación de vulnerabilidad.</p>
        <p><strong style="color:var(--ink)">Modalidad:</strong> Presencial y a distancia.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-ink">
  <div class="wrap">
    <div class="donate-cta">
      <h3>Sumarse a la <em style="color:var(--gold);font-style:italic">Fundación Esperanza</em></h3>
      <p>La obra filantrópica se sostiene con el aporte solidario de hermanos, instituciones y particulares que comparten la convicción de que la educación y la salud son derechos esenciales.</p>
      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap">
        <a href="contacto.php" class="btn-primary">Hacer una donación <i class="fas fa-heart"></i></a>
        <a href="contacto.php" class="btn-text" style="color:#fff;border-color:rgba(255,255,255,.4)">Voluntariado <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
