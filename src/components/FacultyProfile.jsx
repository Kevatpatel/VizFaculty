import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loggedInEmail = localStorage.getItem("email"); // Assuming email is stored in localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      if (!loggedInEmail) {
        setError("No email found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile?email=${loggedInEmail}`);
        setUserData(response.data);
      } catch (err) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loggedInEmail]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        {userData ? (
          <div className="space-y-4">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Marital Status:</strong> {userData.maritalStatus}</p>
            <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
