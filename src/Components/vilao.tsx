import { useState, useCallback } from 'react'
import { listaviloes } from './listaviloes'

export function useVilao() {
    const [vilaoAtual, setVilaoAtual] = useState(
        () => listaviloes[Math.floor(Math.random() * listaviloes.length)]
    )

    const sortearNovoVilao = useCallback(() => {
        const indice = Math.floor(Math.random() * listaviloes.length)
        setVilaoAtual(listaviloes[indice])
    }, [])

    return { vilaoAtual, sortearNovoVilao }
}