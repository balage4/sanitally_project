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

const months = [
  'január',
  'február',
  'március',
  'április',
  'május',
  'június',
  'július',
  'augusztus',
  'szeptember',
  'október',
  'november',
  'december'
]

export default fetchWithAuth;
export { months };