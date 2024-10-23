import { useAuth } from "@/context/AuthProvider"
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


export default function FoodRequest() {
  const user = useAuth();

  useEffect(() => {
      
  }, [user])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">All Requests</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">45</div>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">20</div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
