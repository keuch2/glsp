    </div><!-- /.admin-content -->
  </main>
</div><!-- /.admin-layout -->

<!-- Media picker modal -->
<div id="media-modal" class="media-modal-overlay" style="display:none">
  <div class="media-modal-box">
    <div class="media-modal-header">
      <h3>Biblioteca de medios</h3>
      <div class="media-modal-tabs">
        <button class="tab-btn active" data-type="">Todo</button>
        <button class="tab-btn" data-type="image">Imágenes</button>
        <button class="tab-btn" data-type="document">Documentos</button>
        <button class="tab-btn" data-type="video">Videos</button>
      </div>
      <input type="text" id="media-search" placeholder="Buscar..." class="media-search-input">
      <button class="media-modal-close" id="media-modal-close">&times;</button>
    </div>

    <div class="media-modal-body">
      <div id="media-upload-zone" class="media-upload-zone">
        <i class="fas fa-cloud-arrow-up"></i>
        <p>Arrastra archivos aquí o <label for="media-file-input" class="media-upload-label">selecciona archivos</label></p>
        <input type="file" id="media-file-input" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mov,.avi,.webm" style="display:none">
        <div id="media-upload-progress" style="display:none">
          <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
          <span id="progress-text">Subiendo...</span>
        </div>
      </div>
      <div id="media-grid" class="media-grid">
        <div class="media-loading"><i class="fas fa-spinner fa-spin"></i></div>
      </div>
    </div>

    <div class="media-modal-footer">
      <div id="media-selection-info" class="media-selection-info"></div>
      <div class="media-modal-actions">
        <button class="btn-secondary" id="media-cancel-btn">Cancelar</button>
        <button class="btn-primary" id="media-insert-btn" disabled>Insertar seleccionado</button>
      </div>
    </div>
  </div>
</div>

<script src="/admin/js/admin.js"></script>
</body>
</html>
