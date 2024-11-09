
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useAuth } from "@/context/AuthProvider";
import { useLoader } from "@/context/LoaderProvider";


function formatDate(dbdate) {
  const date = new Date(dbdate);

  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

  return `${formattedDate}, ${formattedTime}`;
}




export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  const {user} = useAuth()
  const { setLoading } = useLoader()
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
   
  };

  const handleDelete = () => {
    alert("Account deletion request sent. An admin will contact you shortly.");
  };


  function fetchUser() {
    setLoading(true)
    privateAxios
      .get(`/user/${user._id}`)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }


  useEffect(() => {

    if (user)
      fetchUser()


  }, [user])

  return (
    (profile ? <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">User Profile</h1>
      <Card className="bg-white bg-opacity-10 text-white">
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="df" alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-lg">{profile.email}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className="bg-white bg-opacity-20 text-white" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
                className="bg-white bg-opacity-20 text-white" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>Member since: {formatDate(profile.createdAt)}</p>
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <Button onClick={handleSave}>Save</Button>
              ) : (
                <Button onClick={handleEdit}>Edit</Button>
              )}
              <Button variant="destructive" onClick={handleDelete}>
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div> :
      <div>
        <h1>user not found</h1>
      </div>


    )
  );
}