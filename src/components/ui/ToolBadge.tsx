import { cn } from '@/lib/utils'

interface ToolBadgeProps {
    name: string
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    className?: string
}

const levelColors = {
    beginner: 'bg-gray-100 text-gray-700 border-gray-300',
    intermediate: 'bg-mint-50 text-mint-800 border-mint-200',
    advanced: 'bg-mint-100 text-mint-900 border-mint-300',
    expert: 'bg-mint-200 text-black border-mint-400',
}

export default function ToolBadge({ name, level = 'intermediate', className }: ToolBadgeProps) {
    return (
        <div
            className={cn(
                'px-4 py-3 border text-center text-sm font-medium',
                'transition-all duration-300',
                'hover:scale-105 hover:shadow-md',
                levelColors[level],
                className
            )}
        >
            <div className="font-semibold">{name}</div>
            {level && (
                <div className="text-xs mt-1 opacity-70 capitalize">{level}</div>
            )}
        </div>
    )
}
