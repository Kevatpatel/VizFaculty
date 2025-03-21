import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const PublicationsPage = () => {
  const [publications, setPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedPublications, setSelectedPublications] = useState(new Set());
  const [filterType, setFilterType] = useState(""); // Dropdown filter state
  const [fromYear, setFromYear] = useState(""); // Start year filter
  const [toYear, setToYear] = useState(""); // End year filter

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const [journalsRes, conferencesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/journal-publications/journal/approved"),
          axios.get("http://localhost:5000/api/conference-publications/approved"),
        ]);

        const journalData = journalsRes.data.map((pub) => ({
          id: pub._id,
          name: pub.authors[0],
          title: pub.title,
          year: pub.year,
          type: "Journal",
        }));

        const conferenceData = conferencesRes.data.map((pub) => ({
          id: pub._id,
          name: pub.authors[0],
          title: pub.title,
          year: pub.year,
          type: "Conference",
        }));

        setPublications([...journalData, ...conferenceData]);
      } catch (error) {
        console.error("❌ Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  // Sorting function
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...publications].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setPublications(sortedData);
    setSortConfig({ key, direction });
  };

  // Filtering logic (search, type, and year range)
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = pub.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType ? pub.type === filterType : true;
    const matchesYear =
      (!fromYear || pub.year >= parseInt(fromYear)) && (!toYear || pub.year <= parseInt(toYear));

    return matchesSearch && matchesType && matchesYear;
  });

  // Handle checkbox selection
  const toggleSelection = (id) => {
    setSelectedPublications((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
      return newSelected;
    });
  };

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedPublications.size === filteredPublications.length) {
      setSelectedPublications(new Set());
    } else {
      setSelectedPublications(new Set(filteredPublications.map((pub) => pub.id)));
    }
  };

  // Export only selected rows to Excel
  const exportToExcel = () => {
    const selectedData = filteredPublications.filter((pub) => selectedPublications.has(pub.id));
    if (selectedData.length === 0) {
      alert("Please select at least one publication to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Publications");

    XLSX.writeFile(workbook, "Selected_Publications.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        
        {/* Title, Filters, and Export Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-teal-700">All Publications</h1>

          <div className="flex space-x-4">
            {/* From Year */}
            <input
              type="number"
              placeholder="From (Year)"
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
              className="w-28 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
            />

            {/* To Year */}
            <input
              type="number"
              placeholder="To (Year)"
              value={toYear}
              onChange={(e) => setToYear(e.target.value)}
              className="w-28 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
            />

            {/* Dropdown Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Types</option>
              <option value="Journal">Journal</option>
              <option value="Conference">Conference</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportToExcel}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition"
            >
              Export to Excel
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Publications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedPublications.size === filteredPublications.length}
                    className="cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortData("name")}>
                  Name
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortData("title")}>
                  Title
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortData("year")}>
                  Year
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortData("type")}>
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => (
                  <tr key={pub.id} className="border-b hover:bg-gray-100 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPublications.has(pub.id)}
                        onChange={() => toggleSelection(pub.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">{pub.name}</td>
                    <td className="py-3 px-4">{pub.title}</td>
                    <td className="py-3 px-4">{pub.year}</td>
                    <td className="py-3 px-4">{pub.type}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-4 text-gray-600">No publications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
