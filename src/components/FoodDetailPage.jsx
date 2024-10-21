
import React, { useEffect, useState } from 'react';
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { privateAxios } from '@/lib/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '@/context/LoaderProvider';
import ConfirmMation from './AlertDialog';



const FoodDetailPage = () => {
  const [requestQuantity, setRequestQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();


  const { id } = useParams()
  const { setLoading } = useLoader();

  const handleFoodRequest = () => {
    const userData = JSON.parse(localStorage.getItem('loggingUser'));


    const data = {
      requesterId: userData._id,
      donorId: product?.donatedBy?._id,
      foodItemId: id,
      quantity: requestQuantity
    }

    privateAxios
      .post('/request/create', data)
      .then(res => {
        if (res.status == 201) {
          console.log(res.data)
          navigate('/recipient-dashboard')
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => console.log(err))
  };

  const getProduct = () => {
    setLoading(true)
    privateAxios
      .get(`/food/item/${id}`)
      .then(res => {
        if (res.status == 200) {
          setProduct(res.data)

        }
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {

    getProduct();

  }, [id])

  return (
    (!!product && <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-800 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold capitalize text-gray-800">{product.foodName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{product.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-800">
              <MapPinIcon className="w-5 h-5" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-800">
              <CalendarIcon className="w-5 h-5" />
              <span>Expires: {product.expirationDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-800">
            <UserIcon className="w-5 h-5" />
            <span>Donated by: <span className='capitalize text-lg font-bold'>{product?.donatedBy?.organization_name || "N/A"}</span> </span>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">Available Quantity: {product.quantity}</p>
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
              max={product.quantity}
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(parseInt(e.target.value))}
              className="w-24" />
          </div>
          <ConfirmMation
            title="Confirm Request!"
            message="Are you sure you want to request the food"
            handleFoodRequest={handleFoodRequest}
          />
        </CardFooter>
      </Card>





    </div >)
  );
};

export default FoodDetailPage;