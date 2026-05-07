const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments?_limit=3';
const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

export interface Depoimento {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ContatoDados {
  nome: string;
  email: string;
  body: string;
}

export async function carregarDepoimentos(): Promise<Depoimento[]> {
  try {
    const resposta = await fetch(API_COMMENTS);
    if (!resposta.ok) throw new Error('Erro ao carregar depoimentos');
    return (await resposta.json()) as Depoimento[];
  } catch (erro) {
    console.error('Erro ao carregar depoimentos:', erro);
    return [];
  }
}

export async function enviarFormularioContato(
  dados: ContatoDados
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const resposta = await fetch(API_POSTS, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (resposta.status === 201) {
      return { success: true };
    }

    throw new Error(`Status ${resposta.status}`);
  } catch (erro) {
    console.error('Erro ao enviar formulário:', erro);
    return { success: false, error: (erro as Error).message };
  }
}
