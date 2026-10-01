import { useEffect, useState } from 'react'

const INTERVALO_MS = 1 * 60 * 1000 // 1 minuto
const REDUCAO_POR_NIVEL = 0.5      // quanto tira da duração a cada aumento
const DURACAO_MINIMA = 3.5         // nunca fica mais rápido que isso (segundos)
const DURACAO_INICIAL = 4

export function useDificuldade(ativo: boolean) {
    const [duracao, setDuracao] = useState(DURACAO_INICIAL)

    useEffect(() => {
        if (!ativo) return

        const intervalo = setInterval(() => {
            setDuracao((atual) => Math.max(DURACAO_MINIMA, atual - REDUCAO_POR_NIVEL))
        }, INTERVALO_MS)

        return () => clearInterval(intervalo)
    }, [ativo])

    return duracao
}