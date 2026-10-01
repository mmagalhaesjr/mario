import styled from "styled-components"

export const StyledControles = styled.div`
  display: none; /* escondido em telas grandes */

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  
    position: absolute;
    bottom: 20px; 
    left: 0;
    width: 100%;
    z-index: 10;

   
  }
`

export const Botao = styled.button`
  width: 30%;
  height: 60px;
 
  border: none;
  background: rgba(30, 115, 201, 0.85);
  color: white;
  font-size: 26px;
  font-weight: bold;
  touch-action: none;  /* evita zoom/rolagem ao tocar */
  user-select: none;   /* evita selecionar o símbolo da seta */
`