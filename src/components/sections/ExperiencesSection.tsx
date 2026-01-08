import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import experiencesData from '@/data/experiences.json'
import ScrollFloat from '../ScrollFloat'

interface Experience {
    id: string;
    company: string;
    position: {
        fr: string;
        en: string;
    };
    period: string;
    category: string;
    description: {
        fr: string;
        en: string;
    };
    companyUrl?: string;
    tags: string[];
}

const LinkedInIcon = () => (
    <svg className="w-4 h-4 text-blue-600 inline-block ml-2 mb-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
)

const InstagramIcon = () => (
    <svg className="w-4 h-4 text-pink-600 inline-block ml-2 mb-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
)

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    })
}

function formatPeriod(period: string, language: 'fr' | 'en'): string {
    if (language !== 'en') return period

    const replacements: Array<[RegExp, string]> = [
        [/\bPrésent\b/gi, 'Present'],
        [/\bJanv\b\.?/gi, 'Jan'],
        [/\bJanvier\b/gi, 'January'],
        [/\bFévr\b\.?/gi, 'Feb'],
        [/\bFévrier\b/gi, 'February'],
        [/\bMars\b/gi, 'March'],
        [/\bAvr\b\.?/gi, 'Apr'],
        [/\bAvril\b/gi, 'April'],
        [/\bMai\b/gi, 'May'],
        [/\bJuin\b/gi, 'June'],
        [/\bJuil\b\.?/gi, 'Jul'],
        [/\bJuillet\b/gi, 'July'],
        [/\bAoût\b/gi, 'August'],
        [/\bSept\b\.?/gi, 'Sep'],
        [/\bSeptembre\b/gi, 'September'],
        [/\bOct\b\.?/gi, 'Oct'],
        [/\bOctobre\b/gi, 'October'],
        [/\bNov\b\.?/gi, 'Nov'],
        [/\bNovembre\b/gi, 'November'],
        [/\bDéc\b\.?/gi, 'Dec'],
        [/\bDécembre\b/gi, 'December'],
    ]

    return replacements.reduce((acc, [re, val]) => acc.replace(re, val), period)
}

function formatCompany(company: string, language: 'fr' | 'en'): string {
    if (language !== 'en') return company
    if (company === 'Indépendant') return 'Freelance'
    return company
}

export default function ExperiencesSection() {
    const { language, t } = useLanguage()
    // We'll use internal keys for state but display translated versions
    const internalFilters = ['Cybersécurité', 'Autre', 'Tout']
    const [activeFilter, setActiveFilter] = useState('Cybersécurité') // State holds internal key

    // Map internal filter name to display name
    const filterMap: Record<string, string> = {
        'Cybersécurité': t('filter.cyber'),
        'Autre': t('filter.other'),
        'Tout': t('filter.all')
    }

    // Effect to update active filter when language changes if it's one of the translations
    // This is a bit tricky, let's just use untranslated internal state for filtering
    // and translate only for display. No need for useEffect here if state is internal keys.

    // Filter experiences based on category
    const filteredExperiences = (experiencesData.experiences as any[]).filter((exp: any) => {
        if (activeFilter === 'Tout') return true
        return exp.category === activeFilter
    })

    return (
        <section id="experiences" className="section-spacing border-b border-gray-200">
            <div className="container-minimal">
                {/* Section title */}
                <ScrollFloat
                    containerClassName="text-section mb-20"
                >
                    {t('section.experiences')}
                </ScrollFloat>

                {/* Filter tabs */}
                <div className="flex gap-4 mb-16 border-b border-gray-200">
                    {internalFilters.map((filterKey) => (
                        <button
                            key={filterKey}
                            onClick={() => setActiveFilter(filterKey)}
                            className={`px-6 py-2 text-sm font-medium transition-all duration-400 border-b-2 ${activeFilter === filterKey
                                ? 'border-accent text-accent'
                                : 'border-transparent text-secondary hover:text-primary'
                                }`}
                        >
                            {filterMap[filterKey]}
                        </button>
                    ))}
                </div>

                {/* Timeline verticale - Style Oura Biometrics */}
                <div className="relative space-y-16 md:space-y-24">
                    {/* Vertical line through dots */}
                    <div className="absolute left-[7px] md:left-[247px] top-2 bottom-2 w-px bg-secondary/10" />

                    {filteredExperiences.map((exp: Experience, index: number) => (
                        <motion.div
                            key={exp.id}
                            custom={index}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative grid md:grid-cols-[240px_1fr] gap-8 md:gap-16 group"
                        >
                            {/* Timeline marker/dot - Perfectly aligned with the baseline of the first line header */}
                            <div className="absolute left-0 md:left-[240px] top-3 flex items-center justify-center w-[15px] h-[15px] bg-background border border-accent rounded-full z-10 transition-transform duration-500 group-hover:scale-125">
                                <motion.div
                                    className="w-1.5 h-1.5 bg-accent rounded-full"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 + 0.3 }}
                                />
                            </div>

                            {/* Date - gauche */}
                            <div className="pl-8 md:pl-0 md:pr-8 text-secondary font-medium md:text-right mt-1.5 whitespace-nowrap">
                                {formatPeriod(exp.period, language)}
                            </div>

                            {/* Contenu - droite */}
                            <div className="pl-8 md:pl-0">
                                <h3 className="text-2xl font-clash font-semibold text-primary mb-2 transition-colors duration-400 group-hover:text-accent">
                                    {exp.companyUrl ? (
                                        <a
                                            href={exp.companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-colors flex items-center gap-1"
                                        >
                                            {exp.company}
                                            {exp.companyUrl.includes('instagram.com') ? <InstagramIcon /> : <LinkedInIcon />}
                                        </a>
                                    ) : (
                                        formatCompany(exp.company, language)
                                    )}
                                </h3>
                                <p className="text-lg text-secondary/80 mb-4 font-serif italic group-hover:text-accent/80 transition-colors duration-400">
                                    {exp.position[language as 'fr' | 'en']}
                                </p>
                                <p className="text-secondary leading-relaxed mb-6 max-w-2xl whitespace-pre-line text-justify md:text-left">
                                    {exp.description[language as 'fr' | 'en']}
                                </p>

                                {/* Tags discrets */}
                                {exp.tags && exp.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] uppercase tracking-widest text-secondary px-3 py-1 border border-background bg-highlight/30 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final spacer instead of counter if preferred, but user said "affichent toutes" */}
                <div className="h-16" />
            </div>
        </section>
    )
}
