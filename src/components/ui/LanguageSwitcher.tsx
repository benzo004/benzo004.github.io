import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`transition-all duration-300 ${language === 'fr' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75 scale-100'
                    }`}
                aria-label="Français"
            >
                <span className="text-xl sm:text-2xl">🇫🇷</span>
            </button>
            <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition-all duration-300 ${language === 'en' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75 scale-100'
                    }`}
                aria-label="English"
            >
                <span className="text-xl sm:text-2xl">🇬🇧</span>
            </button>
        </div>
    );
}
