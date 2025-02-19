import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PublicationForm = () => {
  const navigate = useNavigate();
  const [publication, setPublication] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    doi: '',
    abstract: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/publications/add", publication, {
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.status === 201) {
        navigate("/employee-dashboard", { state: { message: "Your publication was submitted successfully!" } });
      } else {
        console.error("Failed to submit publication");
      }
    } catch (error) {
      console.error("Error submitting publication:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add New Publication</h2>
          <button
            onClick={() => navigate('/employee-dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Publication Title *</label>
              <input
                type="text"
                value={publication.title}
                onChange={(e) => setPublication({ ...publication, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Authors *</label>
              <input
                type="text"
                value={publication.authors}
                onChange={(e) => setPublication({ ...publication, authors: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Separate multiple authors with commas"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Journal/Conference *</label>
              <input
                type="text"
                value={publication.journal}
                onChange={(e) => setPublication({ ...publication, journal: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Publication Year *</label>
              <input
                type="number"
                value={publication.year}
                onChange={(e) => setPublication({ ...publication, year: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">DOI (optional)</label>
              <input
                type="text"
                value={publication.doi}
                onChange={(e) => setPublication({ ...publication, doi: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Abstract</label>
              <textarea
                value={publication.abstract}
                onChange={(e) => setPublication({ ...publication, abstract: e.target.value })}
                className="w-full p-2 border rounded h-32"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit Publication
              </button>
              <button
                type="button"
                onClick={() => navigate('/employee-dashboard')}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationForm;