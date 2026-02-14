import { motion } from 'framer-motion'
import certificationsData from '@/data/certifications.json'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../SectionTitle'

interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: {
        fr: string;
        en: string;
    };
    status: string;
    verifyUrl: string;
}

export default function CertificationsSection() {
    const { t, language } = useLanguage()

    return (
        <section id="certifications" className="section-spacing border-t border-b border-border bg-background relative z-10">
            <div className="container-minimal">
                {/* Section title */}
                <SectionTitle className="mb-12 sm:mb-16 md:mb-20">
                    {t('certifications.header')}
                </SectionTitle>

                <div className="space-y-8">
                    {certificationsData.certifications.map((cert: Certification, index: number) => (
                        <motion.div
                            key={cert.id}
                            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pb-8 border-b border-gray-100 last:border-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 bg-highlight rounded-full flex items-center justify-center">
                                <span className="text-2xl">🛡️</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                                    <div className="flex-1">
                                        <h3 className="text-base sm:text-lg font-clash font-semibold text-primary mb-1">
                                            {cert.name}
                                        </h3>
                                        <p className="text-sm text-secondary italic">
                                            {cert.issuer}
                                        </p>
                                    </div>
                                    <div className="sm:text-right">
                                        {cert.status === 'in-progress' && (
                                            <p className="text-xs text-secondary mb-1">
                                                {t('certifications.expectedFor')}
                                            </p>
                                        )}
                                        <span className="text-sm text-secondary whitespace-nowrap">
                                            {cert.date[language as 'fr' | 'en']}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-3">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${cert.status === 'completed'
                                        ? 'bg-green-100 text-green-600 border border-green-200'
                                        : 'bg-orange-100 text-orange-600 border border-orange-200'
                                        }`}>
                                        {cert.status === 'completed' ? t('certifications.completed') : t('certifications.inProgress')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
