+++
title = "Gestionnaire de Produits Sécurisé en Python"
date = "2024-12-09"
description = "Application Python avec authentification sécurisée et gestion de données"
tags = [
    "Python",
    "Pandas",
    "CSV",
    "Sécurité",
    "GUI"
]
+++

<div class="project-content">

# 🎯 Objectif du Projet

Développement d'une application de gestion de produits en Python intégrant une authentification sécurisée et une interface graphique intuitive. Le projet met l'accent sur la sécurité des données et l'expérience utilisateur.

# 💡 Fonctionnalités Principales

<div class="features-grid">
<div class="feature-item">

### 🔐 Authentification Sécurisée
- Hachage des mots de passe avec sel (hashlib)
- Vérification locale avec rockyou.txt
- Intégration de l'API Have I Been Pwned
- Protection contre les attaques par force brute
</div>

<div class="feature-item">

### 📊 Gestion des Données
- Manipulation de fichiers CSV avec Pandas
- CRUD complet sur les produits
- Recherche et tri avancés
- Validation des données
</div>

<div class="feature-item">

### 🖥️ Interface Graphique
- Design moderne avec Tkinter
- Navigation intuitive
- Formulaires de saisie ergonomiques
- Retours visuels des actions
</div>

<div class="feature-item">

### 🛡️ Sécurité des Données
- Validation des entrées
- Gestion sécurisée des fichiers
- Protection contre les injections
- Journalisation des actions
</div>
</div>

# 🛠️ Technologies Utilisées

- **Python** : Langage principal
- **Pandas** : Manipulation des données CSV
- **Hashlib** : Cryptographie des mots de passe
- **Tkinter** : Interface graphique
- **Requests** : Intégration API Have I Been Pwned

# 📝 Architecture du Projet

```
project/
├── data/
│   ├── products.csv
│   └── users.csv
├── src/
│   ├── auth/
│   │   ├── password_manager.py
│   │   └── user_validation.py
│   ├── gui/
│   │   ├── main_window.py
│   │   └── forms.py
│   └── data/
│       └── product_manager.py
└── main.py
```

# 🎓 Apprentissages

Ce projet m'a permis de développer des compétences en :
- Gestion sécurisée des données utilisateur
- Conception d'interfaces graphiques
- Manipulation de données avec Pandas
- Intégration d'APIs externes
- Architecture logicielle

</div>

<style>
.project-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.feature-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-item h3 {
    margin-top: 0;
    color: var(--content-link-color);
}

h1 {
    border-bottom: 2px solid var(--content-link-color);
    padding-bottom: 10px;
    margin-top: 40px;
}

pre {
    background: rgba(255, 255, 255, 0.05);
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
}
</style>