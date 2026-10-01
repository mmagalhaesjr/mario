import { useState, useCallback } from 'react'
import { personagens, personagemPadrao } from './personagens'

const CHAVE = 'personagemEscolhido'

function lerPersonagemSalvo() {
    try {
        const idSalvo = localStorage.getItem(CHAVE)
        const encontrado = personagens.find((p) => p.id === idSalvo)
        return encontrado ?? personagemPadrao
    } catch {
        return personagemPadrao
    }
}

export function usePersonagemEscolhido() {
    const [personagem, setPersonagem] = useState(() => lerPersonagemSalvo())

    const escolherPersonagem = useCallback((id: string) => {
        const encontrado = personagens.find((p) => p.id === id) ?? personagemPadrao
        localStorage.setItem(CHAVE, encontrado.id)
        setPersonagem(encontrado)
    }, [])

    return { personagem, escolherPersonagem }
}