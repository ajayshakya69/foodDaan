import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { useCount } from '../context/CountProvider';



const data = {
  donors: 1023,
  foodPackets: 45789,
  communityMembers: 5890,
  partners: [
    { name: 'Tata', logo: 'Tata.png' },
    { name: 'Zomato', logo: 'Zomato.jpg' },
    { name: 'WorldFoodProgramme', logo: 'WFP.png' },
    { name: 'Zepto', logo: 'Zepto.jpg' },
    { name: 'GovOrg1', logo: 'GovOrg1.jpg' },
    { name: 'Swiggy', logo: 'Swiggy.jpg' },
    { name: 'NGO1', logo: 'NGO1.png' },
    { name: 'RelianceFresh', logo: 'RelianceFresh.jpg' },
    { name: 'GovOrg2', logo: 'GovOrg2.jpg' },
    { name: 'NGO2', logo: 'NGO2.webp' },
    { name: 'Blinkit', logo: 'Blinkit.png' }
  ]
};

const Home = ({ isLoggedIn }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [donors, setDonors] = useState(10)
  const [community, setCommunity] = useState(15)
  const [foodPackages, setfoodPackages] = useState(100)

  const counts = useCount();


  const slides = [
    'slide_image1.jpeg', 'slide_image2.jpg', 'slide_image3.jpg',
    'slide_image4.jpg', 'slide_image5.jpg', 'slide_image6.jpg'
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };



  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  useEffect(() => {
    setDonors(counts.userCount.donor)
    setCommunity(counts.userCount.requester+counts.userCount.donor)
  }, [counts.userCount])



  return (
    <div className="relative pt-14">
      {/* Slideshow Section */}
      <div className="relative overflow-hidden">
        <div className="w-full h-[34rem] relative">
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-all duration-1000 rounded-lg"
          />
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
            onClick={prevSlide}
          >
            &lt;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>
      {/* Real-time Numbers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 shadow-lg text-white text-center">
          <h2 className="text-3xl font-semibold">Total Donors</h2>
          <p className="text-4xl mt-4">{donors}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 shadow-lg text-white text-center">
          <h2 className="text-3xl font-semibold">Total Food Packets Donated</h2>
          <p className="text-4xl mt-4">{foodPackages}</p>
        </div>
      </div>
      {/* Community Size Section */}
      <div className="p-8 text-center bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold">Community Size</h2>
        <p className="text-4xl mt-4">{community} Members</p>
      </div>
      {/* About Us Section */}
      <section className="p-8 bg-gradient-to-b from-purple-500 to-blue-500 text-white text-center rounded-lg shadow-xl mt-8">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 p-4">
            <img
              src="your_image_url.jpg" // Replace with your actual image URL
              alt="About Person"
              className="rounded-lg shadow-lg transform rotate-3"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-lg mt-4">
              We are a community dedicated to providing food and support to those in need. Our mission is to connect donors with recipients seamlessly, ensuring no food goes to waste.
            </p>
            <p className="text-lg mt-4">
              Join us in making a significant impact.
            </p>
          </div>
        </div>
        {/* Second About Section with Flipped Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-8">
          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold">Empowering Communities</h3>
            <p className="text-lg mt-4">
              In addition to food distribution, we are committed to empowering communities through educational programs and partnerships with local organizations.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img
              src="your_second_image_url.jpg" // Replace with your actual image URL
              alt="About Person"
              className="rounded-lg shadow-lg transform -rotate-3"
            />
          </div>
        </div>
      </section>
      {/* Partner Logos Slideshow */}
      <div className="relative overflow-hidden mt-8 bg-gray-200">
        <div className="whitespace-nowrap animate-slide">
          {data.partners.map((partner, index) => (
            <div key={index} className="inline-block w-40 h-40 mx-4 bg-white rounded-lg shadow-lg p-4">
              <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      {/* Contact Us Section */}
      <section className="p-8 bg-blue-900 text-white rounded-lg shadow-lg text-center mt-8 mb-8">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-lg mt-2">+1-800-123-4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-lg mt-2">support@ourwebsite.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Office Address</h3>
            <p className="text-lg mt-2">123 Future Tech Blvd, AI City</p>
          </div>
        </div>
      </section>
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4">Welcome to Our Community!</h2>
            <p className="mb-8">Please log in or register to access more features.</p>
            <div className="flex justify-center">
              <button className="animate-login-btn mx-4">
                <Link to="/login" className="text-green-700">Login</Link>
              </button>
              <button className="animate-register-btn mx-4">
                <Link to="/register" className="text-purple-700">Register</Link>
              </button>
            </div>
            <button onClick={handleClosePopup} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

