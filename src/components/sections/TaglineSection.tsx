import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TaglineSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Each line fades out progressively, one after another
    const opacity1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.4], [1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.45, 0.7], [1, 0]);

    return (
        <section ref={sectionRef} className="">
            {/* Main Tagline - Left Aligned */}
            <div className="pt-[20vh]">
                <div className="ml-[15%]">
                    <h2 className="flex flex-col font-clash font-bold uppercase leading-[0.85] text-accent text-[clamp(3rem,7vw,7rem)]">
                        <span className="block">
                            <motion.span style={{ opacity: opacity1 }}>cybersecurity</motion.span>
                        </span>
                        <span className="block">
                            <motion.span style={{ opacity: opacity2 }}>student &</motion.span>
                        </span>
                        <span className="block">
                            <motion.span style={{ opacity: opacity3 }}>entrepreneur</motion.span>
                        </span>
                        <span className="block">
                            <motion.span style={{ opacity: opacity4 }}>based in france</motion.span>
                        </span>
                    </h2>
                </div>
            </div>

            {/* Bio Text - Right Aligned */}
            <div className="flex justify-end pb-[20vh] mt-32">
                <div className="mr-[8.333%]">
                    <div className="text-accent text-sm font-bold leading-relaxed space-y-3 uppercase tracking-wide max-w-md">
                        <p>{t('hero.bio.p1')}</p>
                        <p>{t('hero.bio.p2')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
