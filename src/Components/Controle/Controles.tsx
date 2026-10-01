import { StyledControles, Botao } from './styled'

interface ControlesProps {
  onPular: () => void
  onIniciarEsquerda: () => void
  onPararEsquerda: () => void
  onIniciarDireita: () => void
  onPararDireita: () => void
}

export  function Controles({
  onPular,
  onIniciarEsquerda,
  onPararEsquerda,
  onIniciarDireita,
  onPararDireita,
}: ControlesProps) {
  return (
    <StyledControles>

  <Botao
        className="seta-cima"
        onTouchStart={(e) => { e.preventDefault(); onPular() }}
        onMouseDown={onPular}
      >
        ↑
      </Botao>


      <Botao
        className="seta-esquerda"
        onTouchStart={(e) => { e.preventDefault(); onIniciarEsquerda() }}
        onTouchEnd={(e) => { e.preventDefault(); onPararEsquerda() }}
        onTouchCancel={() => onPararEsquerda()}
        onMouseDown={onIniciarEsquerda}
        onMouseUp={onPararEsquerda}
        onMouseLeave={onPararEsquerda}
      >
        ←
      </Botao>

    

      <Botao
        className="seta-direita"
        onTouchStart={(e) => { e.preventDefault(); onIniciarDireita() }}
        onTouchEnd={(e) => { e.preventDefault(); onPararDireita() }}
        onTouchCancel={() => onPararDireita()}
        onMouseDown={onIniciarDireita}
        onMouseUp={onPararDireita}
        onMouseLeave={onPararDireita}
      >
        →
      </Botao>
    </StyledControles>
  )
}