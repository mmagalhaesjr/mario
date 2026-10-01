import styled, { keyframes } from "styled-components"

export const StyledJogo = styled.div<{ $escuro?: boolean }>`
  width: 100%;
  height: 100vh;
  position: relative;
  outline: none;
  overflow: hidden;

  background: ${(props) =>
    props.$escuro
        ? `linear-gradient(
            to bottom,
            #1a0505 0%,
            #4a0e0e 35%,
            #7a1f1f 70%,
            #3d1414 100%
          )`
        : `linear-gradient(
            to bottom,
            #1e73c9 0%,
            #4a9be0 35%,
            #82c4ee 70%,
            #b8e2f7 100%
          )`};
  transition: background 2s ease; /* suaviza a troca em vez de trocar bruscamente */

  #chao {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
  }

  #mario {
    width: 200px;
    height: 200px;
    position: absolute;
    bottom: 100px;
  }

  @media (max-width: 800px) {
     height: 90vh;
  }
`

const moverNuvem = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-150px);
  }
`

export const Nuvem = styled.img`
  position: absolute;
  top: 40px;
  left: 0;
  width: 60%;
  animation: ${moverNuvem} 15s linear infinite;
`

const moverVilao = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-150px);
  }
`

export const ViloesWrapper = styled.div<{ $altura?: number; $pausado?: boolean; $duracao?: number }>`
  position: absolute;
  left: 0;
  bottom: ${(props) => props.$altura ?? 100}px;
  animation: ${moverVilao} ${(props) => props.$duracao ?? 4}s linear 1 forwards;
  animation-play-state: ${(props) => (props.$pausado ? 'paused' : 'running')};
`

export const Viloes = styled.img<{ $width?: number }>`
  width: ${(props) => props.$width ?? 80}px;
  display: block;
  transform: scaleX(-1);


`

export const Contador = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 30px;
  font-weight: bold;
  font-family: monospace;
  z-index: 10;
`

export const GameOverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 20;
  text-align: center;

  h2 {
    font-size: 32px;
    margin: 0 0 8px;
  }

  p {
    margin: 0;
    font-size: 18px;
  }

  ol {
    margin: 12px 0;
    padding-left: 24px;
    font-size: 16px;
    text-align: left;
  }

  button {
    position: relative;
    z-index: 30;
    margin-top: 16px;
    padding: 10px 28px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    background: #1e73c9;
    color: white;
    cursor: pointer;
  }
`

export const DebugCirculo = styled.div<{
  $x: number
  $y: number
  $r: number
  $cor: string
}>`
  position: fixed;
  left: ${(props) => props.$x - props.$r}px;
  top: ${(props) => props.$y - props.$r}px;
  width: ${(props) => props.$r * 2}px;
  height: ${(props) => props.$r * 2}px;
  border-radius: 50%;

  pointer-events: none;
  z-index: 999;
`

export const BossWrapper = styled.img<{ $visivel?: boolean }>`
  position: absolute;
  top: 60px;
  left: 100%; /* começa com a borda esquerda exatamente na borda direita da tela = fora de vista */
  width: 300px;
  transition: transform 1.5s ease-in-out;
  transform: translateX(${(props) => (props.$visivel ? '-250px' : '0')});
  z-index: 5;
`
// movimento horizontal: da posição do browser até sair pela esquerda
const fogoHorizontal = keyframes`
  from { transform: translateX(-200px); }
  to   { transform: translateX(calc(-100vw - 150px)); }
`

// movimento vertical: sai do browser e passa por 5 alturas aleatórias
const fogoVertical = keyframes`
  0%   { transform: translateY(100px); }
  20%  { transform: translateY(var(--y1)); }
  40%  { transform: translateY(var(--y2)); }
  60%  { transform: translateY(var(--y3)); }
  80%  { transform: translateY(var(--y4)); }
  100% { transform: translateY(var(--y5)); }
`

export const FogoWrapper = styled.div<{ $duracao: number; $pausado?: boolean }>`
  position: absolute;
  top: 60px;
  left: 100%;
  z-index: 4; /* atrás do browser (z-index 5) na saída */
  animation: ${fogoHorizontal} ${(props) => props.$duracao}s linear 1 both;
  animation-play-state: ${(props) => (props.$pausado ? 'paused' : 'running')};
`

export const BolaFogo = styled.img<{ $pontosY: number[]; $duracao: number; $pausado?: boolean }>`
  display: block;
  width: 60px;
  --y1: calc(${(props) => props.$pontosY[0]}vh - 60px);
  --y2: calc(${(props) => props.$pontosY[1]}vh - 60px);
  --y3: calc(${(props) => props.$pontosY[2]}vh - 60px);
  --y4: calc(${(props) => props.$pontosY[3]}vh - 60px);
  --y5: calc(${(props) => props.$pontosY[4]}vh - 60px);
  animation: ${fogoVertical} ${(props) => props.$duracao}s ease-in-out 1 both;
  animation-play-state: ${(props) => (props.$pausado ? 'paused' : 'running')};
`
