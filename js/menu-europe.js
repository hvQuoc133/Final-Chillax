
// Create data h1
const drinkCategories = {
    '#appetizer': { i18nKey: 'foodMenu.europe.appetizer', defaultTexts: { vi: 'MÓN ĂN NHẸ', en: 'APPETIZER' } },
    '#pizza': { i18nKey: 'foodMenu.europe.pizza', defaultTexts: { vi: 'PIZZA', en: 'PIZZA' } },
    '#salad': { i18nKey: 'foodMenu.europe.salad', defaultTexts: { vi: 'SALAD', en: 'SALAD' } },
    '#pasta': { i18nKey: 'foodMenu.europe.pasta', defaultTexts: { vi: 'MÌ Ý', en: 'PASTA' } },
    '#soup': { i18nKey: 'foodMenu.europe.soup', defaultTexts: { vi: 'SÚP', en: 'SOUP' } },
    '#pig': { i18nKey: 'foodMenu.europe.pig', defaultTexts: { vi: 'HEO', en: 'PIG' } },
    '#chicken': { i18nKey: 'foodMenu.europe.chicken', defaultTexts: { vi: 'GÀ', en: 'CHICKEN' } },
    '#fish': { i18nKey: 'foodMenu.europe.fish', defaultTexts: { vi: 'CÁ', en: 'FISH' } },
    '#beef': { i18nKey: 'foodMenu.europe.beef', defaultTexts: { vi: 'BÒ', en: 'BEEF' } },
    '#duck': { i18nKey: 'foodMenu.europe.duck', defaultTexts: { vi: 'VỊT', en: 'DUCK' } }
};

function getCurrentLanguage() {
    if (window.i18next?.language) return i18next.language;

    const savedLang = localStorage.getItem('language');
    if (savedLang) return savedLang;

    return document.documentElement.lang || 'vi';
}

// Edit function updateEurope
function updateEurope() {
    const h1 = document.getElementById('europeTitle');
    if (!h1) return;

    // often update currentLang
    currentLang = getCurrentLanguage();
    document.documentElement.lang = currentLang;

    const hash = window.location.hash || '#drink-1';
    const cat = drinkCategories[hash];

    if (cat) {
        const tr = window.i18next?.t(cat.i18nKey);
        h1.textContent = (tr && tr !== cat.i18nKey)
            ? tr
            : cat.defaultTexts[currentLang] || cat.defaultTexts.vi;
        h1.setAttribute('data-i18n', cat.i18nKey);
    } else {
        const defaultTitles = { vi: 'THỰC ĐƠN CHÂU Á', en: 'CHILLAX ASIAN MENU' };
        const t = window.i18next?.t('asiaMenu.title');
        h1.textContent = (t && t !== 'asiaMenu.title')
            ? t
            : defaultTitles[currentLang] || defaultTitles.vi;
        h1.removeAttribute('data-i18n');
    }
}

// Edit function changeLang 
window.changeLang = function (lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);

    if (window.i18next) {
        i18next.changeLanguage(lang).then(() => updateEurope());
    } else {
        updateEurope();
    }
};

// Keep the same event listeners
window.addEventListener('hashchange', updateEurope);
window.addEventListener('DOMContentLoaded', () => {
    // Initialition currentLang 
    currentLang = getCurrentLanguage();
    document.documentElement.lang = currentLang;

    if (window.i18next) {
        if (i18next.isInitialized) {
            currentLang = i18next.language;
            document.documentElement.lang = currentLang;
        }

        i18next.on('initialized', () => {
            currentLang = i18next.language;
            document.documentElement.lang = currentLang;
            updateEurope();
        });

        i18next.on('languageChanged', (lng) => {
            currentLang = lng;
            document.documentElement.lang = currentLang;
            localStorage.setItem('language', lng);
            updateEurope();
        });
    }

    updateEurope();
});
