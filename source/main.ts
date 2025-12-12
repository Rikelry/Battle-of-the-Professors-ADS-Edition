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

export function gerarAtributos(): Atributos {
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

export function duelo(
  jogador_um: Professor,
  jogador_dois: Professor,
  registrar: (msg: string) => void
): Professor {

  registrar(`🔥 Início do duelo: <b>${jogador_um.nome}</b> vs <b>${jogador_dois.nome}</b>`);

  while (jogador_um.estaVivo() && jogador_dois.estaVivo()) {
    const atacante = Math.random() < 0.5 ? jogador_um : jogador_dois;
    const alvo = atacante === jogador_um ? jogador_dois : jogador_um;

    const dano = atacante.atacar(alvo);

    registrar(
      `⚔️ <b>${atacante.nome}</b> atacou <b>${alvo.nome}</b> causando <b>${dano.toFixed(
        1
      )}</b> de dano. (PV restante: ${alvo.atributos.pv.toFixed(1)})`
    );
  }

  const vencedor = jogador_um.estaVivo() ? jogador_um : jogador_dois;

  registrar(`🏅 Vencedor do duelo: <b>${vencedor.nome}</b><br>`);

  return vencedor;
}

export function torneio(
  professores: Professor[],
  registrar: (msg: string) => void
): Professor {

  let rodada = professores;

  while (rodada.length > 1) {
    const proximos: Professor[] = [];

    registrar(`<hr><h3>🔵 Nova fase do torneio (${rodada.length} participantes)</h3>`);

    for (let i = 0; i < rodada.length; i += 2) {
      const a = rodada[i];
      const b = rodada[i + 1];

      registrar(`<br>🆚 Duelo entre <b>${a.nome}</b> e <b>${b.nome}</b><br>`);

      const vencedor = duelo(a, b, registrar);
      proximos.push(vencedor);
    }

    rodada = proximos;
  }

  registrar(`<h2>🏆 Campeão: ${rodada[0].nome}</h2>`);

  return rodada[0];
}
