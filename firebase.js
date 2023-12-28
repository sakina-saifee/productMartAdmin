import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js'



// Add Firebase products that you want to use
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getStorage, uploadBytesResumable, getDownloadURL, ref as sref } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
const firebaseConfig = {
      apiKey: "AIzaSyAU310lN1zbWINmANqwx0a-cUkdQA47njk",
      authDomain: "productmartdb.firebaseapp.com",
      projectId: "productmartdb",
      storageBucket: "productmartdb.appspot.com",
      messagingSenderId: "919638342079",
      appId: "1:919638342079:web:d53cccb50611b1cb8cc90a",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
export { app ,initializeApp, getAnalytics, getDatabase, ref, set, child, get, update, remove, getStorage, uploadBytesResumable, getDownloadURL, sref }