import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollFloat from './ScrollFloat'

interface SectionTitleProps {
    children: string;
    className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) {
        // Simple animated title for mobile
        const chars = children.split('')
        return (
            <h2 key={children} className={`text-section ${className}`}>
                {chars.map((char, i) => (
                    <motion.span
                        key={`${char}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="inline-block"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </h2>
        )
    }

    // ScrollFloat for desktop
    return (
        <ScrollFloat containerClassName={`text-section ${className}`}>
            {children}
        </ScrollFloat>
    )
}
