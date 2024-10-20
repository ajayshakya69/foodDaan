import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLeaderboard([
        {
          donations: 2200,
          restaurant: "ksdf"
        },
        {
          donations: 2200,
          restaurant: "ksdf"
        },
        {
          donations: 2200,
          restaurant: "ksdf"
        },
        {
          donations: 2200,
          restaurant: "ksdf"
        },
        {
          donations: 2200,
          restaurant: "ksdf"
        }

      ])
      setLoading(false)
    }, 5000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-green-500 w-12 h-12"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to load leaderboard. Please try again later.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  if (!leaderboard.length) {
    return <p className="text-center text-gray-400">No data available.</p>;
  }

  const [first, second, third, ...others] = leaderboard;

  return (
    <div className="leaderboard-page max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-8 mt-10 text-center">Leaderboard</h1>
      <div className="flex justify-center mb-12">
        {first && (
          <div className="relative flex flex-col items-center animate-pulse">
            <div className="bg-blue-500 rounded-full p-4 mb-2">
              <i className="fas fa-gem text-3xl text-white"></i>
            </div>
            <h2 className="text-xl font-bold">{first.restaurant} 🏆</h2>
            <p>Donations: {first.donations}</p>
          </div>
        )}
        {second && (
          <div className="relative flex flex-col items-center mt-8 mx-8">
            <div className="bg-yellow-500 rounded-full p-4 mb-2">
              <i className="fas fa-medal text-3xl text-white"></i>
            </div>
            <h2 className="text-xl font-bold">{second.restaurant} 🥈</h2>
            <p>Donations: {second.donations}</p>
          </div>
        )}
        {third && (
          <div className="relative flex flex-col items-center mt-8">
            <div className="bg-gray-500 rounded-full p-4 mb-2">
              <i className="fas fa-medal text-3xl text-white"></i>
            </div>
            <h2 className="text-xl font-bold">{third.restaurant} 🥉</h2>
            <p>Donations: {third.donations}</p>
          </div>
        )}
      </div>
      <div className="other-ranks">
        {others.map((restaurant, index) => (
          <div key={restaurant.id} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
            <h3 className="text-lg font-semibold">{index + 4}. {restaurant.restaurant}</h3>
            <p>Donations: {restaurant.donations}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
