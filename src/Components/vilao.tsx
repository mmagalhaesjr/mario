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

import styled, { keyframes } from 'styled-components'

const moverVilao = keyframes`
  from {
    transform: translateX(100vw); /* começa fora da tela, à direita */
  }
  to {
    transform: translateX(-150px); /* termina fora da tela, à esquerda */
  }
`

export const Viloes = styled.img`
  position: absolute;
  bottom: 100px; /* em cima do chão — ajuste pra bater com a altura do seu #chao */
  left: 0;
  width: 80px;
  animation: ${moverVilao} 4s linear infinite;
`