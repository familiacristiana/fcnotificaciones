const messaging = firebase.messaging();

function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Permiso de notificación concedido.');
      getToken();
      document.getElementById('notificationButton').textContent = 'Notificaciones activadas';
      document.getElementById('notificationButton').disabled = true;
    } else {
      console.log('No se concedió el permiso para las notificaciones.');
      document.getElementById('notificationButton').textContent = 'Activar notificaciones';
    }
  });
}

function getToken() {
    messaging.getToken({ vapidKey: 'BIkpTxJb81L2FoTFJxkA8nu2KTndfWXAo1jTW9fmIuUP5LfmdggLE86JUwGmu-GZOLs5gTUUoe8B_KH22vnUoFU' }).then((currentToken) => {
      if (currentToken) {
        console.log('Token del dispositivo:', currentToken);
        sendTokenToServer(currentToken);
      } else {
        console.log('No se pudo obtener el token del dispositivo.');
      }
    }).catch((err) => {
      console.log('Ocurrió un error al obtener el token:', err);
      if (err.code === 'messaging/failed-service-worker-registration') {
        console.log('Asegúrate de que el archivo firebase-messaging-sw.js existe en la raíz de tu proyecto.');
      }
    });
  }

  function sendTokenToServer(token) {
    
    fetch('http://localhost:3000/register-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => console.log('Token registrado:', data))
    .catch((error) => {
      console.error('Error al registrar el token:', error);
      // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
    });
  }

// Inicializar el estado del botón
function initNotificationButton() {
  const button = document.getElementById('notificationButton');
  button.addEventListener('click', requestNotificationPermission);

  // Verificar el estado actual del permiso
  if (Notification.permission === 'granted') {
    button.textContent = 'Notificaciones activadas';
    button.disabled = true;
  } else {
    button.textContent = 'Activar notificaciones';
  }
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', initNotificationButton);

// Manejar mensajes en primer plano
messaging.onMessage((payload) => {
  console.log('Mensaje recibido:', payload);
  // Aquí puedes mostrar la notificación al usuario
});