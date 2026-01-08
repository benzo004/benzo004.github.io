import { cn } from '@/lib/utils'

interface FilterTabsProps {
    options: string[]
    activeFilter: string
    onFilterChange: (filter: string) => void
    className?: string
}

export default function FilterTabs({ options, activeFilter, onFilterChange, className }: FilterTabsProps) {
    return (
        <div className={cn('flex flex-wrap gap-3 md:gap-4 mb-12', className)}>
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onFilterChange(option)}
                    className={cn(
                        'px-6 py-2.5 text-sm uppercase tracking-widest font-medium',
                        'border transition-all duration-300',
                        'hover:border-mint-300 hover:text-mint-300',
                        activeFilter === option
                            ? 'border-mint-300 text-mint-300 bg-mint-50'
                            : 'border-gray-300 text-gray-800'
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}
