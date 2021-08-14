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

const {
  REACT_APP_BACKEND_PROTOCOL,
  REACT_APP_BACKEND_HOST,
  REACT_APP_BACKEND_PORT,
  REACT_APP_BACKEND_ROUTE,
} = process.env;


const backend = {
  endpoint: `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/${REACT_APP_BACKEND_ROUTE}`
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

function getServiceIdByName(servicesArray, serviceName) {
  let serviceId;
  servicesArray.forEach(service => {
    if (service.serviceName === serviceName) {
      serviceId = service._id;
    }
  });

  return serviceId;
}

function getServiceNameById(serviceArray, serviceId) {
  let serviceName;
  serviceArray.forEach(service => {
    if (serviceId === service._id) {
      serviceName = service.serviceName;
    }
  });
  return serviceName;
}

export default fetchWithAuth;
export { months, backend, getServiceIdByName, getServiceNameById };