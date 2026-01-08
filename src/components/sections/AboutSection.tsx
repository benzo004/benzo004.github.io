import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import ScrollFloat from '../ScrollFloat'

const languages = [
    { nameKey: 'about.lang.fr', levelKey: 'about.level.native', flag: '🇫🇷' },
    { nameKey: 'about.lang.en', levelKey: 'about.level.advanced', flag: '🇬🇧' },
    { nameKey: 'about.lang.ru', levelKey: 'about.level.native', flag: '🇷🇺' },
    { nameKey: 'about.lang.uk', levelKey: 'about.level.native', flag: '🇺🇦' },
    { nameKey: 'about.lang.es', levelKey: 'about.level.intermediate', flag: '🇪🇸' },
]


export default function AboutSection() {
    const { t } = useLanguage()
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    const softSkills = [
        { name: t('about.teamwork'), description: t('about.teamwork.desc') },
        { name: t('about.determination'), description: t('about.determination.desc') },
        { name: t('about.autonomy'), description: t('about.autonomy.desc') },
    ]

    return (
        <section id="about" className="section-spacing" ref={containerRef}>
            <div className="container-minimal">
                {/* Section title */}
                <ScrollFloat
                    containerClassName="text-section mb-20"
                >
                    {t('section.about')}
                </ScrollFloat>

                {/* Soft Skills - 60% du contenu (Progressive Disclosure Style) */}
                <div className="mb-32">
                    <h3 className="text-xl font-medium text-primary mb-12">
                        {t('about.philosophy')}
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="p-8 bg-highlight/20 border border-highlight/30 rounded-medium hover:bg-highlight/30 transition-all duration-400"
                            >
                                <div className="w-8 h-8 mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                </div>
                                <h4 className="text-lg font-medium text-primary mb-3">
                                    {skill.name}
                                </h4>
                                <p className="text-secondary leading-relaxed text-sm">
                                    {skill.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Présentation personnelle - Central Narrative */}
                <motion.div
                    className="mb-32 bg-primary text-background p-12 md:p-20 rounded-medium relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Parallax Background Decorations */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none"
                    />
                    <motion.div
                        style={{ y: y2 }}
                        className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none"
                    />

                    <div className="max-w-3xl relative z-10">
                        <motion.h3
                            className="text-3xl font-medium mb-12"
                            style={{ opacity }}
                        >
                            {t('about.vision')}
                        </motion.h3>
                        <p className="text-xl leading-relaxed mb-8 opacity-90">
                            {t('about.vision.p1')}
                        </p>
                        <p className="text-xl leading-relaxed opacity-70">
                            {t('about.vision.p2')}
                        </p>
                    </div>
                </motion.div>

                {/* Langues - Bottom Layer */}
                <div className="max-w-xl mx-auto border-t border-highlight pt-20">
                    <h3 className="text-xl font-medium text-primary mb-12 text-center">
                        {t('about.lang')}
                    </h3>
                    <div className="space-y-6">
                        {languages.map((lang, index) => (
                            <motion.div
                                key={lang.nameKey}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex justify-between items-center group"
                            >
                                <div className="flex items-center gap-3 group">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="text-primary font-medium group-hover:text-accent transition-colors">
                                        {t(lang.nameKey)}
                                    </span>
                                </div>
                                <span className="text-sm text-secondary px-3 py-1 bg-highlight/50 rounded-full">
                                    {t(lang.levelKey)}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    )
}
