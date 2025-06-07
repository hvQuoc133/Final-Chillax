// File: js/drinkMenu.js

// 1. Định nghĩa categories
const drinkCategories = {
    '#drink-1': { i18nKey: 'drinkMenu.coffee',        defaultTexts: { vi: 'CÀ PHÊ',           en: 'COFFEE' } },
    '#drink-2': { i18nKey: 'drinkMenu.hotTea',        defaultTexts: { vi: 'TRÀ NÓNG',         en: 'HOT TEA' } },
    '#drink-3': { i18nKey: 'drinkMenu.icedTea',       defaultTexts: { vi: 'TRÀ GIẢI NHIỆT',   en: 'ICED TEA' } },
    '#drink-4': { i18nKey: 'drinkMenu.yogurtIceCream',defaultTexts: { vi: 'SỮA CHUA & KEM',   en: 'YOGURT & ICE CREAM' } },
    '#drink-5': { i18nKey: 'drinkMenu.lassi',         defaultTexts: { vi: 'LASSI',            en: 'LASSI' } },
    '#drink-6': { i18nKey: 'drinkMenu.nonCoffee',     defaultTexts: { vi: 'NON COFFEE',       en: 'NON COFFEE' } },
    '#drink-7': { i18nKey: 'drinkMenu.fruitJuice',    defaultTexts: { vi: 'NƯỚC ÉP TRÁI CÂY', en: 'FRUIT JUICE' } },
    '#drink-8': { i18nKey: 'drinkMenu.detox',         defaultTexts: { vi: 'DETOX',            en: 'DETOX' } },
    '#drink-9': { i18nKey: 'drinkMenu.mocktail',      defaultTexts: { vi: 'MOCKTAIL',         en: 'MOCKTAIL' } },
    '#drink-10':{ i18nKey: 'drinkMenu.cocktail',      defaultTexts: { vi: 'COCKTAIL',         en: 'COCKTAIL' } }
  };
  
  // 2. Lấy ngôn ngữ hiện tại (ưu tiên i18next.language)
  function getCurrentLanguage() {
    return window.i18next?.language || document.documentElement.lang || 'vi';
  }
  
  // 3. Cập nhật tiêu đề
  function updateDrinkTitle() {
    const h1 = document.getElementById('drinkTitle');
    if (!h1) return;
  
    const hash = window.location.hash || '#drink-1';
    const cat = drinkCategories[hash];
    const lang = getCurrentLanguage();
  
    if (cat) {
      const tr = window.i18next?.t(cat.i18nKey);
      h1.textContent = (tr && tr !== cat.i18nKey)
        ? tr
        : cat.defaultTexts[lang] || cat.defaultTexts.vi;
      h1.setAttribute('data-i18n', cat.i18nKey);
    } else {
      const def = { vi: 'THỰC ĐƠN NƯỚC CHILLAX', en: 'CHILLAX DRINK MENU' };
      const t = window.i18next?.t('drinkMenu.title');
      h1.textContent = (t && t !== 'drinkMenu.title')
        ? t
        : def[lang] || def.vi;
      h1.removeAttribute('data-i18n');
    }
  }
  
  // 4. Hàm đổi ngôn ngữ (onclick)
  window.changeLang = function(lang) {
    if (window.i18next) {
      i18next.changeLanguage(lang).then(() => {
        document.documentElement.lang = lang;
        updateDrinkTitle();
      });
    } else {
      document.documentElement.lang = lang;
      updateDrinkTitle();
    }
  };
  
  // 5. Event listeners
  window.addEventListener('hashchange', updateDrinkTitle);
  window.addEventListener('DOMContentLoaded', () => {
    // Chờ i18next và update một lần
    if (window.i18next) {
      i18next.on('initialized', () => {
        document.documentElement.lang = i18next.language;
        updateDrinkTitle();
      });
      i18next.on('languageChanged', () => {
        document.documentElement.lang = i18next.language;
        updateDrinkTitle();
      });
    } else {
      updateDrinkTitle();
    }
  });
  