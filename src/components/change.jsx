import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Change = () => {
  const { id } = useParams(); // Get publication ID from URL
  const navigate = useNavigate();
  const [publication, setPublication] = useState({
    title: "",
    authors: "",
    email: "",
    journalName: "",
    volume: "",
    issue: "",
    pages: "",
    year: "",
    doi: "",
    impactFactor: "",
    abstract: "",
  });

  // Fetch the publication data
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/journal-publications/${id}`
        );
        setPublication(response.data);
      } catch (error) {
        console.error("❌ Error fetching publication:", error);
      }
    };

    fetchPublication();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/journal-publications/${id}`,
        publication
      );
      alert("Publication updated successfully!");
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("❌ Error updating publication:", error);
      alert("Failed to update publication.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Publication</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={publication.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Authors</label>
          <input
            type="text"
            name="authors"
            value={publication.authors}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Journal Name</label>
          <input
            type="text"
            name="journalName"
            value={publication.journalName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Volume</label>
          <input
            type="text"
            name="volume"
            value={publication.volume}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Issue</label>
          <input
            type="text"
            name="issue"
            value={publication.issue}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={publication.year}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">DOI</label>
          <input
            type="text"
            name="doi"
            value={publication.doi}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Impact Factor</label>
          <input
            type="number"
            name="impactFactor"
            value={publication.impactFactor}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Abstract</label>
          <textarea
            name="abstract"
            value={publication.abstract}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Update Publication
        </button>
      </form>
    </div>
  );
};

export default Change;
