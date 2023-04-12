export function setKey(key, value) {
  localStorage.setItem(key, value);
}

export function getValueForKey(key) {
  return localStorage.getItem(key);
}

export function deleteKey(key) {
  return localStorage.removeItem(key);
}
