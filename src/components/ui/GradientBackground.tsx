import { useEffect, useState } from 'react'

interface Orb {
    id: number
    x: number
    y: number
    size: number
    color: string
    duration: number
}

export default function GradientBackground() {
    const [orbs] = useState<Orb[]>([
        { id: 1, x: 10, y: 10, size: 600, color: 'rgba(0, 245, 255, 0.15)', duration: 20 },
        { id: 2, x: 90, y: 20, size: 500, color: 'rgba(255, 0, 255, 0.15)', duration: 25 },
        { id: 3, x: 80, y: 80, size: 550, color: 'rgba(0, 255, 136, 0.15)', duration: 22 },
        { id: 4, x: 20, y: 70, size: 450, color: 'rgba(176, 0, 255, 0.15)', duration: 18 },
    ])

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base gradient mesh */}
            <div className="absolute inset-0 bg-mesh-1" />

            {/* Floating orbs */}
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    className="absolute rounded-full blur-3xl opacity-70 animate-float"
                    style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        background: orb.color,
                        transform: `translate(-50%, -50%)`,
                        animationDuration: `${orb.duration}s`,
                        animationDelay: `${orb.id * 2}s`,
                    }}
                />
            ))}

            {/* Mouse-following gradient */}
            <div
                className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000 ease-out"
                style={{
                    left: `${mousePosition.x}%`,
                    top: `${mousePosition.y}%`,
                    background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Noise texture overlay for depth */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}
