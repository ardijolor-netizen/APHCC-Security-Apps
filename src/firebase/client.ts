// src/firebase/client.ts
// Firebase client-side initialization for browser
// Hanya dijalankan di client, bukan di API route / server

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./config";

// Initialize Firebase (browser only)
initializeApp(firebaseConfig);

export { getAuth };
