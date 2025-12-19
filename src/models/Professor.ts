export class Professor {
  nome: string;
  hp: number = 100;
  ataque: number;
  defesa: number;
  velocidade: number;
  vivo: boolean = true;
  sprite: string;

  constructor(
    nome: string,
    ataque: number,
    defesa: number,
    velocidade: number,
    sprite: string
  ) {
    this.nome = nome;
    this.ataque = ataque;
    this.defesa = defesa;
    this.velocidade = velocidade;
    this.sprite = sprite;
  }

  receberDano(dano: number) {
    const danoFinal = dano - this.defesa;
    if (danoFinal > 0) {
      this.hp -= danoFinal;
    }

    if (this.hp <= 0) {
      this.hp = 0;
      this.vivo = false;
    }
  }

  atacar(alvo: Professor) {
    if (this.vivo && alvo.vivo) {
      alvo.receberDano(this.ataque);
    }
  }
}
