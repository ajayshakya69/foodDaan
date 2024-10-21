import React, { useState } from 'react';
import {publicAxios} from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import LogoNav from '../components/LogoNav';

const Register = () => {

  const [formdata, setFormdata] = useState({
    role: "",
    name: "",
    organization_name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState('');

  const [pending, setPending] = useState(false);

  const [isCaptcha, setCaptcha] = useState(false);

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name)
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formdata)
  };


  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Regex pattern
    return passwordCriteria.test(password);
  };



  const validateForm = () => {
    let error = "";

    if (!formdata.role) {
      return error = "Select Category";
    }
    if (!formdata.name) {
      return error = "Name is required";
    }

    if (!formdata.email) {
      return error = "Email is required";

    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      return error = "Email is invalid";
    }
    if (!formdata.password) {

      return error = "Password is required";

    }
    else if (!validatePassword(formdata.password)) {
      return error = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.";
    }
    else if (formdata.password !== formdata.confirmPassword) {
      return error = "Passwords do not match";
    }
    return error;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isCaptcha)



    const error = validateForm();

    if (error) {
      setError(error)
      return
    }
    if (!isCaptcha) {
      setError("Please verify capcha")
      return;
    }

    publicAxios
      .post("/auth/register", formdata)
      .then(res => {

        if (res.status === 201) {
          navigate("/login")
        }
      })
      .catch((err) => {


        if (err.response) {
          setError(err.response.data.errormessage || "An error occurred");
        } else if (err.request) {
          setError("No response received from the server.");
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setPending(false);
      });

  };



  return (
    <>
      <LogoNav />
      <div className="min-h-screen pt-20 pb-4 flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 transform flip-horizontal">
        <div className="w-full max-w-md p-8 ptb-6 space-y-8 bg-gray-800 bg-opacity-50 shadow-xl rounded-lg backdrop-blur-lg">
          <h2 className="text-3xl font-extrabold text-center text-white">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="category" className="block text-lg text-white">Category</label>
              <select
                id="category"
                name="role"
                value={formdata.role}
                onChange={handleChange}

                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="donor">donor</option>
                <option value="requester">requester</option>
                <option value="other">Other</option>
              </select>
            </div>


            <div className="relative">
              <label htmlFor="name" className="block text-lg text-white">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formdata.name}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>


            <div className="relative">
              <label htmlFor="organization_name" className="block text-lg text-white">Organization Name</label>
              <input
                id="organization_name"
                name="organization_name"
                type="text"
                value={formdata.organization_name}
                onChange={handleChange}

                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Enter Organization name"
              />
            </div>

            <div className="relative">
              <label htmlFor="address" className="block text-lg text-white">Organization Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formdata.address}
                onChange={handleChange}

                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Enter Organization Address" />
            </div>


            <div className="relative">
              <label htmlFor="email" className="block text-lg text-white">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={formdata.email}
                onChange={handleChange}

                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Enter Email"
              />
            </div>

            <div className="relative">
              <label htmlFor="phone" className="block text-lg text-white">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formdata.phone}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-lg text-white">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formdata.password}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Create Password"
              />
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-lg text-white">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formdata.confirmPassword}
                onChange={handleChange}

                className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>

            <div className="w-full flex items-center justify-center mb-4">
              <div className="flex items-center justify-between w-full max-w-md p-2 pl-5 border rounded-lg bg-gray-100">
                <div className="checkbox-wrapper-12">
                  <div className="cbx">
                    <input id="cbx-12" type="checkbox" onChange={() => setCaptcha(!isCaptcha)} />
                    <label htmlFor="cbx-12"></label>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                      <filter id="goo-12">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                        <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
                <button
                  type="button"
                  onChange={() => setCaptcha(!isCaptcha)}
                  className={`p-2 ml-4 text-white font-semibold rounded-lg transition-colors duration-300 ${isCaptcha ? 'bg-green-500' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {isCaptcha ? 'Verified!' : 'I am not a robot'}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-3 text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
                disabled={pending}
              >
                {pending ? 'Registering...' : 'Register'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          </form>
          <div className="text-center text-sm text-gray-300">
            <p>Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
