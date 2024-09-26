
  importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

  // Inicializa Firebase en el Service Worker
  firebase.initializeApp({
    apiKey: "AIzaSyD4efYtAlMUwRlzEFWBcepqoLR_hZVparc",
    authDomain: "web-fc.firebaseapp.com",
    projectId: "web-fc",
    storageBucket: "web-fc.appspot.com",
    messagingSenderId: "481361519344",
    appId: "1:481361519344:web:13304c385491ffa640d835",
    measurementId: "G-L5E45WFMP5"
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Personaliza la notificación aquí
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });