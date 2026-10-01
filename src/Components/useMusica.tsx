import { useEffect, useRef } from 'react'
import musica from '../assets/musica.mp3'
import musica2 from '../assets/musica2.mp3'

export function useMusica(jogoAtivo: boolean, bossVisivel: boolean) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    // cria o elemento de áudio uma única vez, na montagem
    useEffect(() => {
        const audio = new Audio(musica)
        audio.loop = true
        audio.volume = 0.5
        audioRef.current = audio

        return () => {
            audio.pause()
            audioRef.current = null
        }
    }, [])

    // troca entre musica e musica2 conforme o boss aparece/some
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const novaFonte = bossVisivel ? musica2 : musica

        // só troca se realmente mudou, evitando reiniciar a mesma faixa à toa
        if (!audio.src.includes(novaFonte)) {
            audio.src = novaFonte
            audio.loop = true
            if (jogoAtivo) {
                audio.play().catch(() => {})
            }
        }
    }, [bossVisivel, jogoAtivo])

    // pausa quando o jogo termina, retoma se voltar a ficar ativo
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        if (jogoAtivo) {
            audio.play().catch(() => {})
        } else {
            audio.pause()
        }
    }, [jogoAtivo])
}