import { motion } from 'framer-motion'
import toolsData from '@/data/tools.json'
import { useLanguage } from '../contexts/LanguageContext'

type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert'

interface Tool {
    name: string;
    level: Level;
}

interface ToolCategory {
    name: { fr: string; en: string };
    tools: Tool[];
}

// "Firewalling (Stormshield, pfSense)" -> { label, children: [...] }
function parseTool(name: string): { label: string; children: string[] } {
    const m = name.match(/^(.*?)\s*\((.*)\)\s*$/)
    if (!m) return { label: name.trim(), children: [] }
    return { label: m[1].trim(), children: m[2].split(',').map(s => s.trim()).filter(Boolean) }
}

// Mastery cue, encoded subtly in the skill's dot.
function dotClass(level: Level): string {
    if (level === 'advanced' || level === 'expert') return 'bg-accent'
    if (level === 'intermediate') return 'bg-accent/50'
    return 'border border-accent bg-transparent'
}

export default function SkillTree() {
    const { language } = useLanguage()
    const categories = toolsData.categories as ToolCategory[]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16">
            {categories.map((category, ci) => (
                <motion.div
                    key={category.name.fr}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: ci * 0.1, duration: 0.6 }}
                >
                    {/* Level 1 — category */}
                    <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary/60 uppercase mb-6 sm:mb-8 flex items-center gap-3">
                        <span className="w-6 sm:w-8 h-px bg-accent/30" />
                        {category.name[language as 'fr' | 'en']}
                    </h4>

                    {/* Level 2 — skills */}
                    <ul className="space-y-5">
                        {category.tools.map((tool) => {
                            const { label, children } = parseTool(tool.name)
                            return (
                                <li key={tool.name}>
                                    <div className="flex items-center gap-2.5">
                                        <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass(tool.level)}`} />
                                        <span className="font-clash font-semibold text-sm sm:text-[15px] text-primary leading-snug">
                                            {label}
                                        </span>
                                    </div>

                                    {/* Level 3 — sub-skills */}
                                    {children.length > 0 && (
                                        <ul className="mt-2 ml-[3px] pl-4 border-l border-accent/15 space-y-1.5">
                                            {children.map((child) => (
                                                <li
                                                    key={child}
                                                    className="relative text-xs text-secondary/70 font-clash before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-2.5 before:h-px before:bg-accent/20"
                                                >
                                                    {child}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </motion.div>
            ))}
        </div>
    )
}
