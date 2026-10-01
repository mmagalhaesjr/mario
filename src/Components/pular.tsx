import { useCallback, useEffect, useRef, useState } from 'react'
import somPulo from '../assets/pulo.mp3'

const INICIO_CORTE = 0.30 // segundos a pular no início do arquivo — ajuste conforme necessário

export function usePular(altura = 200, duracao = 800) {
  const [pulando, setPulando] = useState(false)
  const [y, setY] = useState(0) // deslocamento vertical atual

  const pulandoRef = useRef(false)
  const frameRef = useRef<number>(0)
  const inicioRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // pré-carrega o áudio assim que o hook monta, em vez de só na hora do primeiro pulo
  useEffect(() => {
    audioRef.current = new Audio(somPulo)
    audioRef.current.load()
  }, [])

  const pular = useCallback(() => {
    if (pulandoRef.current) return
    pulandoRef.current = true
    setPulando(true)
    inicioRef.current = performance.now()

    // toca o som do pulo, já cortando o início
    if (audioRef.current) {
      audioRef.current.currentTime = INICIO_CORTE
      audioRef.current.play().catch(() => {
        // navegadores bloqueiam autoplay sem interação prévia;
        // como isso é chamado a partir de tecla/clique, raramente cai aqui
      })
    }

    const passo = (agora: number) => {
      const t = (agora - inicioRef.current) / duracao // 0 a 1

      if (t >= 1) {
        setY(0)
        pulandoRef.current = false
        setPulando(false)
        return
      }

      // curva parabólica: sobe e desce suavemente (0 -> altura -> 0)
      const progresso = 4 * t * (1 - t)
      setY(altura * progresso)

      frameRef.current = requestAnimationFrame(passo)
    }

    frameRef.current = requestAnimationFrame(passo)
  }, [altura, duracao])

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return { pulando, y, pular }
}