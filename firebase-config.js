// firebase-config.js
// Shared Firebase initialization. Import this in any page that needs Firebase.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAoh-7DL7O3QeZJB30Z3rsr-Qoi-XiLXk",
  authDomain: "rsvp-wedsite.firebaseapp.com",
  projectId: "rsvp-wedsite",
  storageBucket: "rsvp-wedsite.firebasestorage.app",
  messagingSenderId: "757710520275",
  appId: "1:757710520275:web:7bfbc20b3ee155ce24f926",
  measurementId: "G-47JJPW1L49"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics can fail silently in some environments (e.g. localhost without internet),
// so wrap it just in case.
try {
  getAnalytics(app);
} catch (e) {
  console.warn("Analytics not initialized:", e);
}
