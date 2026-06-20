import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import projectsData from '@/data/projects.json'
import SectionTitle from '../SectionTitle'

import pdrCockpitImg from '@/assets/images/01-planification-carte.webp'
import labNetworkUpdateImg from '@/assets/images/lab-network-update.png'
import pentestSilverhandImg from '@/assets/images/pentest-silverhand.png'
import osintIntelligenceUpdateImg from '@/assets/images/osint-intelligence-update.png'

interface Project {
    id: string;
    title: {
        fr: string;
        en: string;
    };
    type: string;
    description: {
        fr: string;
        en: string;
    };
    tags: string[];
    link: string;
    image?: string;
}

function resolveProjectImage(project: Project): string | undefined {
    if (!project.image) return undefined

    const lower = project.image.toLowerCase()

    if (lower.includes('01-planification-carte.webp')) return pdrCockpitImg
    if (lower.includes('lab-network-update.png')) return labNetworkUpdateImg
    if (lower.includes('pentest-silverhand.png')) return pentestSilverhandImg
    if (lower.includes('osint-intelligence-update.png')) return osintIntelligenceUpdateImg

    return undefined
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
    const { language, t } = useLanguage()

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
            {/* Image */}
            {project.image && (
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <div className="overflow-hidden rounded-2xl border border-border bg-gray-100 aspect-[16/10]">
                        <img
                            src={resolveProjectImage(project) ?? project.image}
                            alt={project.title[language as 'fr' | 'en']}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className={project.image ? 'lg:col-span-5' : 'lg:col-span-12'}>
                <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] font-semibold mb-3">
                    {project.type}
                </p>
                <h3 className="font-clash font-semibold text-primary text-2xl sm:text-3xl leading-tight mb-4">
                    {project.title[language as 'fr' | 'en']}
                </h3>
                <p className="text-secondary text-sm sm:text-base leading-relaxed whitespace-pre-line mb-6">
                    {project.description[language as 'fr' | 'en']}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/60 text-secondary text-[11px] font-mono rounded-full border border-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {project.link && project.link !== '#' && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
                    >
                        {t('nav.discover')}
                        <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </a>
                )}
            </div>
        </motion.article>
    )
}

export default function ProjectsSection() {
    const { t } = useLanguage()

    return (
        <section id="projects" className="section-spacing bg-background">
            <div className="container-minimal">
                <SectionTitle className="mb-12 sm:mb-16 md:mb-20">
                    {t('section.projects')}
                </SectionTitle>

                <div className="space-y-16 sm:space-y-24 md:space-y-32">
                    {projectsData.projects.map((project: Project, index: number) => (
                        <ProjectRow key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
