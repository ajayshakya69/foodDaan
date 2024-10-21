import { useAuth } from '@/context/AuthProvider';
import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [showSubTopics, setShowSubTopics] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth()

  const navbarRef = useRef(null);
  const navigate = useNavigate()
  const handleToggleSubTopics = (topic) => {
    setShowSubTopics(showSubTopics === topic ? null : topic);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowSubTopics(null);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    console.log(user)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>

      <nav ref={navbarRef} className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 p-3 shadow-lg fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold mr-8">
            <Link to="/">Food Daan</Link>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-white focus:outline-none transition-all duration-400 ease-in-out ${isMenuOpen ? 'absolute right-full transform -translate-x-full' : 'absolute right-4'} lg:hidden`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <ul className={`flex flex-col lg:flex-row space-x-0 lg:space-x-6 text-white text-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen overflow-y-auto' : 'max-h-0 overflow-hidden'} lg:max-h-full lg:overflow-visible`}>
              <li>
                <Link to="/" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Home</Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link to="/dashboard" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Dashboard</Link>
                </li>


              )}
              <li>
                <Link to="/food-pantry" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Food Pantry</Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link to="/donation-form" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Donate Food</Link>
                </li>


              )}

              <li>
                <Link to="/leaderboard" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">LeaderBoard</Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/login" className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Login</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li>
                  <button onClick={() => {
                    onLogout();
                    navigate('/')
                  }} className="hover:text-yellow-300 transition duration-200 block p-2 lg:p-0">Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
