import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start gap-4 py-4 px-2'> 
      {children}
    </div>
  )
}

export default Container
