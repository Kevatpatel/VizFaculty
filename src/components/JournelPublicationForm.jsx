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
    email: "",
    pages: "",
    year: "",
    doi: "",
    impactFactor: "",
    publicationStatus: "published",
    abstract: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.authors.trim()) newErrors.authors = "Authors are required";
    if (!formData.journalName.trim()) newErrors.journalName = "Journal Name is required";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) newErrors.email = "Invalid email";
    if (formData.volume && (isNaN(formData.volume) || formData.volume <= 0)) newErrors.volume = "Volume must be a positive number";
    if (formData.issue && (isNaN(formData.issue) || formData.issue <= 0)) newErrors.issue = "Issue must be a positive number";
    if (formData.pages && !/^[0-9]+-[0-9]+$/.test(formData.pages)) newErrors.pages = "Pages must be in the format '123-145'";
    if (!formData.year || isNaN(formData.year) || formData.year < 1900 || formData.year > new Date().getFullYear()) newErrors.year = "Enter a valid year";
    if (formData.impactFactor && (isNaN(formData.impactFactor) || formData.impactFactor <= 0)) newErrors.impactFactor = "Impact Factor must be positive";
    if (formData.doi && !/^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/.test(formData.doi)) newErrors.doi = "Invalid DOI format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/journal-publications/submit", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        alert("Publication submitted successfully!");
        navigate("/employee-dashboard");
      }
    } catch (error) {
      alert("Failed to submit publication. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add Journal Publication</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Paper Title*", name: "title", type: "text" },
              { label: "Authors* (comma separated)", name: "authors", type: "text" },
              { label: "Journal Name*", name: "journalName", type: "text" },
              { label: "Email*", name: "email", type: "email" },
              { label: "Volume", name: "volume", type: "number" },
              { label: "Issue", name: "issue", type: "number" },
              { label: "Pages (e.g., 123-145)", name: "pages", type: "text" },
              { label: "Year*", name: "year", type: "number" },
              { label: "DOI", name: "doi", type: "text" },
              { label: "Impact Factor", name: "impactFactor", type: "number", step: "0.01" },
            ].map(({ label, name, type, step }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  step={step}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate("/employee-dashboard")} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalPublicationForm;
