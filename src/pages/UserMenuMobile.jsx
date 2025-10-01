import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from 'react-icons/io5'

const UserMenuMobile = () => {
  return (
    <div className='h-full w-full py-8 px-2'>
      <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto mt-3'>
        <IoClose size={25} />
      </button>
      <div className='container mx-auto p-3 pb-8'>
        <UserMenu/>
      </div>
    </div>
  )
}

export default UserMenuMobile