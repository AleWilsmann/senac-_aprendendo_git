import { atualizarContadorCarrinho } from './ui';

export interface CarrinhoItem {
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

function criarLinhaCarrinho(produto: CarrinhoItem): HTMLTableRowElement {
  const linha = document.createElement('tr');

  const colunaProduto = document.createElement('td');
  const strong = document.createElement('strong');
  strong.textContent = produto.nome;
  const small = document.createElement('small');
  small.textContent = produto.descricao;
  colunaProduto.append(strong, document.createElement('br'), small);

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
  botaoRemover.addEventListener('click', () => removerItem(produto.nome));
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

  const total = carrinho.reduce((acc, produto) => {
    lista.appendChild(criarLinhaCarrinho(produto));
    return acc + produto.preco * produto.quantidade;
  }, 0);

  totalSpan.textContent = formatarMoeda(total);
}

function removerItem(nome: string): void {
  const carrinho = getCarrinho();

  if (!confirm(`Tem certeza que deseja remover "${nome}" do carrinho?`)) {
    return;
  }

  const atualizado = carrinho.filter((item) => item.nome !== nome);
  localStorage.setItem('carrinho', JSON.stringify(atualizado));

  carregarCarrinho();
  atualizarContadorCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
});
