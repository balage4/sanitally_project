const fetchWithAuth = async (url, token, method, body) => {
  fetch(url, {
    method,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body
  }).then(res => res.json());
}

export default fetchWithAuth;