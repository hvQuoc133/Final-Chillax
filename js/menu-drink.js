
// Create data h1
const drinkCategories = {
    '#drink-1': { i18nKey: 'drinkMenu.coffee', defaultTexts: { vi: 'CÀ PHÊ', en: 'COFFEE' } },
    '#drink-2': { i18nKey: 'drinkMenu.hotTea', defaultTexts: { vi: 'TRÀ NÓNG', en: 'HOT TEA' } },
    '#drink-3': { i18nKey: 'drinkMenu.icedTea', defaultTexts: { vi: 'TRÀ GIẢI NHIỆT', en: 'ICED TEA' } },
    '#drink-4': { i18nKey: 'drinkMenu.yogurtIceCream', defaultTexts: { vi: 'SỮA CHUA & KEM', en: 'YOGURT & ICE CREAM' } },
    '#drink-5': { i18nKey: 'drinkMenu.lassi', defaultTexts: { vi: 'LASSI', en: 'LASSI' } },
    '#drink-6': { i18nKey: 'drinkMenu.nonCoffee', defaultTexts: { vi: 'NON COFFEE', en: 'NON COFFEE' } },
    '#drink-7': { i18nKey: 'drinkMenu.fruitJuice', defaultTexts: { vi: 'NƯỚC ÉP TRÁI CÂY', en: 'FRUIT JUICE' } },
    '#drink-8': { i18nKey: 'drinkMenu.detox', defaultTexts: { vi: 'DETOX', en: 'DETOX' } },
    '#drink-9': { i18nKey: 'drinkMenu.mocktail', defaultTexts: { vi: 'MOCKTAIL', en: 'MOCKTAIL' } },
    '#drink-10': { i18nKey: 'drinkMenu.cocktail', defaultTexts: { vi: 'COCKTAIL', en: 'COCKTAIL' } }
};

function getCurrentLanguage() {
    if (window.i18next?.language) return i18next.language;

    const savedLang = localStorage.getItem('language');
    if (savedLang) return savedLang;

    return document.documentElement.lang || 'vi';
}

// Edit function updateDrinkTitle
function updateDrinkTitle() {
    const h1 = document.getElementById('drinkTitle');
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
        const defaultTitles = { vi: 'THỰC ĐƠN NƯỚC CHILLAX', en: 'CHILLAX DRINK MENU' };
        const t = window.i18next?.t('drinkMenu.title');
        h1.textContent = (t && t !== 'drinkMenu.title')
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
        i18next.changeLanguage(lang).then(() => updateDrinkTitle());
    } else {
        updateDrinkTitle();
    }
};

// Keep the same event listeners
window.addEventListener('hashchange', updateDrinkTitle);
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
            updateDrinkTitle();
        });

        i18next.on('languageChanged', (lng) => {
            currentLang = lng;
            document.documentElement.lang = currentLang;
            localStorage.setItem('language', lng);
            updateDrinkTitle();
        });
    }

    updateDrinkTitle();
});
