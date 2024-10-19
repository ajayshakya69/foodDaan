// ReceivedFood.js
import React, { useState, useEffect } from 'react';

const ReceivedFood = () => {
  const [foodHistory, setFoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/received-food'); // Use your backend URL
        const data = await response.json();
        setFoodHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food history:', error);
        setLoading(false);
      }
    };

    fetchFoodHistory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!foodHistory.length) {
    return <p>No food history available.</p>;
  }

  return (
    <div className="received-food-page max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Received Food History</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date & Time</th>
            <th className="py-2 px-4 border-b">Food Name</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {foodHistory.map((food) => (
            <tr key={food._id} className="hover:bg-gray-100 transition duration-300">
              <td className="py-2 px-4 border-b">{new Date(food.date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{food.foodName}</td>
              <td className="py-2 px-4 border-b">{food.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedFood;
