import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import DataTable from './datatable/Datatable'
import { privateAxios } from '@/lib/axios'
import { useAuth } from '@/context/AuthProvider'
import { useLoader } from '@/context/LoaderProvider'

export default function Donations() {
    const [donations, setDonations] = useState(null)
    const [activeDonations, setActiveDonations] = useState(null)
    const user = useAuth();
    const { setLoading } = useLoader();



    function fetchDonations() {
        setLoading(true);
        privateAxios
            .get(`/food/items/user/${user._id}`)
            .then(res => setDonations(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }


    useEffect(() => {
        if (user)
            fetchDonations()
    }, [user])


    useEffect(() => {

        if (donations) {
            setActiveDonations(donations.filter((item) => item.isAvailable))

        }
    }, [donations])



    return (
        <div className="space-y-8">

            <h3 className="text-3xl font-bold text-white">Donations</h3>
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-white bg-opacity-10 text-white">
                    <CardHeader>
                        <CardTitle>Total Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{donations && donations.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-white bg-opacity-10 text-white">
                    <CardHeader>
                        <CardTitle>Active Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{activeDonations && activeDonations.length}</div>
                    </CardContent>
                </Card>

            </div>


            {!!donations ? <DataTable data={donations} title="All Donations" updateTableFunc={fetchDonations} page="donations" /> : "No donatons available"}
        </div>
    )
}
