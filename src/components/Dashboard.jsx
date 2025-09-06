import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { auth } from "../config";

const Dashboard = () => {
  const [docs, setDocs] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
  const [admin,setAdmit]=useState(false)
  const [log,setLog]=useState(false)

  // Fetch all documents
  useEffect(() => {
    axios.get("https://gemini-8w55.onrender.com/doclist")
      .then((res) => setDocs(res.data))
      .catch((err) => console.log("Error fetching docs:", err));
  }, []);

  // Unique tags for filter
  const allTags = [...new Set(docs.flatMap((doc) => doc.tags || []))];

  // Filter docs by selected tag
  const filteredDocs = selectedTag
    ? docs.filter((doc) => doc.tags.includes(selectedTag)) : docs;

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Do you really want to delete this document?")) return;
    try {
      await axios.delete(`https://gemini-8w55.onrender.com/deletedoc/${id}`);
      setDocs(docs.filter((d) => d._id !== id));
    } catch (err) {
      console.log("Error while deleting:", err);
    }
  };

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setLog(true)
        setAdmit(user.uid==="jb1RaFHOJshdl9EVaAJtTky6zYx1")
      }else{
        setLog(false)
        setAdmit(false)
        navigate("/login")
      }
    })
  },[])
  return (
    <div>
      <Navbar />

      {/* Tag filter chips */}
      <div className="flex flex-wrap gap-2 mb-4 px-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full border transition ${
            selectedTag === null ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {allTags.map((tag, i) => (
          <button
            key={i}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border transition ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-violet-200 flex-1">
        {filteredDocs.map((document) => (
          <div
            key={document._id}
            className="flex flex-col min-h-[350px] bg-gray-100 border rounded-xl p-5 hover:scale-105 duration-200 transition"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {document.title}
            </h2>
            <p className="text-sm text-gray-500 italic mb-3">
              {document.summary}
            </p>

            <div className="flex flex-wrap gap-2  mb-3">
              {document.tags.map((tag, i) => (
                <p
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full "
                >
                  #{tag}
                </p>
              ))}
            </div>

            <div className="flex justify-end text-xs text-gray-400 mt-auto">
              <span>By: {document.createdBy}</span>
            </div>

           {admin && (<div className="flex justify-between mt-2">
              <button
                className="font-semibold bg-blue-400 px-3 py-1 rounded-md"
                onClick={() => navigate(`/adddoc/${document._id}`)}
              >
                Edit
              </button>
              <button
                className="font-semibold bg-red-500 px-3 py-1 rounded-md"
                onClick={() => handleDelete(document._id)}
              >
                Delete
              </button>
            </div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
