const translations = {};

async function loadTranslations(lang) {
    const response = await fetch(`./../lang/${lang}.json`);
    translations[lang] = await response.json();
}

async function initTranslations() {
    await loadTranslations('en');  // Load default language
    await loadTranslations('de');  // Load additional language
}

initTranslations();

function setLanguage(lang) {
    defaultLang = lang;
    setSetting("lang", lang)
}

function tr(key) {
    return translations[defaultLang][key] || key;
}