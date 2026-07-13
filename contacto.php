<?php
$activePage = 'contacto';
$pageTitle  = 'Contacto — Gran Logia Simbólica del Paraguay';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';
include __DIR__ . '/includes/header.php';
?>
</section>

<section class="section">
  <div class="wrap">
    <div class="contact-spread">
      <div class="reveal">
        <div class="contact-info-block">
          <span class="label">Sede principal</span>
          <h3>Gran Oriente del Paraguay</h3>
          <p><i class="fas fa-location-dot"></i>Luís Alberto de Herrera Nº 1071<br>c/ Brasil · Asunción, Paraguay</p>
        </div>
        <div class="contact-info-block">
          <span class="label">Secretaría Ejecutiva</span>
          <h3>Comunicación oficial</h3>
          <p><i class="fas fa-envelope"></i><a href="mailto:secejecutiva@glsp.org.py">secejecutiva@glsp.org.py</a></p>
          <p><i class="fas fa-phone"></i>+595 21 231 103 al 6</p>
        </div>
        <div class="contact-info-block">
          <span class="label">Horario</span>
          <h3>Atención al público</h3>
          <p>Lunes a Viernes · 09:00 — 17:00 hs<br>Visitas al museo y templo: con cita previa</p>
        </div>
        <div class="contact-info-block">
          <span class="label">Redes sociales</span>
          <h3>@GranLogiaSimbolicaPy</h3>
          <div style="display:flex;gap:14px;margin-top:14px">
            <a href="#" style="width:42px;height:42px;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;color:var(--gold-deep)"><i class="fab fa-facebook-f"></i></a>
            <a href="#" style="width:42px;height:42px;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;color:var(--gold-deep)"><i class="fab fa-instagram"></i></a>
            <a href="#" style="width:42px;height:42px;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;color:var(--gold-deep)"><i class="fab fa-x-twitter"></i></a>
            <a href="#" style="width:42px;height:42px;border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;color:var(--gold-deep)"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      <form class="contact-form reveal" onsubmit="event.preventDefault();alert('Prototipo: formulario enviado.')">
        <h2>Enviar un mensaje</h2>
        <div class="form-row two">
          <div><label>Nombre</label><input type="text" placeholder="Nombre completo" required></div>
          <div><label>Apellido</label><input type="text" placeholder="Apellido" required></div>
        </div>
        <div class="form-row two">
          <div><label>Correo electrónico</label><input type="email" placeholder="correo@ejemplo.com" required></div>
          <div><label>Teléfono</label><input type="tel" placeholder="+595…"></div>
        </div>
        <div class="form-row">
          <label>Tipo de consulta</label>
          <select>
            <option>Consulta institucional</option>
            <option>Solicitud de visita al museo</option>
            <option>Información sobre la Masonería</option>
            <option>Donación a Fundación Esperanza</option>
            <option>Prensa y comunicación</option>
            <option>Otra</option>
          </select>
        </div>
        <div class="form-row">
          <label>Mensaje</label>
          <textarea placeholder="Su mensaje…" required></textarea>
        </div>
        <button type="submit" class="btn-primary">Enviar mensaje <i class="fas fa-arrow-right"></i></button>
      </form>
    </div>

    <div class="map-block reveal">
      <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-57.6450%2C-25.2895%2C-57.6280%2C-25.2780&layer=mapnik&marker=-25.2840%2C-57.6365" loading="lazy"></iframe>
      <div class="map-overlay">
        <h4>Templo Histórico de Palma</h4>
        <p>Patrimonio Histórico del Paraguay desde 2018. Visitas guiadas con cita previa.</p>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
