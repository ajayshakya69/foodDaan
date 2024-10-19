'use client'

import React, { useState } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductDetailJsx() {
  const [mainImage, setMainImage] = useState("/placeholder.svg?height=400&width=300")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState("1")

  const thumbnails = [
    "/placeholder.svg?height=100&width=75",
    "/placeholder.svg?height=100&width=75",
    "/placeholder.svg?height=100&width=75",
    "/placeholder.svg?height=100&width=75",
  ]

  const handleAddToCart = () => {
    console.log(`Added to cart: Color: ${selectedColor}, Quantity: ${quantity}`)
    // Here you would typically dispatch an action to add the item to the cart
  }

  return (
    (<div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt="Main product image"
              className="w-full h-auto object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                className="border rounded-md overflow-hidden hover:border-primary transition-colors"
                onClick={() => setMainImage(thumb)}>
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Elegant Timepiece Watch</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">(121 reviews)</span>
          </div>
          <p className="text-xl font-bold">$299.99</p>
          <p className="text-gray-600">
            Introducing our Elegant Timepiece Watch, a perfect blend of style and functionality. This sophisticated
            accessory features a sleek design, premium materials, and precise timekeeping to elevate your everyday look.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="rosegold">Rose Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger id="quantity">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>)
  );
}