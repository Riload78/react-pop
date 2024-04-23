import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import AdvertsPage from '../pages/adverts/AdvertsPage'
import AdvertPage from '../pages/adverts/AdvertPage'
import NewAdvertPage from '../pages/adverts/NewAdvertPage'
import NotFound from '../pages/NotFound'
import RequiredLogin from '../components/RequireLogin'
import { useAuth } from '../pages/login/context'


const RootRouter = () => {
  const {isLogged} = useAuth()
  return (
    <>
      
        <Routes>
          <Route
            path='/login'
            element={!isLogged ? <LoginPage /> : <Navigate to='/' />}
          ></Route>
          <Route
            path='/adverts'
            element={
              <RequiredLogin>
                <Outlet />
              </RequiredLogin>
            }
          >
            <Route index element={<AdvertsPage />} />
            <Route path=':advertId' element={<AdvertPage />} />
            <Route path='new' element={<NewAdvertPage />} />
          </Route>
          <Route path='/' element={<Navigate to='/adverts' />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
     
    </>
  )
}

export default RootRouter
