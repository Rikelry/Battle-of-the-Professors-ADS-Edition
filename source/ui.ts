import { Professor, gerarAtributos, torneio } from "./main";

const nomes = ["Iallen", "Maykol", "Sekeff", "Jivago", "Mayllon", "Jeferson", "Marcos", "Vasconcelos"];

let professores: Professor[] = [];

const btn = document.getElementById("start") as HTMLButtonElement;
const log = document.getElementById("log") as HTMLDivElement;

btn.onclick = () => {
  log.innerHTML = "";

  professores = nomes.map(
    nome => new Professor(nome, gerarAtributos())
  );

  const vencedor = torneio(professores);

  log.innerHTML += `<h2>🏆 Campeão: ${vencedor.nome}</h2>`;
};
