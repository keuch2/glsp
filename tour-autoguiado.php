<?php
// OCULTO a pedido del cliente (2026-07): la página del Tour Autoguiado no debe
// ser accesible. Redirige al Museo y Centro Cultural. Para reactivar, quitar este bloque.
header('Location: /museo.php', true, 302);
exit;

$activePage = 'tour';
$pageTitle  = 'Tour Autoguiado — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>
    </div>
    <div class="qr-box">
      <div class="qr-pattern" id="qrPattern"></div>
      <span class="label">Vista previa</span>
      <span class="hint">Los códigos QR estarán<br>distribuidos por todo el museo</span>
    </div>
  </div>
</section>

<section class="player-section">
  <div class="player-wrap">
    <div style="text-align:center;margin-bottom:50px">
      <div class="chapter-mark" style="justify-content:center"><span class="num">i.</span><span class="line"></span><span class="label">Reproductor</span></div>
      <h2 style="font-family:'Lora',serif;font-weight:500;font-size:clamp(2rem,3.2vw,2.8rem);margin-top:14px;letter-spacing:-.01em">Vista previa <em style="font-style:italic;color:var(--gold-deep)">del recorrido</em></h2>
    </div>

    <div class="player-card">
      <div class="player-now">
        <div class="player-art">G</div>
        <div class="player-now-meta">
          <div class="ep-num">Pista 01 / 12</div>
          <h3 id="nowTitle">Bienvenida al Museo de la Francmasonería Paraguaya</h3>
          <div class="duration" id="nowDur">3:24 · Voz institucional</div>
        </div>
        <button class="play-btn" id="mainPlay"><i class="fas fa-play"></i></button>
      </div>
      <div class="progress-bar"><div class="progress-fill" id="progFill"></div></div>
      <div class="progress-times"><span id="curTime">0:00</span><span id="totTime">3:24</span></div>

      <div class="playlist">
        <div class="playlist-head">
          <h4>Playlist completa</h4>
          <span class="count">12 pistas · 48 min total</span>
        </div>
        <div class="playlist-row active" data-t="Bienvenida al Museo de la Francmasonería Paraguaya" data-d="3:24">
          <span class="pl-num">i.</span>
          <div class="pl-info"><h5>Bienvenida al Museo de la Francmasonería Paraguaya</h5><span class="pl-cat">Introducción</span></div>
          <span class="pl-time">3:24</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Sala I — Los orígenes en Paraguay" data-d="4:12">
          <span class="pl-num">ii.</span>
          <div class="pl-info"><h5>Sala I — Los orígenes en Paraguay</h5><span class="pl-cat">Sala 1</span></div>
          <span class="pl-time">4:12</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Vitrina I.1 — Acta fundacional de la Logia Fe (1869)" data-d="2:48">
          <span class="pl-num">iii.</span>
          <div class="pl-info"><h5>Vitrina I.1 — Acta fundacional de la Logia Fe (1869)</h5><span class="pl-cat">Documento</span></div>
          <span class="pl-time">2:48</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Vitrina I.2 — Mandiles y regalia del siglo XIX" data-d="3:55">
          <span class="pl-num">iv.</span>
          <div class="pl-info"><h5>Vitrina I.2 — Mandiles y regalia del siglo XIX</h5><span class="pl-cat">Objetos rituales</span></div>
          <span class="pl-time">3:55</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Sala II — La fundación del Gran Oriente" data-d="5:08">
          <span class="pl-num">v.</span>
          <div class="pl-info"><h5>Sala II — La fundación del Gran Oriente</h5><span class="pl-cat">Sala 2</span></div>
          <span class="pl-time">5:08</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Vitrina II.1 — Constitución del GOP de 1894" data-d="3:30">
          <span class="pl-num">vi.</span>
          <div class="pl-info"><h5>Vitrina II.1 — Constitución del GOP de 1894</h5><span class="pl-cat">Documento</span></div>
          <span class="pl-time">3:30</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Sala III — El Templo Histórico de Palma" data-d="6:42">
          <span class="pl-num">vii.</span>
          <div class="pl-info"><h5>Sala III — El Templo Histórico de Palma</h5><span class="pl-cat">Sala 3</span></div>
          <span class="pl-time">6:42</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Reseña histórica del Templo de Palma" data-d="4:50">
          <span class="pl-num">viii.</span>
          <div class="pl-info"><h5>Reseña histórica del Templo de Palma</h5><span class="pl-cat">Patrimonio</span></div>
          <span class="pl-time">4:50</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Sala IV — Los 43 Grandes Maestros" data-d="5:24">
          <span class="pl-num">ix.</span>
          <div class="pl-info"><h5>Sala IV — Los 43 Grandes Maestros</h5><span class="pl-cat">Sala 4</span></div>
          <span class="pl-time">5:24</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Sala V — La Masonería en el siglo XX" data-d="4:18">
          <span class="pl-num">x.</span>
          <div class="pl-info"><h5>Sala V — La Masonería en el siglo XX</h5><span class="pl-cat">Sala 5</span></div>
          <span class="pl-time">4:18</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Biblioteca histórica — un recorrido temático" data-d="3:36">
          <span class="pl-num">xi.</span>
          <div class="pl-info"><h5>Biblioteca histórica — un recorrido temático</h5><span class="pl-cat">Archivo</span></div>
          <span class="pl-time">3:36</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
        <div class="playlist-row" data-t="Cierre — La Masonería paraguaya hoy" data-d="2:18">
          <span class="pl-num">xii.</span>
          <div class="pl-info"><h5>Cierre — La Masonería paraguaya hoy</h5><span class="pl-cat">Final</span></div>
          <span class="pl-time">2:18</span>
          <button class="pl-play"><i class="fas fa-play"></i></button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="howit">
  <div class="wrap">
    <div style="text-align:center;max-width:680px;margin:0 auto">
      <div class="chapter-mark" style="justify-content:center"><span class="num">ii.</span><span class="line"></span><span class="label">Cómo funciona</span></div>
      <h2 style="font-family:'Lora',serif;font-weight:500;font-size:clamp(2rem,3.2vw,2.8rem);margin-top:14px;letter-spacing:-.01em">Tres pasos <em style="font-style:italic;color:var(--gold-deep)">para recorrer el museo</em></h2>
      <p style="font-family:'Lora',serif;font-size:1.1rem;line-height:1.7;color:var(--text-mute);margin-top:20px">El tour autoguiado funcionará durante tu visita presencial al Museo Masónico. Sin descargar nada — sólo tu teléfono y curiosidad.</p>
    </div>

    <div class="howit-grid">
      <div class="howit-step">
        <div class="howit-step-num">i.</div>
        <h4>Visitá el museo</h4>
        <p>Agendá una visita al Museo de la Francmasonería Paraguaya en la sede del Gran Oriente, en Asunción.</p>
      </div>
      <div class="howit-step">
        <div class="howit-step-num">ii.</div>
        <h4>Escaneá el código QR</h4>
        <p>En cada sala y vitrina destacada encontrarás un código QR. Escaneálo con la cámara de tu teléfono — sin descargar nada.</p>
      </div>
      <div class="howit-step">
        <div class="howit-step-num">iii.</div>
        <h4>Escuchá la narración</h4>
        <p>Cada código abre una pista de audio que explica lo que tenés delante. Recorré a tu ritmo, en silencio respetuoso.</p>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
