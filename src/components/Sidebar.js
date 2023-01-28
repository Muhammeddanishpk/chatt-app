import React, { useState } from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

function Sidebar({click,set,user,setWelcome}) {
  const [us,setUs] = useState(null)
  user(us) 
  return (
    <div className={click ? ' -translate-x-[0px] ease-in duration-100 flex-[1] block sm:static h-full z-[999] absolute w-full bg-[#363e47]':'flex-[1]  translate-x-[850px] sm:-translate-x-[0px] ease-in duration-100 sm:block sm:static h-full absolute w-full bg-[#363e47]'} >
      <Navbar/>
      <Search setUs={setUs}/>
      <Chats setWelcome={setWelcome} set={set}/>
      </div>
  )
}

export default Sidebar