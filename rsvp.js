// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAoh-7DL7O3QeZJB30Z3rsr-Qoi-XiLXk",
  authDomain: "rsvp-wedsite.firebaseapp.com",
  projectId: "rsvp-wedsite",
  storageBucket: "rsvp-wedsite.firebasestorage.app",
  messagingSenderId: "757710520275",
  appId: "1:757710520275:web:7bfbc20b3ee155ce24f926",
  measurementId: "G-47JJPW1L49"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// rsvp.js
import { db } from "./firebase-config.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const rsvpForm = document.getElementById("rsvpForm");

// Turn a name into a safe, predictable document ID
// e.g. "Juan Dela Cruz" -> "juan-dela-cruz"
function nameToId(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = rsvpForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.textContent;

    const name = document.getElementById("name").value.trim();
    const attending = document.getElementById("attending").value;
    const guestCount = parseInt(document.getElementById("guestCount").value, 10) || 1;
    const guestNameRaw = document.getElementById("guestName").value.trim();

    // Split comma-separated names into a clean array
    const guestNames = guestNameRaw
      ? guestNameRaw.split(",").map((n) => n.trim()).filter((n) => n.length > 0)
      : [];

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    const docId = nameToId(name);

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      await setDoc(doc(db, "rsvps", docId), {
        name,
        attending,
        guestCount,
        guestNames,
        updatedAt: serverTimestamp()
      });

      submitBtn.textContent = "Submitted!";
      alert("Thank you! Your RSVP has been recorded.");
      rsvpForm.reset();
      document.getElementById("guestCount").value = 1;
    } catch (err) {
      console.error("Error saving RSVP:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }, 1500);
    }
  });
}
