import { motion } from 'framer-motion'
import certificationsData from '@/data/certifications.json'
import { useLanguage } from '../../contexts/LanguageContext'
import ScrollFloat from '../ScrollFloat'

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
        <section id="certifications" className="section-spacing border-b border-gray-200">
            <div className="container-minimal">
                {/* Section title */}
                <ScrollFloat
                    containerClassName="text-section mb-20"
                >
                    {t('certifications.header')}
                </ScrollFloat>

                <div className="space-y-8">
                    {certificationsData.certifications.map((cert: Certification, index: number) => (
                        <motion.div
                            key={cert.id}
                            className="flex items-start gap-6 pb-8 border-b border-gray-100 last:border-0"
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
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="text-lg font-clash font-semibold text-primary mb-1">
                                            {cert.name}
                                        </h3>
                                        <p className="text-sm text-secondary italic">
                                            {cert.issuer}
                                        </p>
                                    </div>
                                    <div className="text-right">
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
