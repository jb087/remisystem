export const getUrl = (endpoint) => `https://remisystem-api.herokuapp.com/api/${endpoint}`;
export const socketUri = 'https://remisystem-api.herokuapp.com';

export const getRequestInit = (token, init) => ({
  headers: new Headers({
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  ...init,
});
