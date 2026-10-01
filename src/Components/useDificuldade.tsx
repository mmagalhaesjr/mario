import { useEffect, useState } from 'react'

const INTERVALO_MS = 60 * 1000       // 1 minuto
const AUMENTO_VELOCIDADE = 1.15      // +15% sobre a velocidade atual
const DURACAO_INICIAL = 4            // segundos

export function useDificuldade(ativo: boolean) {
    const [duracao, setDuracao] = useState(DURACAO_INICIAL)

    useEffect(() => {
        if (!ativo) return

        const intervalo = setInterval(() => {
            setDuracao((atual) => atual / AUMENTO_VELOCIDADE)
        }, INTERVALO_MS)

        return () => clearInterval(intervalo)
    }, [ativo])

    return duracao
}