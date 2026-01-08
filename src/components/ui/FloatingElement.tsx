import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    type?: 'float' | 'float-slow' | 'float-reverse'
}

export default function FloatingElement({
    children,
    className,
    delay = 0,
    duration = 6,
    type = 'float',
}: FloatingElementProps) {
    const animations = {
        float: {
            y: [0, -20, 0],
            rotate: [0, 5, 0],
        },
        'float-slow': {
            y: [0, -30, 0],
            x: [0, 10, 0],
        },
        'float-reverse': {
            y: [0, 20, 0],
            rotate: [0, -5, 0],
        },
    }

    return (
        <motion.div
            className={cn('will-change-transform', className)}
            animate={animations[type]}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    )
}
