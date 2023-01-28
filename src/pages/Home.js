import React, { useState } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

function Home() {
  let [click,setClick]=useState(true)
  let [welcome,setWelcome]=useState(false)
  let [user,setUser]=useState(null)

  return (
    <div className='bg-[#4a5a6c] h-screen flex items-center justify-center'>
        <div className="relative border-none sm:border  border-solid border-transparent sm:w-full w-full h-screen  flex sm:h-screen overflow-hidden">
          <Sidebar user={setUser} click={click} setWelcome={setWelcome} set={setClick} />
          <Chat danishMon={user} welcome={welcome} setClick={setClick}/>
        </div>
    </div>
  )
}

export default Home