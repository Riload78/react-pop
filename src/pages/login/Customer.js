import { ReactComponent as UserIcon } from '../../assets/images/user.svg'
import auth from './service'
import { useEffect, useState } from 'react'

const Customer = () => {
  const [userName, setUserName] = useState('')
  const token = localStorage.getItem('auth')
  useEffect(() => {
    const user = async () => {
      try {
        const response = await auth.getUserInfo()
        console.log(response)
        setUserName(response.name)
      } catch (error) {
        console.log(error)
      }
    }
    user()
  }, [token])
  return (
    <div className='d-flex align-items-center gap-2'>
      <UserIcon width='30' height='30' fill='#F2F2F2' />
      {userName}
    </div>
  )
}

export default Customer
