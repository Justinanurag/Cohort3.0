import React from 'react'

const SideBar = () => {
  return (
<div className="flex">
  {/* Sidebar */}
  <div className="transition-all duration-300 transform w-0 h-screen bg-red-300 md:w-96">
    Sidebar
  </div>

  {/* Content */}
  <div className="bg-amber-500 flex-1 h-screen">Content</div>
</div>

  )
}

export default SideBar