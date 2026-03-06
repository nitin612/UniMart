import API from './Api';

export const register = async (name, email, password) => {
  const res = await API.post('api/auth/register', { name, email, password });
  return res.data;
};
