import { atualizarContadorCarrinho } from './ui';

interface CarrinhoItem {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

function getCarrinho(): CarrinhoItem[] {
  return JSON.parse(localStorage.getItem('carrinho') || '[]') as CarrinhoItem[];
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function criarLinhaCarrinho(
  produto: CarrinhoItem,
  index: number
): HTMLTableRowElement {
  const linha = document.createElement('tr');

  const colunaProduto = document.createElement('td');
  colunaProduto.innerHTML = `
    <strong>${produto.nome}</strong><br>
    <small>${produto.descricao}</small>
  `;

  const colunaPreco = document.createElement('td');
  colunaPreco.textContent = formatarMoeda(produto.preco);

  const colunaQuantidade = document.createElement('td');
  colunaQuantidade.textContent = produto.quantidade.toString();

  const colunaTotal = document.createElement('td');
  colunaTotal.textContent = formatarMoeda(produto.preco * produto.quantidade);

  const colunaAcao = document.createElement('td');
  const botaoRemover = document.createElement('button');
  botaoRemover.type = 'button';
  botaoRemover.className = 'btn btn-danger btn-sm';
  botaoRemover.textContent = 'Remover';
  botaoRemover.addEventListener('click', () => removerItem(index));
  colunaAcao.appendChild(botaoRemover);

  linha.append(
    colunaProduto,
    colunaPreco,
    colunaQuantidade,
    colunaTotal,
    colunaAcao
  );

  return linha;
}

function carregarCarrinho(): void {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total-carrinho');
  if (!lista || !totalSpan) return;

  const carrinho = getCarrinho();
  lista.innerHTML = '';

  const total = carrinho.reduce((acc, produto, index) => {
    lista.appendChild(criarLinhaCarrinho(produto, index));
    return acc + produto.preco * produto.quantidade;
  }, 0);

  totalSpan.textContent = formatarMoeda(total);
}

function removerItem(index: number): void {
  const carrinho = getCarrinho();
  if (index < 0 || index >= carrinho.length) return;

  const nomeProduto = carrinho[index].nome;
  if (
    !confirm(`Tem certeza que deseja remover "${nomeProduto}" do carrinho?`)
  ) {
    return;
  }

  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  carregarCarrinho();
  atualizarContadorCarrinho();
}

function inicializarCarrinho(): void {
  carregarCarrinho();
}

document.addEventListener('DOMContentLoaded', inicializarCarrinho);
