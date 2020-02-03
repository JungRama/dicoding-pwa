var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLGf9t5wPnJe_o8NB4gi9j8j8x03osUGFpIJ2Pi-KXMzMNpkYmuqEbS4But8ke1L9XIm5tYKhMNt-8Y0xjqB_SI",
   "privateKey": "FhbRQ-O36KjFmIxvU_t36Nn1dvP2Gk-T2MjS81CAvCg"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fa7JUPBXnJw:APA91bF_bIEWexhHfjidUUuWF0rwdeBuWgBzUy6aKk6DWiq6OQNSLoaJWArObySvp3A17zcaruK-pqysQcBA4KZI38Tb-MbFU7l-T67X67Zi1lQ6CW0FNzhM669-id701XekQ2ppUN5k",
   "keys": {
       "p256dh": "BHI96ab4n8Kh/8i5lXASRFNUBinbi3ofbHo548wl3AaOCE9b70/bVxQtfA+ZDZTUzo9WxoExPyeuhRjy6/hHM7g=",
       "auth": "zxpaPkTLNF4oqhf0yI2STw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '30539954323',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);