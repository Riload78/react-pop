import { authLoginPending, authLoginFulfilled, authLoginRejected } from '../actions'
const UseAuth = (credentials, isSessionSaved) => {
     return async function (
       dispatch,
       getState,
       { services: { auth }, router }
     ) {
       try {
         dispatch(authLoginPending())
         await auth.login(credentials, isSessionSaved)
         dispatch(
           authLoginFulfilled({ type: 'success', message: 'LOGIN SUCCESSFUL' })
         )
         const to = router.state.location.state?.from || '/'
         router.navigate(to, { replace: true })
       } catch (error) {
         dispatch(authLoginRejected({ type: 'error', message: error.message }))
       }
     }
}

export default UseAuth