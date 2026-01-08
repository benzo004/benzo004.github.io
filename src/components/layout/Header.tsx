import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Links', path: '/links' },
    { name: 'About', path: '/about' },
]

export default function Header() {
    const location = useLocation()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <nav className="container-custom flex items-center justify-between py-6 px-6 md:px-16 lg:px-32">
                {/* Logo - Minimal */}
                <Link to="/" className="text-xl font-display hover:text-mint-dark transition-colors duration-400">
                    PORTFOLIO
                </Link>

                {/* Navigation - Clean Zara style */}
                <ul className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        'text-sm uppercase tracking-widest font-medium transition-colors duration-400',
                                        isActive ? 'text-mint-dark' : 'text-gray-800 hover:text-mint-dark'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Mobile menu - Simple */}
                <button className="md:hidden">
                    <span className="sr-only">Menu</span>
                    <div className="space-y-1.5">
                        <div className="w-6 h-px bg-black" />
                        <div className="w-6 h-px bg-black" />
                        <div className="w-6 h-px bg-black" />
                    </div>
                </button>
            </nav>
        </header>
    )
}
