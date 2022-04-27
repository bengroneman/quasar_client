// const API_URL = process.env.MODE === "DEV" ? 'http://localhost:8000/' : 'http://ec2-3-141-37-250.us-east-2.compute.amazonaws.com:4081/';
export const API_URL = 'http://localhost:8000/'
// export const API_URL = 'http://ec2-3-141-37-250.us-east-2.compute.amazonaws.com:4081/'
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
  })
    .then((r) => {
      return r.json();
    })
    .catch((err) => console.error(err));
}

export function get(endpoint, auth_token) {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`
    }
  })
    .then((r) => {
      return r.json();
    })
    .catch((err) => console.error(err));
}
