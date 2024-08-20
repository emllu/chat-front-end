import React from 'react'
import logo_pic from '../../assets/logo.png'
const logo = ({children}) => {
  return (
   <> <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
    <img src={logo_pic} alt='chat-app' width={180}
              height={60}/>
   </header>
   {
    children
    }
  
</>
  )
}

export default logo