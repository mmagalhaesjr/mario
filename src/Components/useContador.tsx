import { useEffect, useState } from 'react'

export function useContador(ativo: boolean = true) {
    const [segundos, setSegundos] = useState(0)

    useEffect(() => {
        if (!ativo) return

        const intervalo = setInterval(() => {
            setSegundos((atual) => atual + 1)
        }, 1000)

        return () => clearInterval(intervalo)
    }, [ativo])

    return segundos
}