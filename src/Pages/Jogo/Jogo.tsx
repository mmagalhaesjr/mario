import { useCallback, useEffect, useRef, useState } from "react"
import { Nuvem, StyledJogo, ViloesWrapper, Viloes, Contador, GameOverOverlay, DebugCirculo, BossWrapper } from "./styled"
import { usePular } from "../../Components/pular"
import { useAndar } from "../../Components/andar"
import { useVilao } from "../../Components/vilao"
import { useContador } from "../../Components/useContador"
import { useColisao } from "../../Components/useColisao.ts"
import { usePlacar } from "../../Components/usePlacar"
import { usePersonagemEscolhido } from "../../Components/usePersonagemEscolhido"
import { useTemaCeu } from "../../Components/useTemaCeu"
import { useBoss } from "../../Components/useBoss"
import { useMusica } from "../../Components/useMusica"
import { Controles } from "../../Components/Controle/Controles"
import chao from '../../assets/chao.png'
import nuvem from '../../assets/nuvem.png';
import somPerdeu from '../../assets/perdeu.mp3'

export default function Jogo() {
    const [jogoAtivo, setJogoAtivo] = useState(true)

    const { personagem } = usePersonagemEscolhido()
    const { vilaoAtual, sortearNovoVilao } = useVilao()
    const { y, pular } = usePular()
    const {
        x,
        direcao,
        iniciarEsquerda,
        pararEsquerda,
        iniciarDireita,
        pararDireita,
    } = useAndar()
    const segundos = useContador(jogoAtivo)
    const { recordes, salvarPontuacao } = usePlacar()
    const ceuEscuro = useTemaCeu(jogoAtivo)
    const { visivel: bossVisivel, imagem: bossImagem } = useBoss(jogoAtivo)

    useMusica(jogoAtivo, bossVisivel)

    const marioRef = useRef<HTMLImageElement>(null)
    const vilaoRef = useRef<HTMLImageElement>(null)

    const onColidir = useCallback(() => {
        setJogoAtivo(false)
        salvarPontuacao(segundos)

        const audio = new Audio(somPerdeu)
        audio.play().catch(() => {})
    }, [segundos, salvarPontuacao])

    const debugInfo = useColisao(marioRef, vilaoRef, jogoAtivo, onColidir, 0.25, true)

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!jogoAtivo) return
            if (e.repeat) return
            if (e.key === 'ArrowUp' || e.key === ' ') pular()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [pular, jogoAtivo])

    const reiniciar = () => {
        window.location.reload()
    }

    return (
        <StyledJogo $escuro={ceuEscuro}>

            <Contador>{segundos}s</Contador>

            <Nuvem src={nuvem} alt="nuvemimg" />

            <BossWrapper src={bossImagem} alt="Browser" $visivel={bossVisivel} />

            <ViloesWrapper
                $altura={vilaoAtual.altura}
                $pausado={!jogoAtivo}
                onAnimationIteration={sortearNovoVilao}
            >
                <Viloes ref={vilaoRef} src={vilaoAtual.img} alt="Vilão" $width={vilaoAtual.width} />
            </ViloesWrapper>

            <img
                ref={marioRef}
                id="mario"
                src={jogoAtivo ? personagem.imgJogo : personagem.imgDerrota}
                alt={personagem.nome}
                style={{
                    transform: `translateX(${x}px) translateY(${-y}px) scaleX(${direcao})`,
                    position: 'absolute',
                    zIndex: jogoAtivo ? 'auto' : 25,
                }}
            />

            <img id="chao" src={chao} alt="Chão" />

            <Controles
                onPular={pular}
                onIniciarEsquerda={iniciarEsquerda}
                onPararEsquerda={pararEsquerda}
                onIniciarDireita={iniciarDireita}
                onPararDireita={pararDireita}
            />

            {debugInfo && (
                <>
                    <DebugCirculo $x={debugInfo.c1.x} $y={debugInfo.c1.y} $r={debugInfo.c1.r} $cor="lime" />
                    <DebugCirculo $x={debugInfo.c2.x} $y={debugInfo.c2.y} $r={debugInfo.c2.r} $cor="red" />
                </>
            )}

            {!jogoAtivo && (
                <GameOverOverlay>
                    <h2>Game Over</h2>
                    <p>Sua pontuação: {segundos}s</p>
                    <ol>
                        {recordes.map((rec, i) => (
                            <li key={i}>
                                {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {rec}s
                            </li>
                        ))}
                    </ol>
                    <button onClick={reiniciar}>Jogar novamente</button>
                </GameOverOverlay>
            )}
        </StyledJogo>
    )
}