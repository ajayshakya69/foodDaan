import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Donationform from './components/Donationform';
import RequestFood from './components/RequestFood';
import FoodDetailPage from './components/FoodDetailPage'; // New Import
import ReceivedFood from './components/ReceivedFood';
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
import DataTable from './components/dashboard/Datatable';
import HomePage from './components/dashboard/Home';
import ProfilePage from './components/dashboard/Profile,';
import ProtectedRoute from './context/ProtectedRoute';



const donationsData = [
  { id: 1, name: "Rice", expiryDate: "2024-05-01", quantity: 50, category: "Grains" },
  { id: 2, name: "Beans", expiryDate: "2024-06-15", quantity: 30, category: "Legumes" },
  { id: 3, name: "Pasta", expiryDate: "2024-07-30", quantity: 40, category: "Grains" },
  { id: 4, name: "Canned Tomatoes", expiryDate: "2024-08-20", quantity: 25, category: "Canned Goods" },
  { id: 5, name: "Olive Oil", expiryDate: "2024-12-31", quantity: 15, category: "Oils" },
];

const requestsData = [
  { id: 1, name: "Bread", expiryDate: "2024-04-20", quantity: 20, category: "Bakery" },
  { id: 2, name: "Milk", expiryDate: "2024-04-25", quantity: 15, category: "Dairy" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 1, name: "Bsdfsadfasdread", expiryDate: "2024-04-20", quantity: 20, category: "Bakery" },
  { id: 2, name: "Milk", expiryDate: "2024-04-25", quantity: 15, category: "Dairy" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 1, name: "Bresdfasdfasad", expiryDate: "2024-04-20", quantity: 20, category: "Bakery" },
  { id: 2, name: "Milk", expiryDate: "2024-04-25", quantity: 15, category: "Dairy" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 1, name: "Breasdafsadfasd", expiryDate: "2024-04-20", quantity: 20, category: "Bakery" },
  { id: 2, name: "Milk", expiryDate: "2024-04-25", quantity: 15, category: "Dairy" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 3, name: "Egsdfasdfgs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
  { id: 1, name: "Bread", expiryDate: "2024-04-20", quantity: 20, category: "Bakery" },
  { id: 2, name: "Mdsfadsfailk", expiryDate: "2024-04-25", quantity: 15, category: "Dairy" },
  { id: 3, name: "Eggs", expiryDate: "2024-05-05", quantity: 25, category: "Dairy" },
  { id: 4, name: "Apples", expiryDate: "2024-05-10", quantity: 30, category: "Fruits" },
  { id: 5, name: "Chicken", expiryDate: "2024-05-15", quantity: 10, category: "Meat" },
];





const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  address: "123 Main St, Anytown, USA",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Passionate about reducing food waste and helping those in need.",
  joinDate: "January 15, 2023",
  totalDonations: 45,
};





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
          path: "/received-food",
          element: <ReceivedFood />
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
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <HomePage requestsData={requestsData} />,
        },
        {
          path: "food-requests",
          element: <DataTable data={requestsData} title="Food Requests" />,
        },
        {
          path: "your-donations",
          element: <DataTable data={donationsData} title="Your Donations" />,
        },
        {
          path: "profile",
          element: <ProfilePage userProfile={userProfile} />,
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
