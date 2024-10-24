import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export default function Donations() {
  return (
     
    <div className="grid gap-4 md:grid-cols-2">
    <Card className="bg-white bg-opacity-10 text-white">
        <CardHeader>
            <CardTitle>Total Donations</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">45</div>
        </CardContent>
    </Card>
    <Card className="bg-white bg-opacity-10 text-white">
        <CardHeader>
            <CardTitle>Request Completed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold">120</div>
        </CardContent>
    </Card>

</div>
  )
}
