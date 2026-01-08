import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

export default function PortfolioNav() {
    const { t } = useLanguage()
    const location = useLocation()
    const hash = location.hash

    const sections = [
        { name: t('section.experiences'), path: '/portfolio#experiences' },
        { name: t('section.projects'), path: '/portfolio#projects' },
        { name: t('section.certifications'), path: '/portfolio#certifications' },
        { name: t('section.about'), path: '/portfolio#about' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200">
            <div className="container-minimal py-4 flex items-center justify-between">
                {/* Logo - retour à la landing */}
                <Link
                    to="/"
                    className="text-sm font-medium text-primary hover:text-accent transition-colors duration-400"
                >
                    ← {t('nav.back')}
                </Link>

                {/* Navigation sections */}
                <ul className="hidden md:flex items-center gap-8">
                    {sections.map((section) => {
                        const isActive = hash === section.path.split('#')[1] ? `#${section.path.split('#')[1]}` : ''
                        return (
                            <li key={section.path}>
                                <a
                                    href={section.path}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-400 relative',
                                        isActive ? 'text-accent' : 'text-secondary hover:text-accent'
                                    )}
                                >
                                    {section.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <div className="flex items-center gap-6">
                    <LanguageSwitcher />

                    {/* Mobile menu button */}
                    <button className="md:hidden p-2">
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <div className="w-5 h-px bg-primary" />
                            <div className="w-5 h-px bg-primary" />
                            <div className="w-5 h-px bg-primary" />
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}
