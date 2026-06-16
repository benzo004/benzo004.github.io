import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../SectionTitle'
import SkillTree from '../SkillTree'
import Flag from '../ui/Flag'

const languages: { nameKey: string; levelKey: string; flag: 'fr' | 'gb' | 'ru' | 'ua' | 'es' }[] = [
    { nameKey: 'about.lang.fr', levelKey: 'about.level.native', flag: 'fr' },
    { nameKey: 'about.lang.en', levelKey: 'about.level.advanced', flag: 'gb' },
    { nameKey: 'about.lang.ru', levelKey: 'about.level.native', flag: 'ru' },
    { nameKey: 'about.lang.uk', levelKey: 'about.level.native', flag: 'ua' },
    { nameKey: 'about.lang.es', levelKey: 'about.level.elementary', flag: 'es' },
]

export default function ToolboxSection() {
    const { t } = useLanguage()

    return (
        <section id="skills" className="section-spacing border-b border-border">
            <div className="container-minimal">
                <SectionTitle className="mb-12 sm:mb-16 md:mb-20">
                    {t('tools.header')}
                </SectionTitle>

                <div className="space-y-16 sm:space-y-24">
                    {/* Skills — hierarchical tree: category → skill → sub-skill */}
                    <SkillTree />

                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="pt-12 sm:pt-16 border-t border-border/60"
                    >
                        <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary/60 uppercase mb-6 sm:mb-8 flex items-center gap-3">
                            <span className="w-6 sm:w-8 h-px bg-accent/30" />
                            {t('about.lang')}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {languages.map((lang) => (
                                <div
                                    key={lang.nameKey}
                                    className="flex justify-between items-center gap-3 p-4 sm:p-5 rounded-xl border border-border/60 bg-background hover:bg-white transition-colors duration-300 group"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="w-8 h-6 shrink-0 rounded overflow-hidden border border-border">
                                            <Flag code={lang.flag} className="w-full h-full" />
                                        </span>
                                        <span className="text-sm text-primary font-clash font-semibold truncate">
                                            {t(lang.nameKey)}
                                        </span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-secondary/70 whitespace-nowrap shrink-0">
                                        {t(lang.levelKey)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
