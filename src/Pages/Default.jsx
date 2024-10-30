
import { Link } from 'react-router-dom'

const Default = () => {
  return (
    <div className='flex flex-col justify-center w-[800px] items-center pt-72'>
      <h1 className='green-text'>Your need to Login or Register</h1>
        <div className='flex gap-20 mt-10'>
            <Link to='/auth/register' className='green-btn'>Register</Link>
            <Link to='/auth/login' className='green-btn'>Login</Link>
        </div>
    </div>
  )
}

export default Default
