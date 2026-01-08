import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
    children: React.ReactNode
    count?: number
    className?: string
}

export default function SectionTitle({ children, count, className }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn('mb-12 md:mb-16', className)}
        >
            <h1 className="text-section text-editorial flex items-baseline gap-4">
                {children}
                {count !== undefined && (
                    <span className="text-2xl md:text-4xl text-gray-500 font-mono">
                        ({count})
                    </span>
                )}
            </h1>
        </motion.div>
    )
}
