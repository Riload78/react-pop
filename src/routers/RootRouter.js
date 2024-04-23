import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import AdvertsPage from '../pages/adverts/AdvertsPage'
import AdvertPage  from '../pages/adverts/AdvertPage';
import NewAdvertPage from '../pages/adverts/NewAdvertPage';
import NotFound from '../pages/NotFound';
const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/adverts' element={<Outlet />}>
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertPage />} />
          <Route path='new' element={<NewAdvertPage />} />
        </Route>
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' />}/>
       
      </Routes>
    </>
  )
}

export default RootRouter
