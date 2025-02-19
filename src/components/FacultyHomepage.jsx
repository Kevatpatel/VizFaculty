import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const FacultyHomepage = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [approvedJournals, setApprovedJournals] = useState([]);
  const [approvedConferences, setApprovedConferences] = useState([]);

  // Get faculty email from localStorage
  const facultyEmail = localStorage.getItem("email");

  // Fetch approved journal and conference publications
  useEffect(() => {
    const fetchApprovedPublications = async () => {
      try {
        // Fetch approved journal publications
        const journalResponse = await axios.get(
          `http://localhost:5000/api/journal-publications/approved/${facultyEmail}`
        );
        setApprovedJournals(journalResponse.data);

        // Fetch approved conference publications
        const conferenceResponse = await axios.get(
          `http://localhost:5000/api/conference-publications/approved/${facultyEmail}`
        );
        setApprovedConferences(conferenceResponse.data);
      } catch (error) {
        console.error("❌ Error fetching approved publications:", error);
      }
    };

    if (facultyEmail) {
      fetchApprovedPublications();
    }
  }, [facultyEmail]);

  const handleJournalPublication = () => {
    navigate("/employee-dashboard/journal-publication-form");
    setIsDropdownOpen(false);
  };

  const handleConferencePublication = () => {
    navigate("/employee-dashboard/conference-publication-form");
    setIsDropdownOpen(false);
  };

  // 🔹 Export Functionality
  const exportToExcel = () => {
    const journalsData = approvedJournals.map((publication) => ({
      Title: publication.title,
      Authors: publication.authors.join(", "),
      Journal: publication.journalName,
      Year: publication.year,
    }));

    const conferencesData = approvedConferences.map((publication) => ({
      Title: publication.title,
      Authors: publication.authors.join(", "),
      Conference: publication.conferenceName,
      Year: publication.year,
    }));

    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert to worksheet and add to workbook
    const journalSheet = XLSX.utils.json_to_sheet(journalsData);
    const conferenceSheet = XLSX.utils.json_to_sheet(conferencesData);

    XLSX.utils.book_append_sheet(workbook, journalSheet, "Journal Publications");
    XLSX.utils.book_append_sheet(workbook, conferenceSheet, "Conference Publications");

    // Generate Excel File and Download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, "Approved_Publications.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-center mb-4">Associate Professor</h2>
              <p className="text-center text-gray-900">{facultyEmail}</p>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Publications Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
                
                <div className="flex space-x-4">
                  {/* ✅ Export to Excel Button */}
                  <button 
                    onClick={exportToExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Export to Excel
                  </button>

                  {/* ✅ Add Publication Button */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>Add Publication</span>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border">
                        <button
                          onClick={handleJournalPublication}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg transition-colors duration-200"
                        >
                          Journal Publication
                        </button>
                        <button
                          onClick={handleConferencePublication}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg transition-colors duration-200"
                        >
                          Conference Publication
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Approved Journal Publications Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Journal Publications</h3>
                <div className="space-y-6">
                  {approvedJournals.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-500 text-center italic">No approved journal publications yet</p>
                    </div>
                  ) : (
                    approvedJournals.map((publication) => (
                      <div key={publication._id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">{publication.title}</h3>
                        <p className="text-gray-700"><strong>Authors:</strong> {publication.authors.join(", ")}</p>
                        <p className="text-gray-700"><strong>Journal:</strong> {publication.journalName}</p>
                        <p className="text-gray-700"><strong>Year:</strong> {publication.year}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Approved Conference Publications Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Conference Publications</h3>
                <div className="space-y-6">
                  {approvedConferences.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-500 text-center italic">No approved conference publications yet</p>
                    </div>
                  ) : (
                    approvedConferences.map((publication) => (
                      <div key={publication._id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">{publication.title}</h3>
                        <p className="text-gray-700"><strong>Authors:</strong> {publication.authors.join(", ")}</p>
                        <p className="text-gray-700"><strong>Conference:</strong> {publication.conferenceName}</p>
                        <p className="text-gray-700"><strong>Year:</strong> {publication.year}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyHomepage;
