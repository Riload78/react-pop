import { advertMaxPriceFulfilled } from './actions'

export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action, store.getState())
  const result = next(action)
  console.log('final state', store.getState())
  console.groupEnd()
  return result
}

export const maxPrice = store => next => action => {
  if (action.type === 'ADVERTS_GET_FULFILLED') {
    const maxPrice = action.payload.reduce(
      (max, advert) => (advert.price > max ? advert.price : max),
      0
    )
    store.dispatch(advertMaxPriceFulfilled(maxPrice))
  }
  return next(action)
}
