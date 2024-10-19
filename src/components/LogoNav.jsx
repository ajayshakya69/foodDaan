import React from 'react'
import { Link } from 'react-router-dom'

export default function LogoNav() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 p-3 shadow-lg fixed w-full z-50">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white text-2xl font-bold mr-8">
        <Link to="/">Food Daan</Link>
      </div>
    </div>
  </div>
  )
}
