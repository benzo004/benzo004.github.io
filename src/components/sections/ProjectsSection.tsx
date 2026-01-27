import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import { useLanguage } from '../../contexts/LanguageContext'
import projectsData from '@/data/projects.json'
import ScrollFloat from '../ScrollFloat'

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

    if (lower.includes('lab-network-update.png')) return labNetworkUpdateImg
    if (lower.includes('pentest-silverhand.png')) return pentestSilverhandImg
    if (lower.includes('osint-intelligence-update.png')) return osintIntelligenceUpdateImg

    return undefined
}

export default function ProjectsSection() {
    const { language, t } = useLanguage()

    return (
        <section id="projects" className="bg-background">
            <ScrollStack
                stackPosition="12vh"
                itemScale={0.05}
                itemStackDistance={25}
                useWindowScroll={true}
                header={
                    <ScrollFloat
                        containerClassName="text-section mb-0 flex items-center justify-center gap-4"
                        textClassName="flex items-center gap-4"
                    >
                        {t('section.projects')}
                    </ScrollFloat>
                }
            >
                {projectsData.projects.map((project: Project) => (
                    <ScrollStackItem key={project.id} itemClassName="bg-background border border-border h-auto min-h-[500px] flex flex-col lg:flex-row gap-8 items-stretch !p-8 lg:!p-12">
                        {/* Image du projet */}
                        {project.image && (
                            <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden rounded-subtle bg-gray-100 flex-shrink-0">
                                <img
                                    src={resolveProjectImage(project) ?? project.image}
                                    alt={project.title[language as 'fr' | 'en']}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Contenu */}
                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-3xl font-clash font-semibold text-primary mb-3">
                                {project.title[language as 'fr' | 'en']}
                            </h3>
                            <p className="text-sm font-mono text-accent mb-6 uppercase tracking-widest font-semibold">
                                {project.type}
                            </p>
                            <div className="prose prose-sm text-secondary leading-relaxed mb-8 max-w-4xl">
                                <p className="whitespace-pre-line text-lg text-justify md:text-left">
                                    {project.description[language as 'fr' | 'en']}
                                </p>
                            </div>

                            {/* Technologies - badges discrets */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 text-secondary text-xs font-mono rounded-full border border-gray-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {project.link && project.link !== '#' && (
                                <div className="mt-8">
                                    <a
                                        href={project.link}
                                        className="text-sm font-medium text-primary hover:text-accent transition-colors duration-400 flex items-center gap-2 group"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {t('nav.discover')} <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    )
}
