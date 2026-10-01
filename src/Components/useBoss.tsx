import { useEffect, useRef, useState } from 'react'
import browser from '../assets/browser.gif'
import browser2 from '../assets/browser2.gif'

const ATRASO_INICIAL = 60 * 1000 // aparece 1 minuto depois do início do jogo
const DURACAO_PARADO = 60 * 1000 // fica visível na tela por 1 minuto

export function useBoss(ativo: boolean) {
    const [visivel, setVisivel] = useState(false)
    const [imagem, setImagem] = useState(browser)
    const timersRef = useRef<number[]>([])

    useEffect(() => {
        if (!ativo) return

        const t1 = window.setTimeout(() => {
            setImagem(browser)
            setVisivel(true) // dispara a entrada pela direita

            const t2 = window.setTimeout(() => {
                setImagem(browser2) // troca a imagem ANTES de sair
                setVisivel(false)   // dispara a saída, de volta pra direita
            }, DURACAO_PARADO)
            timersRef.current.push(t2)
        }, ATRASO_INICIAL)
        timersRef.current.push(t1)

        return () => {
            timersRef.current.forEach(clearTimeout)
            timersRef.current = []
        }
    }, [ativo])

    return { visivel, imagem }
}