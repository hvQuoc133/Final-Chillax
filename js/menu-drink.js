document.addEventListener('DOMContentLoaded', function() {

  // 2. Xử lý menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.navMenuCustom');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  // 3. Xử lý tiêu đề đồ uống
  const drinkCategories = {
    '#drink-1': { 
      i18nKey: 'drinkMenu.coffee',
      defaultTexts: {
        vi: 'CÀ PHÊ',
        en: 'COFFEE'
      }
    },
    '#drink-2': { 
      i18nKey: 'drinkMenu.hotTea',
      defaultTexts: {
        vi: 'TRÀ NÓNG',
        en: 'HOT TEA'
      }
    },
    '#drink-3': { 
      i18nKey: 'drinkMenu.icedTea',
      defaultTexts: {
        vi: 'TRÀ GIẢI NHIỆT',
        en: 'ICED TEA'
      }
    },
    '#drink-4': { 
      i18nKey: 'drinkMenu.yogurtIceCream',
      defaultTexts: {
        vi: 'SỮA CHUA & KEM',
        en: 'COFFEE'
      }
    },
    '#drink-5': { 
      i18nKey: 'drinkMenu.lassi',
      defaultTexts: {
        vi: 'LASSI',
        en: 'LASSI'
      }
    },
    '#drink-6': { 
      i18nKey: 'drinkMenu.nonCoffee',
      defaultTexts: {
        vi: 'NON COFFEE',
        en: 'NON COFFEE'
      }
    },
    '#drink-7': { 
      i18nKey: 'drinkMenu.fruitJuice',
      defaultTexts: {
        vi: 'NƯỚC ÉP TRÁI CÂY',
        en: 'FRUIT JUICE'
      }
    },
    '#drink-8': { 
      i18nKey: 'drinkMenu.detox',
      defaultTexts: {
        vi: 'DETOX',
        en: 'DETOX'
      }
    },
    '#drink-9': { 
      i18nKey: 'drinkMenu.mocktail',
      defaultTexts: {
        vi: 'MOCKTAIL',
        en: 'MOCKTAIL'
      }
    },
    '#drink-10': { 
      i18nKey: 'drinkMenu.cocktail',
      defaultTexts: {
        vi: 'COCKTAIL',
        en: 'COCKTAIL'
      }
    }
  };

  // Hàm lấy ngôn ngữ hiện tại (ưu tiên từ i18next, sau đó từ HTML tag)
  function getCurrentLanguage() {
    return window.i18next?.language || document.documentElement.lang || 'vi';
  }

  // Hàm cập nhật tiêu đề
  function updateDrinkTitle() {
    const h1 = document.getElementById('drinkTitle');
    if (!h1) return;

    const hash = window.location.hash;
    const category = drinkCategories[hash];
    const currentLang = getCurrentLanguage();
    
    if (category) {
      // Luôn ưu tiên bản dịch từ i18n trước
      const translatedText = window.i18next?.t(category.i18nKey);
      
      // Nếu i18n chưa sẵn sàng hoặc không có bản dịch
      if (!translatedText || translatedText === category.i18nKey) {
        h1.textContent = category.defaultTexts[currentLang] || category.defaultTexts.vi;
      } else {
        h1.textContent = translatedText;
      }
      
      h1.setAttribute('data-i18n', category.i18nKey);
    } else {
      // Xử lý tiêu đề mặc định
      const defaultTitle = {
        vi: 'THỰC ĐƠN NƯỚC CHILLAX',
        en: 'CHILLAX DRINK MENU'
      };
      h1.textContent = window.i18next?.t('drinkMenu.title') || defaultTitle[currentLang] || defaultTitle.vi;
    }
  }

  // Xử lý khi chuyển ngôn ngữ
  function handleLanguageChange() {
    // Cập nhật lang attribute cho HTML
    document.documentElement.lang = window.i18next.language;
    updateDrinkTitle();
  }

  // Khởi tạo sự kiện
  if (window.i18next) {
    i18next.on('languageChanged', handleLanguageChange);
    i18next.on('initialized', updateDrinkTitle);
  }
  
  window.addEventListener('hashchange', updateDrinkTitle);
  
  // Xử lý click menu - thêm kiểm tra ngôn ngữ
  document.querySelectorAll('.dropdown-submenu a').forEach(item => {
    item.addEventListener('click', function() {
      // Đảm bảo giữ nguyên ngôn ngữ hiện tại
      const currentLang = getCurrentLanguage();
      if (window.i18next) {
        i18next.changeLanguage(currentLang).then(updateDrinkTitle);
      } else {
        setTimeout(updateDrinkTitle, 50);
      }
    });
  });

  // Khởi chạy lần đầu
  updateDrinkTitle();

});
