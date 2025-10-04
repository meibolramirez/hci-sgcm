const KEY = 'hci_user'

export function setUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
}
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null
  } catch {
    return null
  }
}
export function logout() {
  localStorage.removeItem(KEY)
}
export function isLogged() {
  return !!getUser()
}
