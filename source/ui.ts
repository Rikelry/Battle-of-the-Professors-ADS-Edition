import { Professor, gerarAtributos, torneio } from "./main";

const nomes = ["Iallen", "Maykol", "Sekeff", "Jivago", "Mayllon", "Jeferson", "Marcos", "Vasconcelos"];

let professores: Professor[] = [];

const btn = document.getElementById("start") as HTMLButtonElement;
const log = document.getElementById("log") as HTMLDivElement;

function registrar(msg: string) {
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight; // auto-scroll
}

btn.onclick = () => {
  log.innerHTML = "";

  professores = nomes.map(nome => new Professor(nome, gerarAtributos()));

  torneio(professores, registrar);
};
