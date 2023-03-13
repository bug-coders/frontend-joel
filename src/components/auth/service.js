import client, { removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client.js';
import storage from '../../utils/storage.js';

export const login = async (credentials, rememberMe) => {
  const accessToken = await client.post('/login', credentials);
  console.log('service - front', accessToken);
  if (rememberMe === true) {
    storage.set('Auth', accessToken);
  }
  return setAuthorizationHeader(accessToken);
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove('Auth');
};
