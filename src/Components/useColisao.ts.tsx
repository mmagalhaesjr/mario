import { useEffect, useRef, useState } from 'react'

export function useColisao(
    ref1: React.RefObject<HTMLElement>,
    ref2: React.RefObject<HTMLElement>,
    ativo: boolean,
    onColidir: () => void,
    fatorRaio = 0.4,
    debug = false
) {
    const frameRef = useRef<number>(0)
    const jaColidiuRef = useRef(false)
    const [debugInfo, setDebugInfo] = useState<{
        c1: { x: number; y: number; r: number }
        c2: { x: number; y: number; r: number }
    } | null>(null)

    useEffect(() => {
        if (!ativo) return

        const loop = () => {
            const el1 = ref1.current
            const el2 = ref2.current

            if (el1 && el2 && !jaColidiuRef.current) {
                const rect1 = el1.getBoundingClientRect()
                const rect2 = el2.getBoundingClientRect()

                const centro1X = rect1.left + rect1.width / 2
                const centro1Y = rect1.top + rect1.height / 2
                const centro2X = rect2.left + rect2.width / 2
                const centro2Y = rect2.top + rect2.height / 2

                const raio1 = Math.min(rect1.width, rect1.height) * fatorRaio
                const raio2 = Math.min(rect2.width, rect2.height) * fatorRaio

                if (debug) {
                    setDebugInfo({
                        c1: { x: centro1X, y: centro1Y, r: raio1 },
                        c2: { x: centro2X, y: centro2Y, r: raio2 },
                    })
                }

                const dx = centro1X - centro2X
                const dy = centro1Y - centro2Y
                const distancia = Math.sqrt(dx * dx + dy * dy)

                if (distancia < raio1 + raio2) {
                    jaColidiuRef.current = true
                    onColidir()
                    return
                }
            }

            frameRef.current = requestAnimationFrame(loop)
        }

        frameRef.current = requestAnimationFrame(loop)

        return () => cancelAnimationFrame(frameRef.current)
    }, [ativo, onColidir, ref1, ref2, fatorRaio, debug])

    return debugInfo
}