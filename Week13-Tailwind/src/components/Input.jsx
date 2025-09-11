import React from 'react'

const Input = () => {
return (
  <div className="p-2">
    <input
      type="email"
      placeholder="Email Id"
      className="w-full rounded-xl border border-gray-500 bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

}

export default Input