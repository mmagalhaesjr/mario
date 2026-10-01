import browser from '../assets/browser.gif'
import browser2 from '../assets/browser2.gif'

// O boss segue o céu: céu escuro = boss na tela, céu claro = boss fora
export function useBoss(ceuEscuro: boolean) {
    const visivel = ceuEscuro

    // entra com "browser" e sai com "browser2"
    const imagem = ceuEscuro ? browser : browser2

    return { visivel, imagem }
}