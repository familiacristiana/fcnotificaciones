importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  // Aquí debes colocar la configuración de tu proyecto Firebase
  // Puedes encontrar esta información en la consola de Firebase
  apiKey: "AIzaSyD4efYtAlMUwRlzEFWBcepqoLR_hZVparc",
  authDomain: "web-fc.firebaseapp.com",
  projectId: "web-fc",
  storageBucket: "web-fc.appspot.com",
  messagingSenderId: "481361519344",
  appId: "1:481361519344:web:13304c385491ffa640d835",
  measurementId: "G-L5E45WFMP5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Recibido mensaje en background:', payload);
  // Aquí puedes personalizar la notificación que se mostrará
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/path/to/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});