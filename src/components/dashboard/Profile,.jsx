
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";


export default function ProfilePage({userProfile}) {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(userProfile);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      setIsEditing(false);
      // Here you would typically send the updated profile to your backend
    };
  
    const handleDelete = () => {
      // Here you would typically send a request to delete the user's account
      alert("Account deletion request sent. An admin will contact you shortly.");
    };
  
    return (
      (<div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <Card className="bg-white bg-opacity-10 text-white">
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} alt={profile.name} />
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
              <div className="md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-24 bg-white bg-opacity-20 text-white rounded-md p-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p>Member since: {profile.joinDate}</p>
                <p>Total donations: {profile.totalDonations}</p>
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
      </div>)
    );
  }