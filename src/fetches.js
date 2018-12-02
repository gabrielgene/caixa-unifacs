const handleHttpStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw res;
};

const createErrorHandler = defaultValue => res => {
  console.error('request failed', res);
  return defaultValue;
};

export const createUser = user => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/user', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const createCustomer = customer => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/client', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(customer),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const createProduct = product => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/product', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const authOperator = auth => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/auth/operator', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(auth),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const authAdmin = auth => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/auth/admin', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(auth),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const getProducts = () => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/product', {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler([]));
};

export const getClients = () => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/client', {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler([]));
};

export const submitPurchase = purchase => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/history', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(purchase),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const getHistory = () => {
  return fetch('https://caixa-unifacs.herokuapp.com/api/history', {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler([]));
};
