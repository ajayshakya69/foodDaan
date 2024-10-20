import axios from '@/lib/axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FoodDetailPage = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchFoodItem = async () => {
    setLoading(true);
    axios
      .get("/food/item/67127c8f7dce977288328598")
      .then(res => {
        if (res.status == 200)
          setFoodItem(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => {
        setLoading(false)
      })
  };

  useEffect(() => {

    fetchFoodItem();

  }, []);

  const handleOrder = () => {
    if (requestedQuantity < 1 || requestedQuantity > foodItem.quantity) {
      alert('Please enter a valid quantity');
      return;
    }

   
    console.log(`Order placed for ${requestedQuantity} of ${foodItem.foodName}`);
    alert(`Order placed for ${requestedQuantity} ${foodItem.foodName}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p>{error}</p></div>;
  }

  if (!foodItem) {
    return <div className="flex justify-center items-center h-screen"><p>Food item not found.</p></div>;
  }

  return (
    <div className="food-detail-page max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{foodItem.restaurant}</h1>
      <div className="food-details flex flex-col items-center gap-6">
        <img src={foodItem.image} alt={foodItem.foodName} className="w-full h-64 object-cover rounded-md" />
        <div className="food-info text-center">
          <h2 className="text-xl font-semibold">{foodItem.foodName}</h2>
          <p className="text-gray-700">Quantity available: {foodItem.quantity}</p>
          <p className="text-gray-700">Location: {foodItem.location}</p>
          <p className="text-gray-700">Prepared on: {new Date(foodItem.preparedDate).toLocaleDateString()}</p>
          <input
            type="number"
            value={requestedQuantity}
            onChange={(e) => setRequestedQuantity(Number(e.target.value))}
            min="1"
            max={foodItem.quantity}
            className="border border-gray-300 p-2 rounded-md text-center w-20 mt-4"
          />
          <button
            onClick={handleOrder}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 disabled:bg-gray-400"
            disabled={requestedQuantity < 1 || requestedQuantity > foodItem.quantity}
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
