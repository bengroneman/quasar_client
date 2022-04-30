async function send({ method, endpoint, data, token }) {
  const opts = { method, headers: {} };
  const apiUrl = 'http://ec2-3-141-37-250.us-east-2.compute.amazonaws.com:4081/';

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  if (token) {
    opts.headers['Authorization'] = `bearer ${token}`;
  }

  return fetch(`${apiUrl}${endpoint}`, opts)
    .then((r) => r.text())
    .then((json) => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return json;
      }
    });
}

export function get(endpoint, token) {
  return send({ method: 'GET', endpoint, token });
}

export function del(endpoint, token) {
  return send({ method: 'DELETE', endpoint, token });
}

export function post(endpoint, data, token) {
  return send({ method: 'POST', endpoint, data, token });
}

export function put(endpoint, data, token) {
  return send({ method: 'PUT', endpoint, data, token });
}
