import { useEffect, useState } from 'react'

const INTERVALO_MS = 60 * 1000 // 1 minuto

export function useTemaCeu(ativo: boolean) {
    const [escuro, setEscuro] = useState(false)

    useEffect(() => {
        if (!ativo) return

        const intervalo = setInterval(() => {
            setEscuro((atual) => !atual)
        }, INTERVALO_MS)

        return () => clearInterval(intervalo)
    }, [ativo])

    return escuro
}