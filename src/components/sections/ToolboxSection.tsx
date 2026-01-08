import { motion } from 'framer-motion'
import toolsData from '@/data/tools.json'
import { useLanguage } from '../../contexts/LanguageContext'
import ScrollFloat from '../ScrollFloat'

interface Tool {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface ToolCategory {
    name: {
        fr: string;
        en: string;
    };
    tools: Tool[];
}

const languages = [
    { nameKey: 'about.lang.fr', levelKey: 'about.level.native', flag: '🇫🇷' },
    { nameKey: 'about.lang.en', levelKey: 'about.level.advanced', flag: '🇬🇧' },
    { nameKey: 'about.lang.ru', levelKey: 'about.level.native', flag: '🇷🇺' },
    { nameKey: 'about.lang.uk', levelKey: 'about.level.native', flag: '🇺🇦' },
    { nameKey: 'about.lang.es', levelKey: 'about.level.intermediate', flag: '🇪🇸' },
]

export default function ToolboxSection() {
    const { t, language } = useLanguage()

    return (
        <section id="skills" className="section-spacing border-b border-gray-200">
            <div className="container-minimal">
                {/* Section title */}
                <ScrollFloat
                    containerClassName="text-section mb-20"
                >
                    {t('tools.header')}
                </ScrollFloat>

                <div className="space-y-24">
                    {/* Tools Categories */}
                    <div className="space-y-16">
                        {(toolsData.categories as ToolCategory[]).map((category: ToolCategory, catIndex: number) => (
                            <motion.div
                                key={category.name.fr}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                            >
                                <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary/60 uppercase mb-8 flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-accent/20"></span>
                                    {category.name[language as 'fr' | 'en']}
                                </h4>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {category.tools.map((tool: Tool, index: number) => (
                                        <motion.div
                                            key={tool.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.05 * index, duration: 0.4 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/50 border border-border/50 hover:border-accent/30 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group cursor-default"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent group-hover:scale-150 transition-all duration-500 mb-2" />
                                            <span className="text-sm font-clash font-semibold text-secondary group-hover:text-primary transition-colors duration-300 text-center">
                                                {tool.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Languages Divider & Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="pt-16 border-t border-border/50"
                    >
                        <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary/60 uppercase mb-12 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-accent/20"></span>
                            {t('about.lang')}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {languages.map((lang, index) => (
                                <motion.div
                                    key={lang.nameKey}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex justify-between items-center p-6 rounded-2xl bg-white/30 border border-border/30 hover:border-accent/20 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-500">{lang.flag}</span>
                                        <span className="text-primary font-clash font-semibold group-hover:text-accent transition-colors">
                                            {t(lang.nameKey)}
                                        </span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-secondary/60 px-3 py-1 bg-highlight/30 rounded-full border border-border/20">
                                        {t(lang.levelKey)}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
