const commandMap = {};

async function loadCommands(lang) {
    const response = await fetch(`./assets/mappings/${lang}.json`);
    commandMap[lang] = await response.json();
}

async function initTranslations() {
    await loadCommands('en');  // Load default language commands
    await loadCommands('de');  // Load additional language commands
}

initTranslations();


function mtr(key) {
    return commandMap[defaultLang][key] || key;
}

