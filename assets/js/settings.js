function getSetting(setting) {
    return localStorage.getItem(setting);
}

function setSetting(key, value) {
    localStorage.setItem(key, value);
    createTopBar("Saved!")
}

function loadSettings() {
    defaultLang = getSetting("lang") || setSetting("lang", "en");
    defaultCountry = getSetting("country") || setSetting("country", "US");
    setTheme(getSetting("theme") || setSetting("theme", "default-light"));
    createTopBar("Imported!")
}

function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    setSetting("theme", theme)
}
function setCountry(country) {
    defaultCountry = country;
    setSetting("country", country)
}