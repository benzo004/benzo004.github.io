import { useEffect, useState } from 'react'
import ProgressNav from '@/components/layout/ProgressNav'
import TaglineSection from '@/components/sections/TaglineSection'
import ExperiencesSection from '@/components/sections/ExperiencesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import EducationSection from '@/components/sections/EducationSection'
import ToolboxSection from '@/components/sections/ToolboxSection'
import Footer from '@/components/layout/Footer'


export default function PortfolioPage() {
    const [isFooterVisible, setIsFooterVisible] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)

    useEffect(() => {
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
    }, [])

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-background overflow-x-hidden relative">
            <ProgressNav
                showNav
                showHireMe
                showLanguages
                dimmed={isFooterVisible}
                hidden={!showProgressBar}
            />

            <main>
                <TaglineSection />
                <ExperiencesSection />
                <ProjectsSection />
                <CertificationsSection />
                <EducationSection />
                <ToolboxSection />
                <Footer onBackToTop={handleBackToTop} />
            </main>
        </div>
    )
}
