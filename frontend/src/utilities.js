const fetchWithAuth = async (url, token, requestMethod, requestBody) => {
  const response = await fetch(url, {
    method: requestMethod,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: requestBody
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export default fetchWithAuth;