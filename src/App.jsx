import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Donationform from './components/Donationform';
import RequestFood from './components/RequestFood';
import FoodDetailPage from './components/FoodDetailPage'; // New Import
import Leaderboard from './components/Leaderboard';
import HelpUs from './components/HelpUs';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Loader from './components/Loader';

import { useLoader } from "./context/LoaderProvider"
import Dashboard from './components/dashboard/Dashboard';
import HomePage from './components/dashboard/Home';
import ProfilePage from './components/dashboard/Profile';
import ProtectedRoute from './context/ProtectedRoute';
import FoodRequest from './components/dashboard/FoodRequest';
import Donations from './components/dashboard/Donations';










const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loader = useLoader();



  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    const loggedInStatus = localStorage.removeItem('loggingUser');

  };

  useLayoutEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);





  const router = createBrowserRouter([
    {
      path: "/login",
      element: (<Login onLogin={handleLogin} />)
    },
    {
      path: "/register",
      element: <Register />
    },
    {

      path: "/",
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Loader show={loader.loading} />
        </>
      ),
      children: [

        {
          path: "/",
          element: <Home isLoggedIn={isLoggedIn} key={Math.random()} />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/donation-form",
          element: <Donationform />
        },

        {
          path: "/food-pantry",
          element: <RequestFood />
        },

        {
          path: "/food-detail/:id",
          element: <FoodDetailPage />
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />
        },
        {
          path: "/helpus",
          element: <HelpUs />
        },

      ]
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Dashboard />
          <Loader show={loader.loading} />
        </>

      ),
      children: [
        {
          path: "",
          element: <HomePage/>,
        },
        {
          path: "food-requests",
          element: <FoodRequest/>,
        },
        {
          path: "your-donations",
          element: <Donations/>,
        },
        {
          path: "user/profile",
          element: <ProfilePage/>,
        },
      ],
    },
    {
      path: "/*",
      element: <ErrorPage />
    },

  ])



  return (
    <>

      <RouterProvider router={router} />
    </>

  );
};

export default App;
