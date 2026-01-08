import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import LiquidEther from '../LiquidEther'

const heroVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
}

const ctaVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: 0.4 }
    }
}

interface HeroSectionProps {
    onStart: () => void;
}

interface SlideToBeginProps {
    onComplete: () => void;
}

function SlideToBegin({ onComplete }: SlideToBeginProps) {
    const [sliderValue, setSliderValue] = useState(0)

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value)
        setSliderValue(val)

        if (val >= 0.95) {
            setSliderValue(1)
            onComplete()
        }
    }

    const handleSliderRelease = () => {
        // Persistent position as requested
    }

    return (
        <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
            <div className="flex flex-col items-center gap-1">
                <label
                    htmlFor="hero-range"
                    className="font-clash font-bold text-[1.625rem] md:text-[1.625rem] uppercase tracking-normal text-white w-80 text-center whitespace-nowrap overflow-hidden leading-none mb-0.5"
                >
                    Slide to begin
                </label>
                <div className="relative group overflow-hidden">
                    <div className="w-80 h-10 border border-white/40 rounded-full flex items-center px-1 relative overflow-hidden bg-black/20 backdrop-blur-sm">
                        <div
                            className="absolute left-1 top-1/2 -translate-y-1/2 h-8 bg-white rounded-full transition-all duration-75"
                            style={{ width: `calc(32px + ${sliderValue} * (100% - 40px))` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black transition-all duration-75 pointer-events-none z-20 flex items-center justify-center"
                            style={{ left: `calc(4px + ${sliderValue} * (100% - 40px))` }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white"
                            >
                                <path
                                    d="M5 12H18"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M13 7L18 12L13 17"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <input
                            id="hero-range"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function HeroSection({ onStart }: HeroSectionProps) {
    // Top-level handleStart only called once
    const handleStart = useCallback(() => {
        onStart()
    }, [onStart])

    return (
        <section id="home" className="h-full flex items-center justify-start p-10 md:p-16 relative overflow-hidden">
            {/* LiquidEther Background */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={["#273db0"]}
                    autoDemo={true}
                    mouseForce={20}
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
            </div>

            <div className="z-10 w-full max-w-4xl">
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start"
                />
            </div>

            <SlideToBegin onComplete={handleStart} />
        </section>
    )
}
