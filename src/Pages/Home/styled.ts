import styled from 'styled-components'
import fundo from '../../assets/fundo.png'

export const StyledSelecao = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${fundo}) center / cover no-repeat;
  overflow: hidden;
`

export const Personagens = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 900px) {
    bottom: 30px;
  }

  @media (max-width: 600px) {
    bottom: 16px;
    align-items: center;
  }
`

export const CartaoPersonagem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s ease;
  flex: 1;
  max-width: 45%;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 600px) {
    gap: 6px;
  }
`

export const NomePersonagem = styled.h2`
  margin: 0;
  font-family: 'Arial Black', sans-serif;
  font-size: 32px;
  color: #000;
  -webkit-text-stroke: 1px white;
  text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white;

  @media (max-width: 900px) {
    font-size: 24px;
  }

 
`

export const ImgPersonagem = styled.img`
  height: 500px;
  max-height: 60vh;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3));

  @media (max-width: 900px) {
    height: 550px;

  }

  @media (max-width: 600px) {
   
  }

  @media (max-width: 400px) {
   
  }
`

export const Titulo = styled.h1`
  position: absolute;
  top: 24px;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: 'Arial Black', sans-serif;
  font-size: 40px;
  color: #fff;
  text-shadow: 3px 3px 0 #c0392b;
  margin: 0;
  padding: 0 12px;

  @media (max-width: 900px) {
    font-size: 30px;
    top: 100px;
  }


`