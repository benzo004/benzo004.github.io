import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                'bg-white border border-gray-200 p-6 md:p-8',
                hover && 'card-hover cursor-pointer',
                className
            )}
        >
            {children}
        </motion.div>
    )
}
