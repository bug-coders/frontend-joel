import client, { removeAuthorizationHeader, setAuthorizationHeader } from '../../api/client.js';
import storage from '../../utils/storage.js';

export const login = async (credentials, rememberMe) => {
  const data = await client.post('/login', credentials);
  const accessToken = data.JWTtoken;
  const user = data.user;

  if (rememberMe === true) {
    storage.set('Auth', accessToken);
    storage.set('User', user);
  }

  setAuthorizationHeader(accessToken);
  return user;
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove('Auth');
  storage.remove('User');
};
