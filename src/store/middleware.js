export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action, store.getState())
  const result = next(action)
  console.log('final state', store.getState())
  console.groupEnd()
  return result
}
