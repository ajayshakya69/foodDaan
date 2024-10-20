
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderProvider"

import axios from "@/lib/axios";





export default function ProductPageComponent() {

  const [products, setProducts] = useState([])
  const loader = useLoader();

  useEffect(() => {
    loader.setLoading(true)
    axios
      .get('/food/allitems')
      .then(res => {
        if (res.status === 200)
          setProducts(res.data)

      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => loader.setLoading(false))


  }, [])
  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 pt-[100px]">
      <div className="container mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">Food Inventory</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
          {!products.length><p>No Product available</p>}
          {products.length>0&&products.map((product) => (
            <Card key={product._id} className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{product.foodName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Location: {product.location}</p>
                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Request
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>)
  );
}