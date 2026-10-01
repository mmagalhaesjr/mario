import styled from 'styled-components'


export const StyledSelecao = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  background: linear-gradient(
            to bottom,
            #1e73c9 0%,
            #4a9be0 35%,
            #82c4ee 70%,
            #b8e2f7 100%
          );
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
export const CartaoPersonagem = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

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
position: absolute;
bottom: 0;
width:100%;
  margin: 0;
  font-family: 'Arial Black', sans-serif;
  font-size: 3rem;
  color: #000;
  -webkit-text-stroke: 1px white;
  text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white;
  z-index: 2;
  

  @media (max-width: 900px) {
    font-size: 1.5rem;
  }

 
`

export const Personagens = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  gap: 6px;

 

  @media (max-width: 900px) {
    bottom: 30px;
  }

  @media (max-width: 600px) {
    bottom: 16px;
    align-items: center;
  }
`





export const ImgPersonagem = styled.img`
 
  width: 90%;
  height: 40%;
  object-fit: contain;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3));
  z-index: 1;
  margin-bottom: 10%;

  @media (max-width: 900px) {
   width: 400px;
   margin-bottom:50%;
  }

 
`
