export function carregarNavbar() {
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Compre Aqui!</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="produtos.html">Produtos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contato.html">Contato</a>
            </li>
          </ul>
          <ul class="navbar-nav align-items-center">
            <li class="nav-item me-2 d-flex align-items-center">
              <select id="seletor-tema" class="form-select form-select-sm" aria-label="Selecione um tema">
                <option value="">Tema Padrão</option>
                <option value="tema-dark">Dark</option>
                <option value="tema-ocean">Ocean</option>
                <option value="tema-forest">Forest</option>
              </select>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="carrinho.html">
                <i class="bi bi-cart3"></i> Carrinho
                <span class="contador-carrinho badge bg-primary">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  const container = document.getElementById('navbar-container');
  if (container) {
    container.innerHTML = navbar;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navbar);
  }
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && window.location.pathname.endsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}
