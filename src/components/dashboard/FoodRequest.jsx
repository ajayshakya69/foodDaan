import { useAuth } from "@/context/AuthProvider"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { privateAxios } from "@/lib/axios";
import { useLoader } from "@/context/LoaderProvider";
import RequestData from "./datatable/Table";
import DataTable from "./datatable/Datatable";


export default function FoodRequest() {

  const [requests, setRequests] = useState(null)
  const [counts, setCounts] = useState(null)
  const user = useAuth();
  const { setLoading } = useLoader()


  function fetchRequest() {
    setLoading(true)
    privateAxios
      .get(`/requests/${user.role}/${user._id}`)
      .then(res => {
        if (res.status===200) {
          console.log(res.data.requests)
          setRequests(res.data.requests)
          setCounts(res.data.counts)
        }
      })

      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }


  useEffect(() => {
    if (user) {
      fetchRequest()
    }
  }, [user])




  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-white">Requests</h3>
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{!!counts && (counts.accepted ? counts.accepted : "0")}</div>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{!!counts && (counts.pending ? counts.pending : "0")}</div>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{!!counts && (counts.rejected ? counts.rejected : "0")}</div>
          </CardContent>
        </Card>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{!!counts && (counts.cancelled ? counts.cancelled : "0")}</div>
          </CardContent>
        </Card>

      </div>
      <h3 className="text-3xl font-bold text-white">Requests Table</h3>

      {!!requests?<DataTable requests={requests} title="Food requests" />:"no requests"
}
    </div>
  )
}
