import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import DecryptedText from '../DecryptedText'

export default function Footer({ onBackToTop }: { onBackToTop?: () => void }) {
    const { t, language } = useLanguage()
    const footerRef = useRef(null)
    const isInView = useInView(footerRef, { amount: 0.2 })
    const currentYear = new Date().getFullYear()
    const [copied, setCopied] = useState(false)

    const email = 'withandrii@proton.me'
    const footerCredit = `${currentYear} — ANDRII`

    const handleCopy = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
    }

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [copied])

    const socialLinks = [
        { name: 'HACKTHEBOX', url: 'https://app.hackthebox.com/users/2224924' },
        { name: 'TRYHACKME', url: 'https://tryhackme.com/p/benzo004' },
        { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/andriiz/' },
        { name: 'GITHUB', url: 'https://github.com/benzo004' }
    ]

    // Calculate speed for synchronized end (~1.5s duration)
    const getSyncSpeed = (text: string) => Math.max(20, Math.floor(1500 / (text.length || 1)))

    return (
        <footer
            id="footer"
            ref={footerRef}
            className="w-full bg-background text-foreground py-20 px-10 md:px-16 font-mono border-t border-border"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Left Side: Message */}
                <div className="flex flex-col gap-6 max-w-md">
                    <p className="text-lg md:text-xl leading-snug">
                        <DecryptedText
                            key={`msg1-${language}`}
                            text={t('footer.message.1')}
                            isTriggered={isInView}
                            sequential={true}
                            speed={getSyncSpeed(t('footer.message.1'))}
                        />
                    </p>
                    <p className="text-lg md:text-xl leading-snug">
                        {(() => {
                            const p1 = t('footer.message.3')
                            const p2 = t('footer.contact')
                            const p3 = t('footer.build')

                            const totalLen = p1.length + p2.length + p3.length
                            const delay2 = Math.floor(1500 * (p1.length / totalLen))
                            const delay3 = Math.floor(1500 * ((p1.length + p2.length) / totalLen))

                            const s1 = getSyncSpeed(p1)
                            const s2 = Math.max(20, Math.floor((1500 - delay2) / (p2.length || 1)))
                            const s3 = Math.max(20, Math.floor((1500 - delay3) / (p3.length || 1)))

                            return (
                                <>
                                    <DecryptedText
                                        key={`p1-${language}`}
                                        text={p1}
                                        isTriggered={isInView}
                                        sequential={true}
                                        speed={s1}
                                    />{' '}
                                    <a href={`mailto:${email}`} className="underline underline-offset-4 inline-block">
                                        <DecryptedText
                                            key={`p2-${language}`}
                                            text={p2}
                                            isTriggered={isInView}
                                            sequential={true}
                                            speed={s2}
                                            delay={delay2}
                                        />
                                    </a>{' '}
                                    <DecryptedText
                                        key={`p3-${language}`}
                                        text={p3}
                                        isTriggered={isInView}
                                        sequential={true}
                                        speed={s3}
                                        delay={delay3}
                                    />
                                </>
                            )
                        })()}
                    </p>

                    {/* Click to Copy Email (Static) */}
                    <div className="mt-4">
                        <button
                            onClick={handleCopy}
                            className={`invert-hover transition-all duration-200 uppercase text-lg md:text-xl leading-none ${copied ? 'text-accent' : ''}`}
                        >
                            {copied ? t('footer.copied') : email}
                        </button>
                    </div>
                </div>

                {/* Right Side: Social Links & Back to Top */}
                <div className="flex flex-col items-end gap-12">
                    <ul className="flex flex-col items-end gap-2">
                        {socialLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-clash font-bold text-2xl md:text-4xl tracking-tight transition-all duration-200 hover:skew-x-[-10deg] hover:opacity-70 inline-block"
                                >
                                    <DecryptedText
                                        key={`${link.name}-${language}`}
                                        text={link.name}
                                        isTriggered={isInView}
                                        sequential={true}
                                        speed={getSyncSpeed(link.name)}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Back to Home Button */}
                    <button
                        onClick={onBackToTop}
                        className="group flex flex-col items-end gap-1 transition-colors duration-300 mt-12"
                    >
                        <span className="font-clash font-bold text-xl md:text-2xl tracking-widest hover:text-accent transition-colors">
                            <DecryptedText
                                key={`backToTop-${language}`}
                                text={t('footer.backToTop')}
                                isTriggered={isInView}
                                sequential={true}
                                speed={getSyncSpeed(t('footer.backToTop'))}
                            />
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom Credit */}
            <div className="mt-20 text-center">
                <p className="text-sm opacity-60 uppercase tracking-widest">
                    <DecryptedText
                        key={`credit-${language}`}
                        text={footerCredit}
                        isTriggered={isInView}
                        sequential={true}
                        speed={getSyncSpeed(footerCredit)}
                    />
                </p>
            </div>
        </footer>
    )
}
