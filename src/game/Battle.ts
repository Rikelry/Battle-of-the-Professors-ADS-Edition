import { Professor } from "../models/Professor";
import { batalhaThread } from "./ThreadSim";

export async function iniciarBatalha(
  professores: Professor[],
  onUpdate: () => void,
  onFinish: (vencedor: Professor) => void
) {
  await Promise.all(
    professores.map(p =>
      batalhaThread(p, professores, onUpdate)
    )
  );

  const vencedor = professores.find(p => p.vivo);
  if (vencedor) {
    onFinish(vencedor);
  }
}
