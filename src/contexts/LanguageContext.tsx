import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Simplified translation lookup
const translations: Record<Language, Record<string, string>> = {
    fr: {
        'nav.home': 'Andrii Z.',
        'nav.discover': 'Découvrir',
        'nav.back': 'Accueil',
        'hero.title.1': 'J\'espère que ce background',
        'hero.title.2': 'suffira pour être',
        'hero.title.accent': 'embauché',
        'hero.subtitle': '',
        'section.about': 'À propos',
        'section.experiences': 'Expériences',
        'section.projects': 'Projets',
        'section.certifications': 'Certifications & Outils',
        'certifications.header': 'Certifications',
        'certifications.verify': 'Vérifier',
        'certifications.completed': 'Obtenue',
        'certifications.inProgress': 'En cours',
        'certifications.expectedFor': 'Prévue pour',
        'education.header': 'Éducation',
        'tagline.line1': 'étudiant en',
        'tagline.line2': 'cybersécurité &',
        'tagline.line3': 'entrepreneur',
        'tagline.line4': 'basé en france',
        'tools.header': 'Skills',
        'about.vision': 'Ma Vision',
        'about.vision.p1': 'Inspiré par la précision des systèmes biologiques et mécaniques, j\'aborde la cybersécurité comme un équilibre vital entre protection et fluidité.',
        'about.vision.p2': 'Dans un monde hyper-connecté, la sécurité n\'est pas une barrière, mais le fondement même de la liberté numérique. Mon parcours entrepreneurial m\'apporte une vision holistique des besoins métiers.',
        'about.philosophy': 'Philosophie & Approche',
        'about.teamwork': 'Esprit d\'équipe',
        'about.teamwork.desc': 'Très sociable et engagé, je favorise une collaboration transparente et constructive.',
        'about.determination': 'Détermination',
        'about.determination.desc': 'Proactif et orienté résultats, je m\'investis pleinement dans la réussite des objectifs.',
        'about.autonomy': 'Autonomie',
        'about.autonomy.desc': 'Capacité à gérer des projets complexes en toute indépendance avec une grande curiosité technique.',
        'about.lang': 'Langues',
        'about.social': 'Mes Liens',
        'about.skills': 'Expertises Clés',
        'filter.all': 'Tout',
        'filter.cyber': 'Cybersécurité',
        'filter.other': 'Autre',
        'about.lang.fr': 'Français',
        'about.lang.en': 'Anglais',
        'about.lang.ru': 'Russe',
        'about.lang.uk': 'Ukrainien',
        'about.lang.es': 'Espagnol',
        'about.level.native': 'C2 - Natif',
        'about.level.advanced': 'C1 - Avancé',
        'about.level.intermediate': 'B1 - Intermédiaire',
        'footer.message.1': 'VOUS AVEZ TOUT VU. ON S\'Y MET ?',
        'footer.message.3': 'N\'hésitez pas à me',
        'footer.contact': 'contacter',
        'footer.build': 'et voyons ce que nous pourrions construire ensemble !',
        'footer.copied': 'Copié !',
        'footer.backToTop': 'RETOUR EN HAUT'
    },
    en: {
        'nav.home': 'Andrii Z.',
        'nav.discover': 'Discover',
        'nav.back': 'Home',
        'hero.title.1': 'I hope this background',
        'hero.title.2': 'is enough to get',
        'hero.title.accent': 'hired',
        'hero.subtitle': '',
        'section.about': 'About',
        'section.experiences': 'Experiences',
        'section.projects': 'Projects',
        'section.certifications': 'Certifications & Tools',
        'certifications.header': 'Certifications',
        'certifications.verify': 'Verify',
        'certifications.completed': 'Completed',
        'certifications.inProgress': 'In Progress',
        'certifications.expectedFor': 'Expected for',
        'education.header': 'Education',
        'tagline.line1': 'cybersecurity',
        'tagline.line2': 'student &',
        'tagline.line3': 'entrepreneur',
        'tagline.line4': 'based in france',
        'tools.header': 'Skills',
        'about.vision': 'My Vision',
        'about.vision.p1': 'Inspired by the precision of biological and mechanical systems, I approach cybersecurity as a vital balance between protection and fluidity.',
        'about.vision.p2': 'In a hyper-connected world, security is not a barrier, but the very foundation of digital freedom. My entrepreneurial background provides me with a holistic view of business needs.',
        'about.philosophy': 'Philosophy & Approach',
        'about.teamwork': 'Team Spirit',
        'about.teamwork.desc': 'Highly sociable and engaged, I foster transparent and constructive collaboration.',
        'about.determination': 'Determination',
        'about.determination.desc': 'Proactive and result-oriented, I am fully committed to achieving objectives.',
        'about.autonomy': 'Autonomy',
        'about.autonomy.desc': 'Ability to manage complex projects independently with great technical curiosity.',
        'about.lang': 'Languages',
        'about.social': 'Connect With Me',
        'about.skills': 'Key Expertise',
        'filter.all': 'All',
        'filter.cyber': 'Cybersecurity',
        'filter.other': 'Other',
        'about.lang.fr': 'French',
        'about.lang.en': 'English',
        'about.lang.ru': 'Russian',
        'about.lang.uk': 'Ukrainian',
        'about.lang.es': 'Spanish',
        'about.level.native': 'C2 - Native',
        'about.level.advanced': 'C1 - Advanced',
        'about.level.intermediate': 'B1 - Intermediate',
        'footer.message.1': 'YOU\'VE SEEN IT ALL. SHALL WE BEGIN?',
        'footer.message.3': 'Feel free to',
        'footer.contact': 'contact me',
        'footer.build': 'and let\'s see what we could build together!',
        'footer.copied': 'Copied!',
        'footer.backToTop': 'BACK TO TOP'
    }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('fr');

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
