export interface Depoimento {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type AlertaTipo = 'success' | 'danger' | 'warning' | 'info';

export function renderizarDepoimentos(
  depoimentos: Depoimento[],
  elementoLista: HTMLElement
): void {
  elementoLista.innerHTML = '';

  depoimentos.forEach((depo) => {
    elementoLista.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${depo.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${depo.email}</h6>
                        <p class="card-text">${depo.body}</p>
                    </div>
                </div>
            </div>
        `;
  });
}

export function mostrarAlerta(
  area: HTMLElement,
  mensagem: string,
  tipo: AlertaTipo = 'success'
): void {
  area.innerHTML = '';

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = 'alert';
  alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  area.appendChild(alerta);

  setTimeout(() => {
    if (alerta.parentNode) alerta.remove();
  }, 5000);
}

export function atualizarContadorCarrinho(): void {
  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  ) as Array<{
    quantidade: number | string;
  }>;

  const totalItens = carrinho.reduce(
    (acc, prod) => acc + Number(prod.quantidade),
    0
  );

  document.querySelectorAll<HTMLElement>('#contador-carrinho').forEach((el) => {
    el.textContent = `${totalItens}`;
  });
}

declare global {
  interface Window {
    atualizarContadorCarrinho?: () => void;
  }
}

window.atualizarContadorCarrinho = atualizarContadorCarrinho;
