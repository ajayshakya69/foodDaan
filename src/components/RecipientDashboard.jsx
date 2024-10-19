// RecipientDashboard.js
import React, { useState, useEffect } from 'react';

const RecipientDashboard = () => {
  const [foodRequests, setFoodRequests] = useState([]);
  const [communityMembers, setCommunityMembers] = useState(0);
  const [notApprovedCount, setNotApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Replace this with actual API calls to fetch food requests
    const communityMembersCount = 5890; // Static example, replace with actual logic if needed
    setCommunityMembers(communityMembersCount);

    try {
      const response = await fetch('http://localhost:5000/api/food-requests'); // Replace with your actual API endpoint
      const fetchedRequests = await response.json();
      setFoodRequests(fetchedRequests);
      updateRequestCounts(fetchedRequests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food requests:', error);
      setLoading(false);
    }
  };

  const updateRequestCounts = (requests) => {
    const notApproved = requests.filter(request => request.status === 'Not Approved').length;
    const pending = requests.filter(request => request.status === 'Pending').length;
    const received = requests.filter(request => request.status === 'Approved').length;
    setNotApprovedCount(notApproved);
    setPendingCount(pending);
    setReceivedCount(received);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 p-10 text-white">
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-8">Recipient Dashboard</h1>
        
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Community Members</h2>
            <p className="text-4xl font-extrabold">{communityMembers}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Total Requests</h2>
            <p className="text-4xl font-extrabold">{foodRequests.length}</p>
          </div>
        </div>

        {/* Requests Status Section */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center mb-8">
          <h2 className="text-3xl text-left font-bold mb-4">Your Food Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Not Approved</h2>
              <p className="text-4xl font-extrabold">{notApprovedCount}</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Pending</h2>
              <p className="text-4xl font-extrabold">{pendingCount}</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2">Received</h2>
              <p className="text-4xl font-extrabold">{receivedCount}</p>
            </div>
          </div>
        </div>
        
        {/* Footer Section */}
        <footer className="text-center mt-12">
          <p>&copy; 2024 Food Daan. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default RecipientDashboard;
