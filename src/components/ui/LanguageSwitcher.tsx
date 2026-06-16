import { useLanguage } from '../../contexts/LanguageContext';
import Flag from './Flag';

const options: { code: 'fr' | 'en'; flag: 'fr' | 'gb'; aria: string }[] = [
    { code: 'fr', flag: 'fr', aria: 'Français' },
    { code: 'en', flag: 'gb', aria: 'English' },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            {options.map((opt) => (
                <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    aria-label={opt.aria}
                    aria-pressed={language === opt.code}
                    className={`block w-7 h-5 rounded-[3px] overflow-hidden border transition-all duration-300 ${language === opt.code
                        ? 'opacity-100 scale-110 border-accent/50 shadow-sm'
                        : 'opacity-50 hover:opacity-90 border-border/60'
                        }`}
                >
                    <Flag code={opt.flag} className="w-full h-full" />
                </button>
            ))}
        </div>
    );
}
