import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
    progress: number
    label?: string
    className?: string
}

export default function ProgressBar({ progress, label, className }: ProgressBarProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [displayProgress, setDisplayProgress] = useState(0)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setDisplayProgress(progress)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [isInView, progress])

    return (
        <div ref={ref} className={cn('w-full', className)}>
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                    <span className="text-sm font-mono text-mint-300">{progress}%</span>
                </div>
            )}
            <div className="h-2 bg-gray-200 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-mint-200 to-mint-300"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? `${displayProgress}%` : 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    )
}
