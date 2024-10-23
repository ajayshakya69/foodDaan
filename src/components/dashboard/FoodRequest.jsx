import { useAuth } from "@/context/AuthProvider"
import { useEffect } from "react";


export default function FoodRequest() {
    const user = useAuth();

    useEffect(() => {
     
      
    }, [user])
    
  return (
   <div>
    <h1>All Food Request</h1>
   </div>
  )
}
