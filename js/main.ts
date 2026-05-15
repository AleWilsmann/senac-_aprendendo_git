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
import { inicializarTema } from './tema';
import type { CarrinhoItem } from './cart';

declare const bootstrap: any;

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

function construirModalBody(
  modalBody: HTMLElement,
  nome: string,
  descricao: string,
  preco: number,
  id: string
): void {
  // Imagem
  const divImagem = document.createElement('div');
  divImagem.className = 'text-center mb-3';
  const img = document.createElement('img');
  img.src = 'http://lorempixel.com.br/400/300';
  img.className = 'img-fluid rounded';
  img.alt = nome;
  divImagem.appendChild(img);

  // Descrição
  const h5 = document.createElement('h5');
  h5.textContent = 'Descrição';

  const p = document.createElement('p');
  p.textContent = descricao;

  // Preço
  const h4 = document.createElement('h4');
  h4.className = 'text-success mt-4';
  h4.textContent = preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Quantidade
  const divQuantidade = document.createElement('div');
  divQuantidade.className = 'mt-3';

  const label = document.createElement('label');
  label.className = 'form-label';
  label.textContent = 'Quantidade:';
  label.htmlFor = `qtd-modal-${id}`;

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'form-control w-25 d-inline-block';
  input.id = `qtd-modal-${id}`;
  input.value = '1';
  input.min = '1';

  divQuantidade.append(label, input);

  modalBody.replaceChildren(divImagem, h5, p, h4, divQuantidade);
}

document.addEventListener('DOMContentLoaded', async () => {
  carregarNavbar();
  inicializarTema();
  atualizarContadorCarrinho();

  // Depoimentos
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

  // Formulário de contato
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

  // Botões de adicionar ao carrinho
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

  // Modal de detalhe do produto
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
        construirModalBody(modalBody, nome, descricao, preco, id);
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
