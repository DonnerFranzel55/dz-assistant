function getSetting(setting) {
    return localStorage.getItem(setting);
}

function setSetting(key, value) {
    localStorage.setItem(key, value);
    createTopBar("Saved!")
}