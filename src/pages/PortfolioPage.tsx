import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProgressNav from '@/components/layout/ProgressNav'
import HeroSection from '@/components/sections/HeroSection'
import TaglineSection from '@/components/sections/TaglineSection'
import ExperiencesSection from '@/components/sections/ExperiencesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import EducationSection from '@/components/sections/EducationSection'
import ToolboxSection from '@/components/sections/ToolboxSection'
import Footer from '@/components/layout/Footer'


export default function PortfolioPage() {
    const [showLanding, setShowLanding] = useState(true)
    const [isFooterVisible, setIsFooterVisible] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)

    useEffect(() => {
        if (showLanding) {
            setIsFooterVisible(false)
            setShowProgressBar(false)
            return
        }

        let footerObserver: IntersectionObserver | null = null
        let retryTimer: number | null = null

        const handleScroll = () => {
            const experiencesEl = document.getElementById('experiences')
            if (!experiencesEl) return

            const activationY = window.innerHeight * 0.35
            const top = experiencesEl.getBoundingClientRect().top
            setShowProgressBar(top <= activationY)
        }

        const setupObserver = () => {
            const footerEl = document.getElementById('footer')

            if (!footerEl) {
                retryTimer = window.setTimeout(setupObserver, 100)
                return
            }

            footerObserver = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0]
                    setIsFooterVisible(Boolean(entry?.isIntersecting))
                },
                { threshold: 0.15 }
            )

            footerObserver.observe(footerEl)
        }

        setupObserver()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        handleScroll()

        return () => {
            if (retryTimer) window.clearTimeout(retryTimer)
            footerObserver?.disconnect()
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [showLanding])

    const handleUnlock = () => {
        setShowLanding(false)
        // Scroll to top to ensure we start at the beginning of content
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
    }

    const handleLock = () => {
        setShowLanding(true)
    }

    return (
        <div className="min-h-screen bg-background overflow-x-hidden relative">
            <ProgressNav
                showNav={!showLanding}
                showHireMe={!showLanding}
                showLanguages={!showLanding}
                dimmed={!showLanding && isFooterVisible}
                hidden={!showLanding && !showProgressBar}
            />

            <AnimatePresence mode="wait">
                {showLanding ? (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
                        className="fixed inset-0 z-30 bg-background overflow-hidden"
                    >
                        <HeroSection onStart={handleUnlock} />
                    </motion.div>
                ) : (
                    <motion.main
                        key="portfolio"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pt-0"
                    >
                        <TaglineSection />
                        <ExperiencesSection />
                        <ProjectsSection />
                        <CertificationsSection />
                        <EducationSection />
                        <ToolboxSection />
                        <Footer onBackToTop={handleLock} />
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    )
}
