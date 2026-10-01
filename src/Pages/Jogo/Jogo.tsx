import { useCallback, useEffect, useRef, useState } from "react"
import { Nuvem, StyledJogo, ViloesWrapper, Viloes, Contador, GameOverOverlay, DebugCirculo, BossWrapper, BolaFogo, FogoWrapper } from "./styled"
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
import { useFogo } from "../../Components/useFogo"
import { Controles } from "../../Components/Controle/Controles"
import chao from '../../assets/chao.png'
import nuvem from '../../assets/nuvem.png';
import fogo from '../../assets/fogo.gif'
import somPerdeu from '../../assets/perdeu.mp3'
import { useDificuldade } from "../../Components/useDificuldade.tsx"

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
    const { bolas, bolaSaiu } = useFogo(bossVisivel)

    const duracao = useDificuldade(jogoAtivo)
    const [duracaoAplicada, setDuracaoAplicada] = useState(duracao)
    const [passagem, setPassagem] = useState(0) // conta as travessias do vilão

    useMusica(jogoAtivo, bossVisivel)

    const marioRef = useRef<HTMLImageElement>(null)
    const vilaoRef = useRef<HTMLImageElement>(null)
    const fogoRef = useRef<HTMLImageElement>(null)

    const onColidir = useCallback(() => {
        setJogoAtivo(false)
        salvarPontuacao(segundos)

        const audio = new Audio(somPerdeu)
        audio.play().catch(() => { })
    }, [segundos, salvarPontuacao])

    const debugInfo = useColisao(marioRef, vilaoRef, jogoAtivo, onColidir, 0.25, true)

    // colisão da bola de fogo — mesma lógica do vilão (debug desligado)
    useColisao(marioRef, fogoRef, jogoAtivo, onColidir, 0.25, false)

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

    const vilaoSaiuDaTela = () => {
        setDuracaoAplicada(duracao)   // pega a velocidade mais nova
        sortearNovoVilao()
        setPassagem((p) => p + 1)     // muda a key → recria o wrapper e reinicia a animação
    }

    return (
        <StyledJogo $escuro={ceuEscuro}>

            <Contador>{segundos}s</Contador>

            {/* TESTE: mostra a duração atual da travessia do vilão */}
            <Contador style={{ right: 'auto', left: 16 }}>
                {duracaoAplicada.toFixed(2)}s
            </Contador>

            <Nuvem src={nuvem} alt="nuvemimg" />

            <BossWrapper src={bossImagem} alt="Browser" $visivel={bossVisivel} />

            {bolas.map((bola) => (
                <FogoWrapper
                    key={bola.id}
                    $duracao={bola.duracao}
                    $pausado={!jogoAtivo}
                    onAnimationEnd={(e) => {
                        // só conta o fim da animação do wrapper, não a da imagem dentro dele
                        if (e.target === e.currentTarget) bolaSaiu()
                    }}
                >
                    <BolaFogo
                        ref={fogoRef}
                        src={fogo}
                        alt="Fogo"
                        $pontosY={bola.pontosY}
                        $duracao={bola.duracao}
                        $pausado={!jogoAtivo}
                    />
                </FogoWrapper>
            ))}

            <ViloesWrapper
                key={passagem}
                $altura={vilaoAtual.altura}
                $duracao={duracaoAplicada}
                $pausado={!jogoAtivo}
                onAnimationEnd={vilaoSaiuDaTela}
            >
                <Viloes
                    ref={vilaoRef}
                    src={vilaoAtual.img}
                    alt={vilaoAtual.nome}
                    $width={vilaoAtual.width}
                />
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