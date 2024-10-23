import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate, Link } from 'react-router-dom';
import { publicAxios } from '../lib/axios';
import LogoNav from '../components/LogoNav';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCaptchaVerified, setisCaptchaVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [pending, setPending] = useState(false)



  const handleCaptcha = (e) => {
    setisCaptchaVerified(e.target.checked);
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      return true;
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true)

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setPending(false);
      setisCaptchaVerified(false);
      return;
    }
    if (!isCaptchaVerified) {
      setError('Please verify that you are human.');
      setPending(false);
      setisCaptchaVerified(false);
      return;
    }
    setError('');

    publicAxios
      .post("/auth/login", { email, password })
      .then(res => {
        console.log(res)

        if (res.status == 200) {
          localStorage.setItem("loggingUser", JSON.stringify(res.data.user));
         
          onLogin();

          navigate('/');

          navigate(0);
        }
      })

      .catch(error => {
        setPassword('');
        setisCaptchaVerified(false);
        if (error.response) {

          if (error.response.status === 401) {
            setError('invalid credentials');
          } else {

            setError(error.response.data.errorMessage || 'An error occurred. Please try again.');
          }
        } else if (error.request) {

          setError('No response from server. Please try again later.');
        } else {

          setError('Error: ' + error.message);
        }


        setPassword('');
        setisCaptchaVerified(false);
      })
      .finally(() => {
        setPending(false);
        console.log('pending false')
      });

  };

  console.log(pending)

  return (
    <>
      <LogoNav />
      <div className="min-h-screen pt-12 flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900">



        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-50 shadow-xl rounded-lg backdrop-blur-lg">
          <h2 className="text-3xl font-extrabold text-center text-white">Login to Your Account</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Phone */}
            <div className="relative">
              <label htmlFor="email" className="block text-lg text-white">Email</label>
              <div className="flex items-center border rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
                <span className="px-3 text-blue-400">
                  <i className="fas fa-user" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-lg text-white">Password</label>
              <div className="flex items-center border rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-purple-500 transition duration-300">
                <span className="px-3 text-purple-400">
                  <i className="fas fa-lock" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 text-gray-900 placeholder-gray-500 bg-gray-100 focus:outline-none"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>
            {/* CAPTCHA */}
            <div className="w-full flex items-center justify-center mb-4">
              <div className="flex items-center justify-between w-full max-w-md p-2 pl-5 border rounded-lg bg-gray-100">
                <div className="checkbox-wrapper-12">
                  <div className="cbx">
                    <input
                      id="cbx-12"
                      type="checkbox"
                      checked={isCaptchaVerified}
                      onChange={handleCaptcha}
                    />
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
                  onClick={handleCaptcha}
                  className={`p-2 ml-4 text-white font-semibold rounded-lg transition-colors duration-300 ${isCaptchaVerified ? 'bg-green-500' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  {isCaptchaVerified ? 'Verified!' : 'I am not a robot'}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
                disabled={pending}
              >
                {pending ? "Logging in..." : "login"}
              </button>
            </div>
          </form>
          {/* Additional Links */}
          <div className="text-center text-sm text-gray-300">
            <p>Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
