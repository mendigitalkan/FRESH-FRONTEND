export const CONFIGS = {
  env: import.meta.env.VITE_APP_STAGE || 'development',
  baseUrl: 'https://jasaapk.us/fresh/api/v1', //'http://localhost:8008/api/v1'
  localStorageKey: 'qwerty',
  uploadFileUrl: 'https://jasaapk.us/storage/api/v1/fresh',
  tokenKeyLocalStorage: 'qwerty',
  tokenSecret: 'qwerty'
}
