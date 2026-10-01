import { useNavigate } from "react-router-dom"
import { StyledSelecao, Personagens, CartaoPersonagem, NomePersonagem, ImgPersonagem, Titulo } from "./styled"
import { usePersonagemEscolhido } from "../../Components/usePersonagemEscolhido"
import escolha1 from '../../assets/escolha1.png'
import escolha2 from '../../assets/escolha2.png'

export default function Selecao() {
    const navegar = useNavigate()
    const { escolherPersonagem } = usePersonagemEscolhido()

    const escolher = (id: string) => {
        escolherPersonagem(id)
        navegar("/jogo")
    }

    return (
        <StyledSelecao>
            <Titulo>Escolha seu personagem</Titulo>

            <Personagens>
                <CartaoPersonagem onClick={() => escolher('lucca')}>
                    <NomePersonagem>LUCCA</NomePersonagem>
                    <ImgPersonagem src={escolha1} alt="Lucca" />
                </CartaoPersonagem>

                <CartaoPersonagem onClick={() => escolher('robbysom')}>
                    <NomePersonagem>ROBBYSOM</NomePersonagem>
                    <ImgPersonagem src={escolha2} alt="Robbysom" />
                </CartaoPersonagem>
            </Personagens>
        </StyledSelecao>
    )
}