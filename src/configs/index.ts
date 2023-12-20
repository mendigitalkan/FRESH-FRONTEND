export const CONFIG = {
  env: import.meta.env.VITE_APP_STAGE || 'development',
  base_url_api: import.meta.env.VITE_BASE_URL_API,
  local_storage_key: import.meta.env.VITE_LOCAL_STORAGE_KEY,
  authorization: {
    username: import.meta.env.VITE_AUTHORIZATION_USERNAME,
    passsword: import.meta.env.VITE_AUTHORIZATION_PASSWORD
  }
}
