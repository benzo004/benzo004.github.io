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
        'nav.home': '',
        'nav.discover': 'Découvrir',
        'nav.back': 'Accueil',
        'hero.title.1': 'J\'espère que ce background',
        'hero.title.2': 'suffira pour être',
        'hero.title.accent': 'embauché',
        'hero.subtitle': '',
        'hero.bio.p1': 'En jonglant entre la boxe et la cybersécurité, je mobilise savoir-faire et savoir-être pour accomplir vos projets au mieux.',
        'hero.bio.p2': 'Porté par la rigueur, la proactivité et la curiosité professionnelle forgées au fil de mes expériences, je suis prêt à relever vos missions pour transformer mon ambition en résultats concrets qui vous bénéficient.',
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
        'about.vision': 'Mon Parcours',
        'about.vision.p1': 'Mon parcours est marqué par une transition de l\'entreprenariat et du coaching vers la cybersécurité. Cette diversité d\'expériences m\'a permis de forger un profil atypique où la rigueur technique rencontre une forte aisance relationnelle.',
        'about.vision.p2': 'Ma capacité d\'autonomie et ma force de proposition ont été les piliers de mon expérience chez Consil AI, où j\'ai dû concevoir des écosystèmes IA sur mesure tout en gérant les priorités stratégiques. Ce rôle de fondateur a également aiguisé mon raisonnement logique et mon esprit d\'analyse, essentiels pour anticiper les besoins clients et les vulnérabilités techniques.',
        'about.vision.p3': 'Le travail d\'équipe et l\'agilité sont des compétences que j\'ai cultivées sur le terrain, que ce soit en tant que coach de boxe ou lors de mes missions événementielles pour Paris Society. Ces environnements exigeants m\'ont appris la gestion des priorités sous pression et l\'importance d\'une orientation résultats sans faille.',
        'about.vision.p4': 'Mon sens du détail, hérité de mon expérience en horlogerie custom, se traduit aujourd\'hui par une approche méticuleuse de la sécurité réseau. Poussé par une grande curiosité professionnelle, je m\'efforce de toujours fédérer les compétences autour de projets innovants, alliant technique pure et vision globale.',
        'about.philosophy': 'Philosophie & Approche',
        'about.teamwork': 'Esprit d\'équipe',
        'about.teamwork.desc': 'Très sociable et engagé, je favorise une collaboration transparente et constructive.',
        'about.determination': 'Détermination',
        'about.determination.desc': 'Proactif et orienté résultats, je m\'investis pleinement dans la réussite des objectifs.',
        'about.autonomy': 'Autonomie',
        'about.autonomy.desc': 'Capacité à gérer des projets complexes en toute indépendance avec une grande curiosité technique.',
        'about.logic': 'Raisonnement logique',
        'about.logic.desc': 'Capacité à décomposer des problèmes complexes pour concevoir des solutions structurées et efficaces.',
        'about.agility': 'Agilité & Adaptabilité',
        'about.agility.desc': 'Réactivité face au changement et capacité à pivoter rapidement dans des environnements dynamiques.',
        'about.priorities': 'Gestion des priorités',
        'about.priorities.desc': 'Organisation rigoureuse et focus sur les tâches à haute valeur ajoutée, même sous pression.',
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
        'nav.home': '',
        'nav.discover': 'Discover',
        'nav.back': 'Home',
        'hero.title.1': 'I hope this background',
        'hero.title.2': 'is enough to get',
        'hero.title.accent': 'hired',
        'hero.subtitle': '',
        'hero.bio.p1': 'By balancing boxing and cybersecurity, I leverage both technical expertise and soft skills to deliver your projects to the highest standard.',
        'hero.bio.p2': 'Driven by the rigor, proactivity, and professional curiosity forged through my experiences, I am ready to take on your missions and turn my ambition into concrete results that benefit you.',
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
        'about.vision': 'My Journey',
        'about.vision.p1': 'My journey is defined by a transition from entrepreneurship and coaching to cybersecurity. This diverse background has allowed me to build a unique profile where technical rigor meets strong interpersonal skills.',
        'about.vision.p2': 'My autonomy and initiative were the cornerstones of my experience at Consil AI, where I designed custom AI ecosystems while managing strategic priorities. This founding role also sharpened my logical reasoning and analytical thinking, crucial for anticipating both client needs and technical vulnerabilities.',
        'about.vision.p3': 'Teamwork and adaptability are skills I\'ve cultivated in the field, whether as a boxing coach or during my event missions for Paris Society. These demanding environments taught me priority management under pressure and the importance of a flawless result orientation.',
        'about.vision.p4': 'My attention to detail, inherited from my custom watchmaking venture, now translates into a meticulous approach to network security. Driven by a great professional curiosity, I strive to always unite skills around innovative projects, combining pure technical expertise with a global vision.',
        'about.philosophy': 'Philosophy & Approach',
        'about.teamwork': 'Team Spirit',
        'about.teamwork.desc': 'Highly sociable and engaged, I foster transparent and constructive collaboration.',
        'about.determination': 'Determination',
        'about.determination.desc': 'Proactive and result-oriented, I am fully committed to achieving objectives.',
        'about.autonomy': 'Autonomy',
        'about.autonomy.desc': 'Ability to manage complex projects independently with great technical curiosity.',
        'about.logic': 'Logical Reasoning',
        'about.logic.desc': 'Ability to break down complex problems to design structured and efficient solutions.',
        'about.agility': 'Agility & Adaptability',
        'about.agility.desc': 'Responsiveness to change and ability to pivot quickly in dynamic environments.',
        'about.priorities': 'Priority Management',
        'about.priorities.desc': 'Rigorous organization and focus on high-value tasks, even under pressure.',
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
