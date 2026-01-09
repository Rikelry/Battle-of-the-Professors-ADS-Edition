type Professor = {
  nome: string
  vida: number
  ataque: number
  velocidade: number // chance de desvio (0 a 1)
}

const professores: Professor[] = [
  { nome: "Maykol", vida: 100, ataque: 15, velocidade: 0.2 },
  { nome: "Sekeff", vida: 100, ataque: 18, velocidade: 0.15 },
  { nome: "Iallen", vida: 100, ataque: 14, velocidade: 0.3 },
  { nome: "Jivago", vida: 100, ataque: 20, velocidade: 0.1 },
  { nome: "Mayllon", vida: 100, ataque: 16, velocidade: 0.25 },
  { nome: "Jefferson", vida: 100, ataque: 17, velocidade: 0.2 },
  { nome: "Marcos", vida: 100, ataque: 19, velocidade: 0.15 },
]

function atacar(atacante: Professor, defensor: Professor) {
  // chance de desvio
  const desviou = Math.random() < defensor.velocidade

  if (desviou) {
    console.log(`${defensor.nome} desviou do ataque de ${atacante.nome} 🏃‍♂️`)
    return
  }

  defensor.vida -= atacante.ataque
  console.log(
    `${atacante.nome} atacou ${defensor.nome} causando ${atacante.ataque} de dano 💥`
  )
}

const intervalo = setInterval(() => {
  const vivos = professores.filter(p => p.vida > 0)

  // condição de parada
  if (vivos.length <= 1) {
    clearInterval(intervalo)

    if (vivos.length === 1) {
      console.log(`\n🏆 O vencedor é ${vivos[0].nome} com ${vivos[0].vida} de vida!`)
    } else {
      console.log("\n😵 Todos morreram!")
    }

    return
  }

  // cada professor vivo ataca
  vivos.forEach(atacante => {
    const alvos = vivos.filter(p => p !== atacante)

    if (alvos.length === 0) return

    const alvo = alvos[Math.floor(Math.random() * alvos.length)]
    atacar(atacante, alvo)
  })

  console.log("\n--- Próximo round ---\n")
}, 1000)
