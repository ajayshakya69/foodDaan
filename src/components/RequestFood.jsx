import React, { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useLoader } from "../context/LoaderProvider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"





export default function ProductPageComponent() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [locationFilter, setLocationFilter] = useState("")
  const [quantityFilter, setQuantityFilter] = useState("")


  const loader = useLoader()
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

  useEffect(() => {
    const filtered = products.filter(product =>
      (locationFilter === "" || product.location.includes(locationFilter)) &&
      (quantityFilter === "" || product.quantity >= parseInt(quantityFilter))
    )

    setFilteredProducts(filtered)
  }, [locationFilter, quantityFilter, products])

  const uniqueLocations = [...new Set(products.map(product => product.location))]


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 pt-[100px]">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Food Inventory</h1>

        <div className="mb-6 flex flex-wrap gap-4 justify-center items-center bg-white/90 backdrop-blur-sm p-4 rounded-lg">
          <Select onValueChange={setLocationFilter} value={locationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dsfg">All Locations</SelectItem>
              {uniqueLocations.map(e => {
                return <SelectItem key={e} value={e}>{e}</SelectItem>;
              })}


            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min Quantity"
            value={quantityFilter}
            onChange={(e) => setQuantityFilter(e.target.value)}
            className="w-[180px]"
          />

          <Button
            onClick={() => {
              setLocationFilter("")
              setQuantityFilter("")
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length === 0 && <p className="text-white text-center col-span-full">No products available</p>}
          {filteredProducts.map((product) => (
            <Link key={product._id}  to={`/food-detail/${product._id}`}>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{product.foodName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Location: {product.location}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    Request
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}