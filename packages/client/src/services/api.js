const  API_ROOT_URL = process.env.REACT_APP_API_ROOT_URL;

console.log(API_ROOT_URL);

export default {
  createTransaction: async (data) => {
    const endpoint = '/transactions';
    const options = {
      method: 'POST',
      body: {
        transaction: data
      }
    };
    return createApiFetch(endpoint, options);
  },
  deleteTransaction: async (id) => {
    const endpoint = `/transactions/${id}`;
    const options = {
      method: 'DELETE'
    };
    return createApiFetch(endpoint, options);
  },
  getTransaction: async (id) => {
    const endpoint = `/transactions/${id}`;
    return createApiFetch(endpoint);
  },
  listTransactions: async () => {
    const endpoint = '/transactions';
    return createApiFetch(endpoint);
  },
  updateTransaction: async (id, update) => {
    const endpoint = `/transactions/${id}`;
    const options = {
      method: 'PUT',
      body: { update }
    };
    return createApiFetch(endpoint, options);
  }
};

async function createApiFetch(endpoint, userDefinedOptions = {}) {
  const url = `${API_ROOT_URL}/api${endpoint}`;
  const defaultOptions = {
    method: 'GET'
  };
  let options = { ...defaultOptions, ...userDefinedOptions };
  if (options.method !== 'GET' && options.body) {
    options.body = JSON.stringify(options.body);
    if (options.headers) {
      options.headers['Content-Type'] = 'application/json';
    } else {
      options.headers = {
        'Content-Type': 'application/json'
      }
    }
  }
  console.log(url, options);
  const response = await fetch(url, options);
  return await response.json();
}
