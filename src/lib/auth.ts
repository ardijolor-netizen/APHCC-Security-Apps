// src/lib/auth.ts
// Firebase Auth helpers - digunakan di server-side (API route)

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cert } from "firebase-admin/app";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function initAdmin() {
  if (initializeApp) {
    if (serviceAccountPath) {
      const key = require(resolve(process.cwd(), serviceAccountPath));
      initializeApp({ credential: cert(key) });
    } else {
      // Hanya bisa digunakan jika sudah deployed dengan env
      initializeApp();
    }
  }
}

initAdmin();

export async function verifyIdToken(idToken: string) {
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    return decoded;
  } catch (error) {
    console.error("Firebase token verification failed:", error);
    return null;
  }
}

export function getAdminUser() {
  // Di API route, Firebase Admin auth di dalam route handler
  return getAuth();
}
