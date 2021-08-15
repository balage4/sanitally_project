/* eslint-disable no-param-reassign */
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

function setEventsEndpoint(user) {
  let eventsEndpoint;
  if (user.role === 'admin') {
    eventsEndpoint = `${backend.endpoint}/events`
  } else if (user.role === 'provider') {
    eventsEndpoint = `${backend.endpoint}/provider/events/${user.email}`;
  } else {
    eventsEndpoint = `${backend.endpoint}/events/${user.email}`;
  }
  return eventsEndpoint;
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

function listOfEventsStringify(events, users, services) {
  const out = JSON.parse(JSON.stringify(events));
  out.forEach(event => {
    users.forEach(userResp => {
      if (event.userId === userResp._id) {
        event.userName = `${userResp.lastName} ${userResp.firstName}`;
      }
      if (event.eventProvider === userResp._id) {
        event.eventProvider = `${userResp.lastName} ${userResp.firstName}`;
      }
    })
    services.forEach(serviceResp => {
      if (event.eventService === serviceResp._id) {
        event.eventService = serviceResp.serviceName;
      }
    });
  });
  return out;
}
function listOfPrescriptionsStringify(prescriptions, users) {
  const out = JSON.parse(JSON.stringify(prescriptions));
  out.forEach(prescription => {
    users.forEach(userResp => {
      if (prescription.prescriptionFor === userResp._id) {
        prescription.prescriptionFor = `${userResp.lastName} ${userResp.firstName}`;
      }
      if (prescription.prescriptionFrom === userResp._id) {
        prescription.prescriptionFrom = `${userResp.lastName} ${userResp.firstName}`;
      }
    })

  });
  return out;
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
export {
  months,
  backend,
  getServiceIdByName,
  getServiceNameById,
  setEventsEndpoint,
  listOfEventsStringify,
  listOfPrescriptionsStringify
};