// tema.ts
export function inicializarTema() {
  const seletor = document.getElementById('seletor-tema') as HTMLSelectElement;
  if (!seletor) return;

  const temaSalvo = localStorage.getItem('tema-selecionado') ?? '';
  seletor.value = temaSalvo;
  aplicarTema(temaSalvo);

  seletor.addEventListener('change', (e) => {
    const tema = (e.target as HTMLSelectElement).value;
    aplicarTema(tema);
  });
}

function aplicarTema(tema: string) {
  document.body.classList.remove('tema-dark', 'tema-ocean', 'tema-forest');
  if (tema) document.body.classList.add(tema);
  localStorage.setItem('tema-selecionado', tema);
}
