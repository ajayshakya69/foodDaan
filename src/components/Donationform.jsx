import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import{ publicAxios }from '../lib/axios';
import { Button } from "./ui/button"

const DonationForm = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    quantity: 1,
    expirationDate: '',
    location: '',
    donatedBy: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.foodName) {
      setError("Provide food name")
      return
    }

    if (formData.quantity < 1) {
      setError("quantity can't be zero")
      return
    }

    if (formData.quantity < 1) {
      setError("quantity can't be zero")
      return
    }

    const selectedDate = new Date(formData.expirationDate);

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    if (!formData.expirationDate) {
      setError("Expiration date is required")
      return
    }
    else if (selectedDate < today) {
      setError("Expiration date must be in the future")
      return
    }

    if (!formData.location) {
      setError("Please provide location")
      return
    }









    publicAxios
      .post("/food/create", formData)
      .then(res => {
        if (res.status == 201) {
          setShowPopup(true)
          setFormData({
            foodName: '',
            description: '',
            quantity: 1,
            expirationDate: '',
            location: '',
            donatedBy: '',
          });
        }
      })
      .catch(err => {
        console.log(err.response.data)
      }).finally(()=> setDonorId())




  };


  function setDonorId(){
    const userData = JSON.parse(localStorage.getItem('loggingUser'));

    setFormData(prevData => ({
      ...prevData,
      donatedBy: userData._id
    }));
  }
  useEffect(() => {

   
    setDonorId();
  }, [])



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 pt-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Donation Form</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">Food Name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Food Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

            </textarea>


          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="1"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Donator Location</label>
            <input
              type="text"
              name='location'
              onChange={handleChange}
              value={formData.location}
              className="mt-1 w-full  border-2 py-2 px-4 rounded-md  "
            />


          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Donate
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-4 text-center">Donated!</h1>
            <h2 className="text-lg mb-4 text-center">You are a true Superhero of our nation</h2>
            <div className="flex gap-5 align-baselin justify-center">
              <Button onClick={()=>setShowPopup(false)}>Donate more</Button>
              <Button onClick={()=>navigate('/dashboard')}>Dashboard</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
