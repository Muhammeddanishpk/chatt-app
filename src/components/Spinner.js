import React from 'react'
import { Audio, MutatingDots, ProgressBar, Puff } from 'react-loader-spinner'
 
function Spinner() {
  return (
    <div className='bg-[#03030341] absolute top-0 left-0 w-full h-screen flex justify-center items-center flex-row'>
     <ProgressBar
  height="100"
  width="100"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#30475E'
  barColor = '#7A0BC0'
/>
    </div>
  )
}

export default Spinner