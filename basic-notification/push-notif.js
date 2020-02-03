var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BK8A9X3r7flsZogn9hJdZ00SCBWuua9rkqPFmq5gNcBVcVdJj5046pX7nxme9P_r7_-uIfcjKhbJa3CT8bm3b50",
   "privateKey": "8efYEMhtnsBDYQ3_zbr7-m0fdOkVp2gvNw80lwKy2D4"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fODc32ITPaY:APA91bFdpdlh6FoTwP5uByPeuJikSpaSO_b7DH-79RFHXfOOEs-zEr8kSnQhogD-OHBlL7up_2v0_58ftSFq_yz7rBqksm2-jzMUBUf3nSTUfj12MCXVam_BSiMD_1fs2AlWvbkQLUee",
   "keys": {
       "p256dh": "BL7HaMh9x+W+8QxBiq+j0llH6zsNDZ03kxyFzo4Laq+GuaWW/sxdsD9UYfXHSHSQ1g12B2pqJgPG7T4Hz0aqOLM=",
       "auth": "Om42xbK9w9PU9kyVTgVGeA=="
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