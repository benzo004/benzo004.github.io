import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import ShinyText from '../ShinyText'

interface ProgressNavProps {
    onHireMeClick?: () => void;
    showNav?: boolean;
    showHireMe?: boolean;
    showLanguages?: boolean;
    dimmed?: boolean;
    hidden?: boolean;
}

export default function ProgressNav({
    onHireMeClick,
    showNav = true,
    showHireMe = true,
    showLanguages = true,
    dimmed = false,
    hidden = false
}: ProgressNavProps) {
    const { t } = useLanguage()
    const [activeSection, setActiveSection] = useState('')

    const navOpacity = dimmed ? 0.05 : 1
    const navInteractionClass = (dimmed || hidden) ? 'pointer-events-none' : 'pointer-events-auto'
    const fadeClass = 'transition-opacity duration-1000 ease-out'

    const sectionIds = ['experiences', 'projects', 'certifications', 'education', 'skills']

    const sections = [
        { id: 'experiences', name: t('section.experiences') },
        { id: 'projects', name: t('section.projects') },
        { id: 'certifications', name: t('certifications.header') },
        { id: 'education', name: t('education.header') },
        { id: 'skills', name: t('tools.header') },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const activationY = window.innerHeight * 0.35
            let activeId = sectionIds[0]
            let bestTop = -Infinity

            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (!el) continue

                const top = el.getBoundingClientRect().top
                if (top <= activationY && top > bestTop) {
                    bestTop = top
                    activeId = id
                }
            }

            setActiveSection(activeId)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // Calculate vertical offset to center active section
    const activeIndex = sections.findIndex(s => s.id === activeSection)
    const itemHeight = 80 // Height of each item in pixels

    // Determine opacity based on distance from active element
    const getOpacity = (index: number): number => {
        if (activeIndex < 0) return 0.5
        const distance = Math.abs(index - activeIndex)
        if (distance === 0) return 1.0
        if (distance === 1) return 0.35
        if (distance === 2) return 0.15
        return 0.05
    }

    return (
        <>
            {/* Top bar removed per request */}

            {/* Bottom Left Static Area: Language Switcher (always visible) */}
            <div
                className={`fixed bottom-4 md:bottom-8 left-4 md:left-10 flex flex-col items-start gap-2 md:gap-3 z-50 pointer-events-auto`}
            >
                {showHireMe && (
                    <button
                        onClick={() => onHireMeClick ? onHireMeClick() : scrollToSection('footer')}
                        className="text-left bg-transparent border-none p-0 cursor-pointer"
                    >
                        <ShinyText
                            text="Hire me"
                            disabled={false}
                            speed={3}
                            delay={0}
                            color="#1B365D"
                            shineColor="#ffffff"
                            spread={120}
                            direction="left"
                            yoyo={false}
                            pauseOnHover={false}
                            className="font-serif text-lg md:text-2xl italic"
                        />
                    </button>
                )}

                {/* Language Switcher - Horizontal */}
                {showLanguages && (
                    <Link to="#" className="flex gap-2" onClick={(e) => e.preventDefault()}>
                        <LanguageSwitcher />
                    </Link>
                )}
            </div>

            {/* Vertical Progress Navigation - Dots/Labels */}
            {showNav && (
                <nav
                    className={`fixed left-8 top-0 bottom-0 z-40 hidden min-[1401px]:flex flex-col justify-center w-48 pointer-events-none ${fadeClass}`}
                    style={{ opacity: hidden ? 0 : navOpacity }}
                >

                    {/* Dynamic List Container - Centered */}
                    <div className={`relative h-20 w-full ${navInteractionClass}`}>
                        <div
                            className="absolute left-0 top-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{
                                // Perfectly align the center of the active item (itemHeight/2) with the center of the container (h-20/2 = 40px)
                                transform: `translateY(${-activeIndex * itemHeight}px)`
                            }}
                        >
                            {sections.map((section, index) => {
                                const isActive = activeSection === section.id
                                const isPassed = sections.findIndex(s => s.id === activeSection) > index
                                const opacity = getOpacity(index)

                                return (
                                    <motion.div
                                        key={section.id}
                                        className="relative flex items-center"
                                        style={{ height: `${itemHeight}px` }}
                                        animate={{ opacity }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className="group flex items-center gap-6 transition-all duration-500 w-full text-left pointer-events-auto"
                                            aria-label={`Navigate to ${section.name}`}
                                        >
                                            {/* Progress dot */}
                                            <div className="relative flex items-center justify-center w-6">
                                                <motion.div
                                                    layout
                                                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${isActive
                                                        ? 'border-accent bg-accent'
                                                        : isPassed
                                                            ? 'border-accent bg-accent'
                                                            : 'border-secondary/30 bg-background group-hover:border-accent/50'
                                                        }`}
                                                    animate={{
                                                        scale: isActive ? 1.4 : 1,
                                                        boxShadow: isActive ? '0 0 15px rgba(27, 54, 93, 0.3)' : 'none'
                                                    }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                />
                                                {/* Connecting line */}
                                                {index < sections.length - 1 && (
                                                    <div
                                                        className={`absolute top-6 left-1/2 -translate-x-1/2 w-px transition-all duration-500 ${isPassed ? 'bg-accent' : 'bg-secondary/10'
                                                            }`}
                                                        style={{ height: `${itemHeight - 12}px` }}
                                                    />
                                                )}
                                            </div>

                                            {/* Section label */}
                                            <AnimatePresence>
                                                {(isActive || opacity > 0.3) && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className={`font-medium whitespace-nowrap transition-all duration-500 ${isActive
                                                            ? 'text-lg text-accent'
                                                            : 'text-sm text-secondary'
                                                            }`}
                                                    >
                                                        {section.name}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}
