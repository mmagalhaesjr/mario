import { useCallback, useEffect, useRef, useState } from 'react'

const ATRASO_APOS_ENTRADA = 1500 // espera o browser terminar de entrar (transition de 1.5s)
const QTD_PONTOS = 5             // quantas alturas aleatórias o fogo visita no caminho

export type BolaDeFogo = {
    id: number
    pontosY: number[] // alturas sorteadas, em vh (metade de baixo da tela)
    duracao: number
}

// sorteia uma altura entre 45vh e 68vh (metade de baixo, acima do chão)
const alturaAleatoria = () => 45 + Math.random() * 23

export function useFogo(bossVisivel: boolean) {
    const [bolas, setBolas] = useState<BolaDeFogo[]>([])
    const proximoIdRef = useRef(0)
    const bossVisivelRef = useRef(bossVisivel)

    const lancarBola = useCallback(() => {
        setBolas([{
            id: proximoIdRef.current++,
            pontosY: Array.from({ length: QTD_PONTOS }, alturaAleatoria),
            duracao: 4 + Math.random() * 1.5, // entre 4s e 5.5s para atravessar
        }])
    }, [])

    // quando o browser aparece, lança a primeira bola
    useEffect(() => {
        bossVisivelRef.current = bossVisivel
        if (!bossVisivel) return

        const t = window.setTimeout(lancarBola, ATRASO_APOS_ENTRADA)
        return () => clearTimeout(t)
    }, [bossVisivel, lancarBola])

    // chamada quando a bola sai da tela pela esquerda
    const bolaSaiu = useCallback(() => {
        if (bossVisivelRef.current) {
            lancarBola() // saiu → manda a próxima
        } else {
            setBolas([]) // browser foi embora → para de lançar
        }
    }, [lancarBola])

    return { bolas, bolaSaiu }
}