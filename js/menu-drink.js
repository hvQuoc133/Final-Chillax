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
        en: 'YOGURT & ICE CREAM'
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
  // 3. Hàm lấy ngôn ngữ hiện tại
  function getCurrentLanguage() {
    // Ưu tiên từ i18next, sau đó từ localStorage, cuối cùng mới là HTML tag
    return window.i18next?.language || localStorage.getItem('language') || document.documentElement.lang || 'vi';
  }

  // 4. Hàm cập nhật tiêu đề đồ uống
  function updateDrinkTitle() {
    const h1 = document.getElementById('drinkTitle');
    if (!h1) return;

    const hash = window.location.hash || '#drink-1'; // Mặc định tab đầu tiên
    const category = drinkCategories[hash];
    const currentLang = getCurrentLanguage();
    
    if (category) {
      // Ưu tiên bản dịch từ i18n
      if (window.i18next) {
        const translatedText = i18next.t(category.i18nKey);
        if (translatedText && translatedText !== category.i18nKey) {
          h1.textContent = translatedText;
          return;
        }
      }
      // Fallback về default text nếu không có i18n
      h1.textContent = category.defaultTexts[currentLang] || category.defaultTexts.vi;
    } else {
      // Tiêu đề mặc định khi không có hash phù hợp
      const defaultTitle = {
        vi: 'THỰC ĐƠN NƯỚC CHILLAX',
        en: 'CHILLAX DRINK MENU'
      };
      h1.textContent = defaultTitle[currentLang] || defaultTitle.vi;
    }
  }

  // 5. Hàm xử lý khi thay đổi ngôn ngữ
  function handleLanguageChange() {
    // Cập nhật lang attribute và localStorage
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    updateDrinkTitle();
  }

  // 6. Thiết lập sự kiện
  if (window.i18next) {
    i18next.on('languageChanged', handleLanguageChange);
    i18next.on('initialized', handleLanguageChange);
  }
  
  // Theo dõi thay đổi hash và click menu
  window.addEventListener('hashchange', updateDrinkTitle);
  
  // Xử lý click menu item
  document.querySelectorAll('.dropdown-submenu a').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      window.location.hash = target;
      updateDrinkTitle();
    });
  });

  // 7. Khởi tạo ban đầu
  updateDrinkTitle();
  
  // 8. Hàm render menu đồ uống
  function renderDrinkMenu() {
    // Thêm logic render menu của bạn ở đây nếu cần
    updateDrinkTitle(); // Đảm bảo cập nhật tiêu đề
  }

  // Chạy lần đầu khi trang load
  renderDrinkMenu();

});


