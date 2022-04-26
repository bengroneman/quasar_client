export const API_URL = 'http://localhost:8000/';
export function post(endpoint, data, auth_token) {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data || {}),
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`
    }
  }).then((r) => {
    return r.json()
  }).catch(err => console.error(err))

}

export function get(endpoint, auth_token) {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`
    }
  }).then((r) => {
    return r.json()
  }).catch(err => console.error(err));
}
