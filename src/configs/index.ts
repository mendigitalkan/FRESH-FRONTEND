export const CONFIGS = {
  env: import.meta.env.VITE_APP_STAGE || 'development',
  baseUrl: import.meta.env.VITE_BASE_URL_API,
  localStorageKey: import.meta.env.VITE_LOCAL_STORAGE_KEY,
  tokenKey: import.meta.env.VITE_TOKEN_KEY,
  authorization: {
    username: import.meta.env.VITE_AUTHORIZATION_USERNAME,
    passsword: import.meta.env.VITE_AUTHORIZATION_PASSWORD
  }
}
