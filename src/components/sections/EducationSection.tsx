import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import ScrollFloat from '../ScrollFloat'

export default function EducationSection() {
    const { t } = useLanguage()

    const educationItems = [
        {
            degree: 'Bachelor Network Admin, Security Expert (RNCP 6)',
            school: 'Guardia Cybersecurity School',
            year: '2027'
        },
        {
            degree: 'MSc Cybersecurity Expert (RNCP 7)',
            school: 'Guardia Cybersecurity School',
            year: '2029'
        }
    ]

    return (
        <section id="education" className="section-spacing border-b border-gray-200">
            <div className="container-minimal">
                <ScrollFloat containerClassName="text-section mb-20">
                    {t('education.header')}
                </ScrollFloat>

                <div className="space-y-8">
                    {educationItems.map((edu, index) => (
                        <motion.div
                            key={edu.degree}
                            className="flex items-start gap-6 pb-8 border-b border-gray-100 last:border-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-highlight rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎓</span>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="text-lg font-clash font-semibold text-primary mb-1">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-sm text-secondary italic">{edu.school}</p>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-sm text-secondary whitespace-nowrap">{edu.year}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
