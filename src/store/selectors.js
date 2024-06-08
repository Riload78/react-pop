export const getIsLogin = state => state.auth
export const getIsLogout = state => !state.auth

export const getIsLoading = state => state.ui.loading

export const getIsSaved = state => state.session


export const getAdverts = state => state.adverts
export const getAdvert = advertId => state =>
  getAdverts(state).find(advert => advert.id === advertId)

export const getTags = state => state.adverts.tags
