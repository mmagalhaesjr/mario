import { useState, useCallback } from 'react'

const CHAVE = 'recordesJogo'
const MAX_RECORDES = 3

function lerRecordes(): number[] {
    try {
        const salvo = localStorage.getItem(CHAVE)
        if (!salvo) return []
        const lista = JSON.parse(salvo)
        return Array.isArray(lista) ? lista : []
    } catch {
        return []
    }
}

export function usePlacar() {
    const [recordes, setRecordes] = useState<number[]>(() => lerRecordes())

    const salvarPontuacao = useCallback((pontuacao: number) => {
        setRecordes((atual) => {
            const novaLista = [...atual, pontuacao]
                .sort((a, b) => b - a)
                .slice(0, MAX_RECORDES)

            localStorage.setItem(CHAVE, JSON.stringify(novaLista))
            return novaLista
        })
    }, [])

    return { recordes, salvarPontuacao }
}