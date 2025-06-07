
// Create data h1
const drinkCategories = {
    '#appetizer': { i18nKey: 'foodMenu.asia.appetizer', defaultTexts: { vi: 'KHAI VỊ', en: 'APPETIZER' } },
    '#eggnoodles': { i18nKey: 'foodMenu.asia.eggnoodles', defaultTexts: { vi: 'MÌ TRỨNG', en: 'EGG NOODLES' } },
    '#ricedishes': { i18nKey: 'foodMenu.asia.ricedishes', defaultTexts: { vi: 'CƠM', en: 'RICE DISHES' } },
    '#soupdishes': { i18nKey: 'foodMenu.asia.soupdishes', defaultTexts: { vi: 'CANH', en: 'SOUP' } },
    '#salad': { i18nKey: 'foodMenu.asia.salad', defaultTexts: { vi: 'GỎI', en: 'SALAD' } },
    '#brothsoup': { i18nKey: 'foodMenu.asia.brothsoup', defaultTexts: { vi: 'SÚP', en: 'BROTH SOUP' } },
    '#shrimp': { i18nKey: 'foodMenu.asia.shrimp', defaultTexts: { vi: 'TÔM', en: 'SHRIMP' } },
    '#squid': { i18nKey: 'foodMenu.asia.squid', defaultTexts: { vi: 'MỰC', en: 'SQUID' } },
    '#fishdishes': { i18nKey: 'foodMenu.asia.fishdishes', defaultTexts: { vi: 'CÁ', en: 'FISH' } },
    '#dessert': { i18nKey: 'foodMenu.asia.dessert', defaultTexts: { vi: 'TRÁNG MIỆNG', en: 'DESSERT' } }
};

function getCurrentLanguage() {
    if (window.i18next?.language) return i18next.language;

    const savedLang = localStorage.getItem('language');
    if (savedLang) return savedLang;

    return document.documentElement.lang || 'vi';
}

// Edit function updateAsiaTitle
function updateAsiaTitle() {
    const h1 = document.getElementById('asiaTitle');
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
        i18next.changeLanguage(lang).then(() => updateAsiaTitle());
    } else {
        updateAsiaTitle();
    }
};

// Keep the same event listeners
window.addEventListener('hashchange', updateAsiaTitle);
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
            updateAsiaTitle();
        });

        i18next.on('languageChanged', (lng) => {
            currentLang = lng;
            document.documentElement.lang = currentLang;
            localStorage.setItem('language', lng);
            updateAsiaTitle();
        });
    }

    updateAsiaTitle();
});
