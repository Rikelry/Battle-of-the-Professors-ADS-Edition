interface Atributos {
  pv: number;
  mp: number;
  ataque: number;
  defesa: number;
  forca: number;
  constituicao: number;
  inteligencia: number;
  sorte: number;
}

class Professor {
  nome: string;
  atributos: Atributos;

  constructor(nome: string, atributos: Atributos) {
    this.nome = nome;
    this.atributos = atributos;
  }

  estaVivo(): boolean {return this.atributos.pv > 0;}

  atacar(alvo: Professor) {
    const critico = Math.random() < this.atributos.sorte / 100;
    const danoBase = this.atributos.ataque + this.atributos.forca * 0.5;
    const dano = Math.max(0, danoBase - alvo.atributos.defesa);
    const danoFinal = critico ? dano * 2 : dano;

    alvo.atributos.pv -= danoFinal;

    console.log(`${this.nome} atacou ${alvo.nome} causando ${danoFinal.toFixed(1)} de dano` + (critico ? " (CRÍTICO!)" : ""));

    if (!alvo.estaVivo()) {console.log(`${alvo.nome} foi (DERROTADO!)`);}
  }
}

function gerarAtributos(): Atributos { // Função para gerar atributos aleatórios
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

const nomes = ["Iallen", "Maykol", "Sekeff", "Jivago", "Mayllon", "Jeferson", "Marcos", "Vasconcelos"];

let professores: Professor[] = nomes.map(nome => new Professor(nome, gerarAtributos()));

console.log("===== RINHA DE PROFESSORES — INÍCIO =====");

while (professores.filter(professor => professor.estaVivo()).length > 1) { // Loop até restar apenas um
  const vivos = professores.filter(professor => professor.estaVivo());

  const atacante = vivos[Math.floor(Math.random() * vivos.length)];
  let alvo = vivos[Math.floor(Math.random() * vivos.length)];

  while (alvo === atacante) {
    alvo = vivos[Math.floor(Math.random() * vivos.length)];
  }

  atacante.atacar(alvo);
}

const vencedor = professores.find(professor => professor.estaVivo());
console.log("===== RINHA DE PROFESSORES — FIM =====");
console.log(`VENCEDOR: ${vencedor?.nome}!`);
