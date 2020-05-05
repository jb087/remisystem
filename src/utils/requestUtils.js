export const getUrl = (endpoint) => `http://localhost:9000/api/${endpoint}`;

export const getRequestInit = (token, init) => ({
  headers: new Headers({
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  ...init,
});
