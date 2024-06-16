import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import * as reducers from './reducers'
import * as actionCreators from './actions'
import { logger } from './middleware'
import { withExtraArgument } from 'redux-thunk'
import auth from '../pages/login/service'
import dataAdvert from '../pages/adverts/service'

const reducer = combineReducers(reducers)

const composeEnhancers = composeWithDevTools({ actionCreators })

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware( withExtraArgument({ services: {auth, dataAdvert}}), logger),
     ) 

  )

  return store
}
