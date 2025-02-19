import React, { useState } from 'react';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicationsPage = () => {
  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Machine Learning Applications in Education",
      authors: "John Doe, Jane Smith",
      journal: "International Journal of Education Technology",
      year: 2023,
      doi: "10.1234/ijed.2023"
    },
    // Add more sample publications as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleAddPublication = () => {
    // Add logic to open add publication form
    console.log("Add publication clicked");
    navigate('/employee-dashboard/publicationspage/facultyform')
  };

  const handleEditPublication = (id) => {
    // Add logic to edit publication
    console.log("Edit publication", id);
  };

  const handleDeletePublication = (id) => {
    // Add logic to delete publication
    console.log("Delete publication", id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Publications Management</h1>
        <button 
          onClick={handleAddPublication}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New Publication
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search publications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow-sm">
        {publications.map((publication) => (
          <div 
            key={publication.id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {publication.title}
                </h3>
                <p className="text-gray-600 mt-1">{publication.authors}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>{publication.journal}</span>
                  <span>Year: {publication.year}</span>
                  <span>DOI: {publication.doi}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditPublication(publication.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDeletePublication(publication.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {publications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No publications found. Click "Add New Publication" to add your first publication.
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;