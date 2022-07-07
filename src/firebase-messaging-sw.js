importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '733857077930',
  "apiKey": "AIzaSyDUHQO1EQ1XBLp--_q4t-0bE_wfvkLFND0",
  "authDomain": "osraty-f07cc.firebaseapp.com",
  "databaseURL": "https://osraty-f07cc.firebaseio.com",
  "projectId": "osraty-f07cc",
  "storageBucket": "osraty-f07cc.appspot.com"
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

