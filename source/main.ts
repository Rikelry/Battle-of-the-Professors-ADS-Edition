export interface Atributos {
  pv: number;
  mp: number;
  ataque: number;
  defesa: number;
  forca: number;
  constituicao: number;
  inteligencia: number;
  sorte: number;
}

export class Professor {
  nome: string;
  atributos: Atributos;

  constructor(nome: string, atributos: Atributos) {
    this.nome = nome;
    this.atributos = atributos;
  }

  estaVivo(): boolean {
    return this.atributos.pv > 0;
  }

  atacar(alvo: Professor): number {
    const critico = Math.random() < this.atributos.sorte / 100;
    const danoBase = this.atributos.ataque + this.atributos.forca * 0.5;
    const dano = Math.max(0, danoBase - alvo.atributos.defesa);
    const danoFinal = critico ? dano * 2 : dano;

    alvo.atributos.pv -= danoFinal;

    return danoFinal;
  }
}

export function gerarAtributos(): Atributos { // Gera atributos aleatórios
  return {
    pv: 80 + Math.floor(Math.random() * 40),
    mp: 20 + Math.floor(Math.random() * 20),
    ataque: 10 + Math.floor(Math.random() * 10),
    defesa: 5 + Math.floor(Math.random() * 10),
    forca: 10 + Math.floor(Math.random() * 10),
    constituicao: 8 + Math.floor(Math.random() * 8),
    inteligencia: 10 + Math.floor(Math.random() * 10),
    sorte: 5 + Math.floor(Math.random() * 20)
  };
}

export function duelo(jogador_um: Professor, jogador_dois: Professor): Professor {
  while (jogador_um.estaVivo() && jogador_dois.estaVivo()) {
    const atacante = Math.random() < 0.5 ? jogador_um : jogador_dois;
    const alvo = atacante === jogador_um ? jogador_dois : jogador_um;

    atacante.atacar(alvo);
  }

  return jogador_um.estaVivo() ? jogador_um : jogador_dois;
}

export function torneio(professores: Professor[]): Professor { // Realiza rounds estilo torneio
  let rodada = professores;

  while (rodada.length > 1) {
    const proximos: Professor[] = [];

    for (let i = 0; i < rodada.length; i += 2) {
      const a = rodada[i];
      const b = rodada[i + 1];

      const vencedor = duelo(a, b);
      proximos.push(vencedor);
    }

    rodada = proximos;
  }

  return rodada[0];
}
