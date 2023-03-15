export const getIsLogged = (state) => state.auth;

export const getAdvertsRedux = (state) => state.adverts.data;

export const areAdvertsLoaded = (state) => state.adverts.areLoaded;

export const getAdvertByIdRedux = (id) => (state) =>
  getAdvertsRedux(state).find((advert) => advert._id === id);

export const getUi = (state) => state.ui;

export const getApiTags = (state) => state.adverts.apiTags;
