import { useEffect, useState } from "react";
import axios from "axios";

export const JournalPublicationRequest = () => {
    const [publications, setPublications] = useState([]);

    // Fetch pending publications from backend
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/journal-publications/journal/pending");
                setPublications(response.data);
            } catch (error) {
                console.error("❌ Error fetching publications:", error);
            }
        };

        fetchPublications();
    }, []);

    // Function to approve a publication
    const approvePublication = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/journal-publications/journal/approve/${id}`);
            
            // ✅ Update UI: Remove the approved publication from the list
            setPublications((prevPublications) => prevPublications.filter(pub => pub._id !== id));
            
            alert("✅ Publication approved successfully!");
        } catch (error) {
            console.error("❌ Error approving publication:", error);
            alert("Failed to approve the publication.");
        }
    };

    // Function to reject a publication
    const rejectPublication = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/journal-publications/journal/reject/${id}`);
            
            // ❌ Update UI: Remove the rejected publication from the list
            setPublications((prevPublications) => prevPublications.filter(pub => pub._id !== id));
            
            alert("❌ Publication rejected successfully!");
        } catch (error) {
            console.error("❌ Error rejecting publication:", error);
            alert("Failed to reject the publication.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Journal Publication Requests</h1>

                {publications.length === 0 ? (
                    <p className="text-center text-gray-600">No pending publications found.</p>
                ) : (
                    <div className="space-y-6">
                        {publications.map((publication) => (
                            <div key={publication._id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">{publication.title}</h3>
                                <p className="text-gray-700"><strong>Authors:</strong> {publication.authors.join(", ")}</p>
                                <p className="text-gray-700"><strong>Email:</strong> {publication.email}</p>
                                <p className="text-gray-700"><strong>Journal:</strong> {publication.journalName}</p>
                                <p className="text-gray-700"><strong>Year:</strong> {publication.year}</p>

                                <div className="mt-4 flex space-x-3">
                                    <button 
                                        onClick={() => approvePublication(publication._id)} 
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => rejectPublication(publication._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalPublicationRequest;
