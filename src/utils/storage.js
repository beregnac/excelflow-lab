export function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.error('Ошибка сохранения в localStorage:', err)
    return false
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key)
}
