interface FlagProps {
    code: 'fr' | 'gb' | 'ru' | 'ua' | 'es';
    className?: string;
}

// Inline SVG flags — render identically on every OS (Windows has no flag-emoji font).
export default function Flag({ code, className = '' }: FlagProps) {
    const common = { className, preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true as const }

    switch (code) {
        case 'fr':
            return (
                <svg viewBox="0 0 3 2" {...common}>
                    <rect width="3" height="2" fill="#FFFFFF" />
                    <rect width="1" height="2" fill="#002654" />
                    <rect x="2" width="1" height="2" fill="#ED2939" />
                </svg>
            )
        case 'ru':
            return (
                <svg viewBox="0 0 3 3" {...common}>
                    <rect width="3" height="3" fill="#FFFFFF" />
                    <rect y="1" width="3" height="1" fill="#0039A6" />
                    <rect y="2" width="3" height="1" fill="#D52B1E" />
                </svg>
            )
        case 'ua':
            return (
                <svg viewBox="0 0 3 2" {...common}>
                    <rect width="3" height="1" fill="#0057B7" />
                    <rect y="1" width="3" height="1" fill="#FFD700" />
                </svg>
            )
        case 'es':
            return (
                <svg viewBox="0 0 3 2" {...common}>
                    <rect width="3" height="2" fill="#AA151B" />
                    <rect y="0.5" width="3" height="1" fill="#F1BF00" />
                </svg>
            )
        case 'gb':
            return (
                <svg viewBox="0 0 60 30" {...common}>
                    <rect width="60" height="30" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
                    <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
                    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
                </svg>
            )
        default:
            return null
    }
}
