import { BellIcon } from 'lucide-react'
import React from 'react'

const NotificationsFound = () => {
  return (
    <div className='flex flex-col items-center
    justify-center py-16 text-center'>
        <div className='size-16 text-base-content opacity-40'>
            <BellIcon className='size-8 text-base-content opacity-40'/>
        </div>
        <h3 className='text-lg font-semibold mb-2'>No notifications yet</h3>
        <p className='text-base-content opacity-70 max-w-md'>When  you recieve friends request and message ,they will be appear heare</p>
    </div>
  )
}

export default NotificationsFound