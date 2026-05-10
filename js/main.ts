import 'bootstrap/dist/js/bootstrap.bundle';
import { carregarNavbar } from './navbar';
import {
  carregarDepoimentos,
  enviarFormularioContato,
  ContatoDados,
} from './api';
import {
  renderizarDepoimentos,
  mostrarAlerta,
  atualizarContadorCarrinho,
} from './ui';
import './styles';

declare const bootstrap: any;

interface CarrinhoItem {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

function parseNumber(value: string | null | undefined, fallback = 1): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function adicionarCarrinho(
  nome: string,
  preco: number,
  descricao: string,
  id: string,
  quantidade: number | null = null
): void {
  let qtd =
    quantidade ??
    parseNumber(
      (document.getElementById(`produto_${id}`) as HTMLInputElement | null)
        ?.value,
      1
    );

  if (qtd < 1) qtd = 1;

  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  ) as CarrinhoItem[];
  const existente = carrinho.find((produto) => produto.nome === nome);

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({ nome, preco, descricao, quantidade: qtd });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContadorCarrinho();

  const input = document.getElementById(
    `produto_${id}`
  ) as HTMLInputElement | null;
  if (input) input.value = '1';
}

function calcularTotal(): void {
  const checkboxes = Array.from(
    document.querySelectorAll<HTMLInputElement>('.item-produto')
  );
  const quantidades = Array.from(
    document.querySelectorAll<HTMLInputElement>('.qtd-produto')
  );

  const total = checkboxes.reduce((acc, checkbox, index) => {
    if (!checkbox.checked) return acc;
    return (
      acc +
      parseNumber(checkbox.value) * parseNumber(quantidades[index]?.value, 1)
    );
  }, 0);

  let totalItens = checkboxes.reduce((acc, checkbox, index) => {
    if (!checkbox.checked) return acc;
    return acc + parseNumber(quantidades[index]?.value, 1);
  }, 0);

  const carrinho = JSON.parse(
    localStorage.getItem('carrinho') || '[]'
  ) as CarrinhoItem[];
  totalItens += carrinho.reduce((acc, produto) => acc + produto.quantidade, 0);

  const valorTotalEl = document.getElementById('valor-total');
  if (valorTotalEl) {
    valorTotalEl.textContent = total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  document.querySelectorAll<HTMLElement>('.contador-carrinho').forEach((el) => {
    el.textContent = `${totalItens}`;
  });
}

function aplicarTema(tema: string): void {
  document.body.classList.remove('tema-dark', 'tema-ocean', 'tema-forest');
  if (tema) {
    document.body.classList.add(tema);
  }
  localStorage.setItem('tema-selecionado', tema);
}

function inicializarTema(): void {
  const seletorTema = document.getElementById(
    'seletor-tema'
  ) as HTMLSelectElement | null;
  if (!seletorTema) return;

  const temaSalvo = localStorage.getItem('tema-selecionado') ?? '';
  seletorTema.value = temaSalvo;
  aplicarTema(temaSalvo);

  seletorTema.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    aplicarTema(target.value);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  carregarNavbar();
  inicializarTema();
  atualizarContadorCarrinho();
  calcularTotal();

  const listaDepo = document.getElementById('lista-depoimentos');
  if (listaDepo) {
    try {
      const dados = await carregarDepoimentos();
      renderizarDepoimentos(dados, listaDepo);
    } catch (err) {
      console.error('Erro ao carregar depoimentos:', err);
      listaDepo.innerHTML =
        '<div class="alert alert-warning">Não foi possível carregar os depoimentos.</div>';
    }
  }

  const formContato = document.getElementById(
    'form-contato'
  ) as HTMLFormElement | null;
  const areaAlertas = document.getElementById('area-alertas');

  if (formContato && areaAlertas) {
    formContato.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome =
        (
          document.getElementById('nome') as HTMLInputElement | null
        )?.value.trim() || '';
      const email =
        (
          document.getElementById('email') as HTMLInputElement | null
        )?.value.trim() || '';
      const mensagem =
        (
          document.getElementById('mensagem') as HTMLTextAreaElement | null
        )?.value.trim() || '';

      if (!nome || !email || !mensagem) {
        mostrarAlerta(areaAlertas, 'Preencha todos os campos!', 'danger');
        return;
      }

      const dados: ContatoDados = { nome, email, body: mensagem };
      const resultado = await enviarFormularioContato(dados);

      if (resultado.success) {
        mostrarAlerta(
          areaAlertas,
          '✅ Mensagem enviada com sucesso!',
          'success'
        );
        formContato.reset();
      } else {
        mostrarAlerta(
          areaAlertas,
          '❌ Erro ao enviar. Tente novamente.',
          'danger'
        );
      }
    });
  }

  document
    .querySelectorAll<HTMLButtonElement>('.adicionar-ao-carrinho')
    .forEach((botao) => {
      botao.addEventListener('click', () => {
        const nome = botao.dataset.nome ?? '';
        const preco = parseNumber(botao.dataset.preco, 0);
        const descricao = botao.dataset.descricao ?? '';
        const id = botao.dataset.id ?? '';

        adicionarCarrinho(nome, preco, descricao, id);
      });
    });

  const modalProduto = document.getElementById(
    'modalDetalheProduto'
  ) as HTMLElement | null;

  if (modalProduto) {
    modalProduto.addEventListener('show.bs.modal', (event: Event) => {
      const botao = (event as any).relatedTarget as HTMLElement | null;
      if (!botao) return;

      const nome = botao.getAttribute('data-nome') ?? '';
      const preco = parseNumber(botao.getAttribute('data-preco'), 0);
      const descricao = botao.getAttribute('data-descricao') ?? '';
      const id = botao.getAttribute('data-id') ?? '';

      const modalTitle =
        modalProduto.querySelector<HTMLElement>('.modal-title');
      if (modalTitle) modalTitle.textContent = nome;

      const modalBody = modalProduto.querySelector<HTMLElement>('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
                <div class="text-center mb-3">
                    <img src="http://lorempixel.com.br/400/300" class="img-fluid rounded" alt="${nome}">
                </div>
                <h5>Descrição</h5>
                <p>${descricao}</p>
                <h4 class="text-success mt-4">
                    ${preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h4>
                <div class="mt-3">
                    <label class="form-label">Quantidade:</label>
                    <input type="number" class="form-control w-25 d-inline-block" 
                           id="qtd-modal-${id}" value="1" min="1">
                </div>
            `;
      }

      const btnAdicionarModal = modalProduto.querySelector<HTMLButtonElement>(
        '.adicionar-ao-carrinho-modal'
      );
      if (!btnAdicionarModal) return;

      btnAdicionarModal.replaceWith(btnAdicionarModal.cloneNode(true));
      const novoBtn = modalProduto.querySelector<HTMLButtonElement>(
        '.adicionar-ao-carrinho-modal'
      );
      if (!novoBtn) return;

      novoBtn.addEventListener('click', () => {
        const qtdInput = document.getElementById(
          `qtd-modal-${id}`
        ) as HTMLInputElement | null;
        let qtd = parseNumber(qtdInput?.value, 1);
        if (qtd < 1) qtd = 1;

        adicionarCarrinho(nome, preco, descricao, id, qtd);
        bootstrap.Modal.getInstance(modalProduto).hide();

        mostrarAlerta(
          document.body,
          `✅ ${qtd} × ${nome} adicionado(s) ao carrinho!`,
          'success'
        );
      });
    });
  }
});
