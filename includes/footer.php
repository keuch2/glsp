<?php $base = $base ?? ''; ?>

<footer class="footer" id="footer">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="<?= $base ?>glsp_assets/logo-footer.png" alt="" class="seal">
        <h3>Gran Logia Simbólica<br>del Paraguay</h3>
        <div class="org-meta">Fundada en 1923</div>
        <p>La obediencia masónica regular del Paraguay — origen y continuidad de la verdadera masonería paraguaya. Reconocida por más de 70 Grandes Logias regulares en todo el mundo.</p>
      </div>
      <div>
        <h4>Secciones</h4>
        <ul>
          <li><a href="<?= $base ?>gran-logia.php">Gran Logia</a></li>
          <li><a href="<?= $base ?>historia.php">Historia</a></li>
          <li><a href="<?= $base ?>noticias/">Noticias</a></li>
          <li><a href="<?= $base ?>centro-cultural.php">Centro Cultural</a></li>
          <li><a href="<?= $base ?>masoneria.php">Masonería</a></li>
          <li><a href="<?= $base ?>filantropia.php">Filantropía</a></li>
          <li><a href="<?= $base ?>grandes-maestros.php">Grandes Maestros</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contacto</h4>
        <span class="label">Dirección</span>
        <p>Luís Alberto de Herrera Nº 1071<br>c/ Brasil — Asunción, Paraguay</p>
        <span class="label">Correo</span><p>secejecutiva@glsp.org.py</p>
        <span class="label">Teléfono</span><p>+595 21 231 103 al 6</p>
      </div>
      <div>
        <h4>Síguenos</h4>
        <p style="font-family:Lora,serif;font-style:italic;color:var(--gold)">@GranLogiaSimbolicaPy</p>
        <div class="social-row">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-x-twitter"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© <span data-year>2026</span> Gran Logia Simbólica del Paraguay · Todos los derechos reservados</div>
      <div>Diseño & desarrollo <em>Mister Co.</em></div>
    </div>
  </div>
</footer>

<button class="back-top" id="backTop"><i class="fas fa-arrow-up"></i></button>

<script src="<?= $base ?>assets/site.js"></script>
<script src="<?= $base ?>assets/i18n.js"></script>
</body>
</html>
