

import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const FoodDetailPage = () => {
  const [requestQuantity, setRequestQuantity] = useState(1);

  // Mock data for the food item
  const foodItem = {
    foodName: "Fresh Organic Apples",
    description: "Delicious, locally grown organic apples. Perfect for snacking or baking.",
    quantity: 50,
    location: "Community Center, 123 Main St",
    expirationDate: "2023-06-30",
    donatedBy: "Local Orchard Co."
  };

  const handleRequestFood = () => {
    // Implement the logic for requesting food here
    console.log(`Requested ${requestQuantity} ${foodItem.foodName}(s)`);
  };

  useEffect(()=>{

  },[])

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">{foodItem.foodName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{foodItem.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPinIcon className="w-5 h-5" />
              <span>{foodItem.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CalendarIcon className="w-5 h-5" />
              <span>Expires: {foodItem.expirationDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <UserIcon className="w-5 h-5" />
            <span>Donated by: {foodItem.donatedBy}</span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">Available Quantity: {foodItem.quantity}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="requestQuantity" className="text-sm font-medium text-gray-700">
              Request Quantity:
            </label>
            <Input
              id="requestQuantity"
              type="number"
              min="1"
              max={foodItem.quantity}
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(parseInt(e.target.value))}
              className="w-24" />
          </div>
          <Button
            onClick={handleRequestFood}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Request Food
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
};

export default FoodDetailPage;