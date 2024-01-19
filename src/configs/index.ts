export const CONFIGS = {
  env: import.meta.env.VITE_APP_STAGE || 'development',
  baseUrl: import.meta.env.VITE_BASE_URL_API,
  localStorageKey: import.meta.env.VITE_LOCAL_STORAGE_KEY,
  tokenKeyLocalStorage: import.meta.env.VITE_TOKEN_KEY_LOCAL_STORAGE,
  tokenSecret: import.meta.env.VITE_TOKEN_SECRET,
  authorization: {
    username: import.meta.env.VITE_AUTHORIZATION_USERNAME,
    passsword: import.meta.env.VITE_AUTHORIZATION_PASSWORD
  }
}

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBr5A5kQ1Dak_VeVbEcJYeoCi_g8XUVmWU',
  authDomain: 'toren-itera.firebaseapp.com',
  projectId: 'toren-itera',
  storageBucket: 'toren-itera.appspot.com',
  messagingSenderId: '971511034983',
  appId: '1:971511034983:web:4f67c76d98b8baa9fb50c2'
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export const firebaseConfigs = {
  storage
}
