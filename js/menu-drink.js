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
  
  // 2. Biến lưu trạng thái ngôn ngữ hiện tại
  let currentLang = document.documentElement.lang || 'vi';
  
  // 3. Hàm cập nhật tiêu đề dựa trên hash và currentLang
  function updateDrinkTitle() {
    const h1 = document.getElementById('drinkTitle');
    if (!h1) return;
    const hash = window.location.hash || '#drink-1';
    const cat = drinkCategories[hash];
  
    if (cat) {
      // Lấy bản dịch i18n nếu có
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
  
  // 4. Đổi ngôn ngữ gọi từ onclick
  window.changeLang = function(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    if (window.i18next) {
      i18next.changeLanguage(lang).then(() => updateDrinkTitle());
    } else {
      updateDrinkTitle();
    }
  };
  
  // 5. Lắng nghe hashchange
  window.addEventListener('hashchange', updateDrinkTitle);
  
  // 6. Khởi tạo khi DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    // Nếu sử dụng i18next, gán currentLang từ i18next và lắng nghe sự kiện
    if (window.i18next) {
      // Nếu đã init trước
      if (i18next.isInitialized) {
        currentLang = i18next.language;
        document.documentElement.lang = currentLang;
      }
      // Khi khởi tạo xong
      i18next.on('initialized', () => {
        currentLang = i18next.language;
        document.documentElement.lang = currentLang;
        updateDrinkTitle();
      });
      // Khi user thay đổi
      i18next.on('languageChanged', (lng) => {
        currentLang = lng;
        document.documentElement.lang = currentLang;
        updateDrinkTitle();
      });
    }
    // Render lần đầu
    updateDrinkTitle();
  });
  