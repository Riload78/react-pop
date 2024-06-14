
export const getIsLogin = state => state.auth
export const getIsLogout = state => !state.auth

export const getIsLoading = state => state.ui.loading
export const getIsNotification = state => state.ui.notification

export const getIsSaved = state => state.session


export const getAdverts = state => state.adverts
export const isAdvertsLoaded = state => state.adverts.loaded
export const getAdvert = advertId => state =>{
  const adverts = state => state.adverts.data
  return adverts(state).find(advert => advert.id === advertId)
}


export const getTags = state => state.adverts.tags 
