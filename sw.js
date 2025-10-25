const CACHE_NAME = 'erikai-cache-v2'; // verzia cache
const FILES_TO_CACHE = [
  // Hlavné stránky
  'index.html',
  'index2.html',
  'index3.html',
  'android_apk.html',
  'budik.html',
  'create_pwa.html',
  'dokumenty.html',
  'erikai-chat.html',
  'erikai_own_tube.html',
  'erikai_profil.html',
  'erikai_tube.html',
  'erikukazka.html',
  'fotak.html',
  'galeria.html',
  'generator_hesla_mena.html',
  'generator_obrazkov.html',
  'hodiny.html',
  'hudba.html',
  'kalendar.html',
  'kalkulacku.html',
  'kompas.html',
  'kontakt_hovor.html',
  'kreslenie.html',
  'mail.html',
  'mapy.html',
  'nastroje.html',
  'erikaicorelang.html',
  'pdfsk.html',
  'pocasie.html',
  'poznamky.html',
  'prezentacie.html',
  'qr.html',
  'radio.html',
  'skener.html',
  'sms.html',
  'speedmeter.html',
  'spravca_subor.html',
  'tabulky.html',
  'video_editor.html',
  'weberikai.html',
  'zaznam_nahravok.html',
  'zoznam_straniek.html',
  'translate.html',
  'sachy.html',
  'ludo.html',
  'dama.html',
  'platformy.html',
  'hry_menu.html',
  'nastroje_menu.html',
  'zakladne_nastavenie.html',
  'hra.html',
  'programy_menu.html',
  'nudzove.html',
  'support.html',
  'realnastavenie.html',
  'prehliadac.html',
  'onlineprehliadac.html',

  // Obrázky a APK
  'APP_Dowloand/Erik1.jpg',
  'APP_Dowloand/Erik2.jpg',
  'APP_Dowloand/Erik3.jpg',
  'APP_Dowloand/Erik4.jpg',
  'APP_Dowloand/Erik5.jpg',
  'APP_Dowloand/Erik100.jpg',
  'APP_Dowloand/Erik101.jpg',
  'APP_Dowloand/Erik102.jpg',
  'APP_Dowloand/Erik103.jpg',
  'APP_Dowloand/Erik104.jpg',
  'APP_Dowloand/Erik105.jpg',
  'APP_Dowloand/Erik106.jpg',
  'APP_Dowloand/Erik107.jpg',
  'APP_Dowloand/Erik108.jpg',
  'APP_Dowloand/Erik109.jpg',
  'APP_Dowloand/Erik1web.jpg',
  'APP_Dowloand/Erikai25.apk',
  'APP_Dowloand/ErikAI_v1.apk',
  'APP_Dowloand/Erikchat1.jpg',
  'APP_Dowloand/Erikchat2.jpg',
  'APP_Dowloand/Erikchat3.jpg',
  'APP_Dowloand/Turnaj_futbal.docx',
  'APP_Dowloand/VBEM.docx',
  'APP_Dowloand/erikai2025.jpg',
  'APP_Dowloand/erikai_icon_192.png',
  'APP_Dowloand/erikai_icon_512.png',
  'APP_Dowloand/qr_erikai.png',

  // Nové HTML súbory
  '01zaklad.html',
  '02nadpisy.html',
  '03odkazy.html',
  '04zoznamy.html',
  '05cssstyll.html',
  '06javascript.html',
  '07formular.html',
  '08obrazkyavidea.html',
  '09tlacidlastyl.html',
  '10dizajn.html',
  '11efekty.html',
  '12profil.html',
  '13kalkulacka.html',
  '14github.html',
  'coc.html',
  'erikai_kniha-html.html',
  'eriktvv.html',
  'erikvyh.html',
  'minicoc.html',
  'pdfob.html'
];

// Inštalácia SW a ukladanie súborov
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Aktivácia SW a vymazanie starých cache
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: najprv cache, potom sieť
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
