import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'

const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
}

const ctaVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: 0.4 }
    }
}

export default function LandingPage() {
    const { t } = useLanguage()

    return (
        <main className="min-h-screen flex flex-col bg-background">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="container-minimal py-6 flex items-center justify-between">
                    {/* Logo/Name - discret */}
                    <Link to="/" className="text-sm font-medium text-primary hover:text-accent transition-colors duration-400">
                        Andrii Z.
                    </Link>

                    {/* Social links & Language switcher */}
                    <div className="flex items-center gap-6">
                        <LanguageSwitcher />

                        <div className="hidden md:flex items-center gap-6 border-l border-gray-200 pl-6">
                            <a
                                href="https://www.linkedin.com/in/andriiz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-accent transition-colors duration-400"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/benzo004"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-accent transition-colors duration-400"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:contact@andrii-z.com"
                                className="text-secondary hover:text-accent transition-colors duration-400"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - 70% white space */}
            <section className="flex-1 flex items-center justify-center px-6 md:px-20 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Phrase d'accroche centrale - style Oura/Tekiyo */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl text-primary mb-8 leading-tight font-medium">
                            {t('hero.title.1')}<br />
                            {t('hero.title.2')} <span className="text-accent italic">{t('hero.title.accent')}</span>
                        </h1>

                        <p className="text-body text-secondary max-w-2xl mx-auto leading-relaxed mb-16">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>

                    {/* Pearl CTA - centré en bas */}
                    <motion.div
                        variants={ctaVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Link
                            to="/portfolio"
                            className="pearl-button"
                        >
                            <div className="wrap">
                                <p>
                                    <span>✧</span>
                                    <span>✦</span>
                                    {t('nav.discover')}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
