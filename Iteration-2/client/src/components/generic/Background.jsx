import React from 'react'

function Background({ children }) {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute -top-12 -left-10 w-[105%] h-2/5 -rotate-3 bg-gradient-to-tr from-green-200 to-blue-300 blur-2xl"></div>
      {children}
    </div>
  )
}

export default Background