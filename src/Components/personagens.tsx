import escolha1 from '../assets/escolha1.png'
import escolha2 from '../assets/escolha2.png'
import corrida1 from '../assets/corrida1.gif'
import corrida2 from '../assets/corrida2.gif'
import derrota1 from '../assets/derrota1.png'
import derrota2 from '../assets/derrota2.png'

export const personagens = [
    { id: 'lucca', nome: 'LUCCA', img: escolha1, imgJogo: corrida1, imgDerrota: derrota1 },
    { id: 'robbysom', nome: 'ROBBYSOM', img: escolha2, imgJogo: corrida2, imgDerrota: derrota2 },
]

export const personagemPadrao = personagens[0]