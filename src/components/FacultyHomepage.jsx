import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { 
  FileSpreadsheet, 
  PlusCircle, 
  BookOpen, 
  Presentation, 
  User, 
  Download,
  LogOut,
  Settings,
  Edit,
  Trash
} from "lucide-react";

const FacultyHomepage = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [approvedJournals, setApprovedJournals] = useState([]);
  const [approvedConferences, setApprovedConferences] = useState([]);

  const facultyEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchApprovedPublications = async () => {
      try {
        const journalResponse = await axios.get(
          `http://localhost:5000/api/journal-publications/approved/${facultyEmail}`
        );
        setApprovedJournals(journalResponse.data);

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

  const handleViewProfile = () => {
    navigate("/employee-dashboard/profile");
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear local storage and redirect to login
    localStorage.clear();
    navigate("/login");
  };

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

    const workbook = XLSX.utils.book_new();
    const journalSheet = XLSX.utils.json_to_sheet(journalsData);
    const conferenceSheet = XLSX.utils.json_to_sheet(conferencesData);

    XLSX.utils.book_append_sheet(workbook, journalSheet, "Journal Publications");
    XLSX.utils.book_append_sheet(workbook, conferenceSheet, "Conference Publications");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, "Approved_Publications.xlsx");
  };

  const handleEditJournal = (publicationId) => {
    navigate(`/employee-dashboard/journal-publication-edit/${publicationId}`);
  };

  const handleEditConference = (publicationId) => {
    navigate(`/employee-dashboard/conference-publication-edit/${publicationId}`);
  };

  const handleDeleteJournal = async (publicationId) => {
    if (window.confirm("Are you sure you want to delete this journal publication?")) {
      try {
        await axios.delete(`http://localhost:5000/api/journal-publications/${publicationId}`);
        setApprovedJournals(approvedJournals.filter(pub => pub._id !== publicationId));
      } catch (error) {
        console.error("❌ Error deleting journal publication:", error);
        alert("Failed to delete the publication. Please try again.");
      }
    }
  };

  const handleDeleteConference = async (publicationId) => {
    if (window.confirm("Are you sure you want to delete this conference publication?")) {
      try {
        await axios.delete(`http://localhost:5000/api/conference-publications/${publicationId}`);
        setApprovedConferences(approvedConferences.filter(pub => pub._id !== publicationId));
      } catch (error) {
        console.error("❌ Error deleting conference publication:", error);
        alert("Failed to delete the publication. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal-600 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">Faculty Publications</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 bg-teal-700 px-3 py-2 rounded-full hover:bg-teal-800 transition"
              >
                <User className="w-5 h-5 text-white" />
                <span className="font-medium">{facultyEmail}</span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-teal-100 z-10 overflow-hidden">
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 transition flex items-center text-teal-700 hover:text-teal-900"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition flex items-center text-red-600 hover:text-red-800"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-800 flex items-center">
              <Presentation className="w-6 h-6 mr-2 text-teal-600" />
              My Publications
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={exportToExcel}
                className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                <Download className="w-5 h-5 mr-2" />
                Export to Excel
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Publication
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-teal-100 z-10 overflow-hidden">
                    <button
                      onClick={handleJournalPublication}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 transition flex items-center"
                    >
                      <FileSpreadsheet className="w-5 h-5 mr-2 text-teal-600" />
                      Journal Publication
                    </button>
                    <button
                      onClick={handleConferencePublication}
                      className="w-full text-left px-4 py-3 hover:bg-teal-50 transition flex items-center"
                    >
                      <Presentation className="w-5 h-5 mr-2 text-teal-600" />
                      Conference Publication
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-teal-700 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
                Journal Publications
              </h3>
              <div className="mt-4 space-y-4">
                {approvedJournals.length === 0 ? (
                  <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg text-center">
                    <p className="text-teal-700 italic">No approved journal publications yet</p>
                  </div>
                ) : (
                  approvedJournals.map((publication) => (
                    <div 
                      key={publication._id} 
                      className="bg-teal-50 p-4 rounded-lg shadow-sm border border-teal-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-teal-900 mb-2">{publication.title}</h3>
                          <div className="space-y-1 text-teal-800">
                            <p><strong>Authors:</strong> {publication.authors.join(", ")}</p>
                            <p><strong>Journal:</strong> {publication.journalName}</p>
                            <p><strong>Year:</strong> {publication.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handleEditJournal(publication._id)}
                            className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full transition"
                            title="Edit publication"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteJournal(publication._id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"
                            title="Delete publication"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-teal-700 flex items-center">
                <Presentation className="w-5 h-5 mr-2 text-teal-600" />
                Conference Publications
              </h3>
              <div className="mt-4 space-y-4">
                {approvedConferences.length === 0 ? (
                  <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg text-center">
                    <p className="text-teal-700 italic">No approved conference publications yet</p>
                  </div>
                ) : (
                  approvedConferences.map((publication) => (
                    <div 
                      key={publication._id} 
                      className="bg-teal-50 p-4 rounded-lg shadow-sm border border-teal-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-teal-900 mb-2">{publication.title}</h3>
                          <div className="space-y-1 text-teal-800">
                            <p><strong>Authors:</strong> {publication.authors.join(", ")}</p>
                            <p><strong>Conference:</strong> {publication.conferenceName}</p>
                            <p><strong>Year:</strong> {publication.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handleEditConference(publication._id)}
                            className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-full transition"
                            title="Edit publication"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteConference(publication._id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"
                            title="Delete publication"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyHomepage;