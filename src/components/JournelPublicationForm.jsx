import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JournalPublicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journalName: "",
    volume: "",
    issue: "",
    email: "", // ✅ Added Email Field
    pages: "",
    year: "",
    doi: "",
    impactFactor: "",
    publicationStatus: "published",
    abstract: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/journal-publications/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Publication submitted successfully!");
        navigate("/employee-dashboard");
      }
    } catch (error) {
      console.error("❌ Error submitting publication:", error);
      alert("Failed to submit publication. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const emailii = localStorage.getItem("email")

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Add Journal Publication</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[ 
                { label: "Paper Title*", name: "title", type: "text", required: true },
                { label: "Authors* (comma separated)", name: "authors", type: "text", required: true },
                { label: "Journal Name*", name: "journalName", type: "text", required: true },
                { label: "Email*", name: "email", type: "email", required: true }, // ✅ Added Email Field
                { label: "Volume", name: "volume", type: "text" },
                { label: "Issue", name: "issue", type: "text" },
                { label: "Pages (e.g., 123-145)", name: "pages", type: "text" },
                { label: "Year*", name: "year", type: "number", required: true },
                { label: "DOI", name: "doi", type: "text" },
                { label: "Impact Factor", name: "impactFactor", type: "number", step: "0.01" },
              ].map(({ label, name, type, step, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    step={step}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publication Status*</label>
                <select
                  name="publicationStatus"
                  value={formData.publicationStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="published">Published</option>
                  <option value="accepted">Accepted</option>
                  <option value="inPress">In Press</option>
                  <option value="underReview">Under Review</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Abstract</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/employee-dashboard")}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JournalPublicationForm;
