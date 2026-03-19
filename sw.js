const CACHE_NAME = 'santuario-metas-v1';

// Ficheiros essenciais para guardar na memória do telemóvel
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Instalação: O telemóvel descarrega e guarda os ficheiros
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberta com sucesso');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Interceção: Quando abres a app, ele tenta carregar super rápido a partir do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se encontrar no cache, devolve. Senão, vai buscar à internet.
      return response || fetch(event.request);
    })
  );
});

// 3. Atualização: Limpa caches antigas se atualizares a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});