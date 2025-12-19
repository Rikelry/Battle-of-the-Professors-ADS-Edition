import { Professor } from "../models/Professor";

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function batalhaThread(
  professor: Professor,
  professores: Professor[],
  onUpdate: () => void
) {
  while (professor.vivo) {
    await delay(2000 / professor.velocidade);

    const alvos = professores.filter(p => p.vivo && p !== professor);
    if (alvos.length === 0) break;

    const alvo = alvos[Math.floor(Math.random() * alvos.length)];
    professor.atacar(alvo);

    onUpdate();
  }
}
