import React from 'react'
import { Oval } from 'react-loader-spinner'

function Ovalspinner() {
  return (
    <div className='absolute oval bg-[#03030341] rounded-lg z-50 w-full h-full flex items-center justify-center'>
      <Oval
  height={100}
  width={80}
  color="#fff"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#000"
  strokeWidth={3}
  strokeWidthSecondary={2}

/>
    </div>
  )
}

export default Ovalspinner