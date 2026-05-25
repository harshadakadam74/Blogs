import React from 'react'

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <div>
      <h1>Welcome to the React App!</h1>
    </div>
  )
}

export default App
