import { useEffect, useState } from 'react'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if device supports hover (desktop)
        const hasHover = window.matchMedia('(hover: hover)').matches
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!hasHover || prefersReducedMotion) {
            return
        }

        setIsVisible(true)

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseLeave = () => {
            setIsHovering(false)
        }

        // Mouse move
        window.addEventListener('mousemove', updatePosition)

        // Hover detection
        document.addEventListener('mouseover', handleMouseEnter)
        document.addEventListener('mouseout', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            document.removeEventListener('mouseover', handleMouseEnter)
            document.removeEventListener('mouseout', handleMouseLeave)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Cursor dot */}
            <div
                className="cursor-dot"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
                }}
            />

            {/* Cursor ring */}
            <div
                className="cursor-ring"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
                }}
            />
        </>
    )
}
