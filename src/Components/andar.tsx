import { useCallback, useEffect, useRef, useState } from 'react'

export function useAndar(velocidade = 4, larguraMario = 100) {
  const [x, setX] = useState(0)
  const [direcao, setDirecao] = useState<1 | -1>(1)
  const [andando, setAndando] = useState(false)

  const teclas = useRef({ esquerda: false, direita: false })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') teclas.current.esquerda = true
      if (e.key === 'ArrowRight') teclas.current.direita = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') teclas.current.esquerda = false
      if (e.key === 'ArrowRight') teclas.current.direita = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    const loop = () => {
      const { esquerda, direita } = teclas.current
      const limiteDireito = window.innerWidth - larguraMario

      if (esquerda && !direita) {
        setDirecao(-1)
        setX((atual) => Math.max(0, atual - velocidade))
        setAndando(true)
      } else if (direita && !esquerda) {
        setDirecao(1)
        setX((atual) => Math.min(limiteDireito, atual + velocidade))
        setAndando(true)
      } else {
        setAndando(false)
      }

      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      cancelAnimationFrame(frameRef.current)
    }
  }, [velocidade, larguraMario])

  // Funções pra controlar o mesmo `teclas.current` a partir de um botão na tela.
  // O loop acima nem sabe se quem escreveu ali foi o teclado ou o toque —
  // ele só lê o objeto, então reaproveita a física sem duplicar código.
  const iniciarEsquerda = useCallback(() => { teclas.current.esquerda = true }, [])
  const pararEsquerda = useCallback(() => { teclas.current.esquerda = false }, [])
  const iniciarDireita = useCallback(() => { teclas.current.direita = true }, [])
  const pararDireita = useCallback(() => { teclas.current.direita = false }, [])

  return { x, direcao, andando, iniciarEsquerda, pararEsquerda, iniciarDireita, pararDireita }
}