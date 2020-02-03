var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fpcO_VbPwug:APA91bGA43WoMTWqDlqN5vVKC2LesrNJfeMN9l2tuCJDuk3PnAYce04ONb2Edv2sQme6kAJbM7lFM180tKVHu3o1Ji1Kdt6mCBzu1rUuTYjKFNpp_-PXDVIih1sGeCzH52txqNCIqbqQ",
    "keys": {
        "p256dh": "BPq4y7mVrvxtTKUUTtoSD5ZdzT+63Uizs9rB7IXg9YjwaCfpwkl9sgOw+mdr3jNX14qbtffWPv3fKdBoZtJG4EY=",
        "auth": "VGfuAl1/4TIGa22GhRiUQA=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAANT9kIrA:APA91bGRWmTccPx7z2PU0GT0uMM-XBf_yQcKGIgX_3NE3h33Yuq60UW0iiclvE68PjoS5X37_JAZ90eNpkdIxK3j1rGti4RYZ4b8qbCZElWUR3esYej2j7C6n-0Lq-2EIw6hV_7pCNRK',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);