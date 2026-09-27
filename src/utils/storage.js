export const getStorage = (key, type = 'local') => {
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch {
    console.warn(`Storage access blocked or failed for key: ${key}`)
    return null
  }
}

export const setStorage = (key, value, type = 'local') => {
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    storage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn(`Storage access blocked or failed for key: ${key}`)
  }
}

export const removeStorage = (key, type = 'local') => {
  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage
    storage.removeItem(key)
  } catch {
    console.warn(`Storage access blocked or failed for key: ${key}`)
  }
}
