import client from '../../api/client.js';

const advertsUrl = '/anuncios';

export const getAdverts = () => {
  const url = advertsUrl;
  return client.get(url);
};

export const getAdvertById = (id) => {
  const url = `${advertsUrl}/${id}`;
  return client.get(url);
};

export const deleteAdvertById = (id) => {
  const url = `${advertsUrl}/${id}`;
  return client.delete(url);
};

export const createAdvert = (formData) => {
  const config = { 'Content-Type': 'multipart/form-data' };
  const url = `${advertsUrl}`;
  return client.post(url, formData, config);
};

export const editAdvert = (formData, id) => {
  const config = { 'Content-Type': 'multipart/form-data' };
  const url = `${advertsUrl}/${id}`;
  return client.put(url, formData, config);
};

export const getTags = () => {
  const url = `${advertsUrl}/tags`;
  return client.get(url);
};
