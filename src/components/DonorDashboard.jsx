import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCount } from '../context/CountProvider';

import axios from '../lib/axios';
import { useLoader } from '@/context/LoaderProvider';

const DonorDashboard = () => {
  const [foodPacketsDonated, setFoodPacketsDonated] = useState(100);
  const [donations, setDonations] = useState([]);
  const [communityMembers, setCommunityMembers] = useState();
  const [leaderboardRank, setLeaderboardRank] = useState(12);

  const count = useCount();
  const {setLoading} = useLoader()

  const fetchData = async () => {
    const userData = localStorage.getItem("loggingUser");
    const id = JSON.parse(userData)._id
    setLoading(true)
    axios
      .get(`/food/items/user/${id}`)
      .then(res => {
        if (res.status == 200)
          console.log(res.data);
        setDonations(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(()=>setLoading(false))

  };

  const handleNewDonation = async () => {

    await fetchData();
  };


  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    
    setCommunityMembers(count.userCount.requester + count.userCount.donor)
    

  }, [count.userCount])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 p-10 text-white">
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8">Donor Dashboard</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Community Members</h2>
            <p className="text-4xl font-extrabold">{communityMembers}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Leaderboard Rank</h2>
            <p className="text-4xl font-extrabold">#{leaderboardRank}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Your Donations</h2>
            <p className="text-4xl font-extrabold">{donations ? donations.length : 0}</p>
          </div>
        </div>

        {/* Recent Donations Section */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-4">Recent Donations</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2">Date & Time</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {!donations&&<p>No Donation Found</p>}
              {donations && donations.map((donation) => (
                <tr key={donation._id}>
                  <td className="py-2">
                    {new Date(donation.createdAt).toLocaleDateString()} {new Date(donation.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2">{donation.foodName}</td>
                  <td className="py-2">{donation.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action Section */}
        <div className="flex justify-center mb-8">
          <Link to="/donation-form" className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition duration-300" onClick={handleNewDonation}>
            Donate Food
          </Link>
        </div>

        {/* Footer Section */}
        <footer className="text-center mt-12">
          <p>&copy; 2024 Food Daan. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DonorDashboard;