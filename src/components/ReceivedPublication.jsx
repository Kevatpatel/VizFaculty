import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReceivedPublications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Received Publications</h2>

      {/* Journal Publications Navigation */}
      <div 
        className="mb-8 p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
        onClick={() => navigate("/admin-dashboard/receivedpublications/journalpublication")}
      >
        <h3 className="text-xl font-semibold">📖 Journal Publication Requests</h3>
        <p>Click here to view pending journal publications.</p>
      </div>

      {/* Conference Publications Navigation */}
      <div 
        className="p-4 bg-green-100 rounded-lg shadow-md cursor-pointer hover:bg-green-200"
        onClick={() => navigate("/admin-dashboard/receivedpublications/conferencepublication")}
      >
        <h3 className="text-xl font-semibold">🎤 Conference Publication Requests</h3>
        <p>Click here to view pending conference publications.</p>
      </div>
    </div>
  );
};

export default ReceivedPublications;
