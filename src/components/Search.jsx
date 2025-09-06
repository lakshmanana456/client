import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SearchContext } from "./SearchContex";
import Navbar from "./Navbar";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { searchDoc, setSearchDoc } = useContext(SearchContext);
  const [results, setResults] = useState([]);
  const [log, setLog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {

      if (user) {
        setLog(true)
      } else {
        navigate("/login")
        setLog(false)
      }
    })
  }, [])

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://gemini-8w55.onrender.com/search?title=${searchDoc}`);
      setResults(res.data);
      setSearchDoc("")
    } catch (err) {
      console.error("Error fetching search results", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">

        {/* Search bar */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="Search documents by title..."
            className="border rounded-md px-3 py-2 w-1/2 bordr border-violet-500 focus:outline-violet-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        {/* Search results */}
        <div className="w-1/2">
          {results.length > 0 ? (
            results.map((doc) => (
              <div key={doc._id} className="border p-3 mb-2 rounded-md shadow-md">
                <h3 className="font-bold text-xl text-violet-600">{doc.title}</h3>
                <p className="text-sm text-gray-600 italic">Summary: {doc.summary}</p>
                <p className="text-sm text-gray-600">
                  Tags: {doc.tags.join(", ")}
                </p>
                <p className="text-sm text-gray-600 font-semibold flex ">By: {doc.createdBy}</p>

              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
