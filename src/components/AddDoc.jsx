import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";
import {toast, ToastContainer} from 'react-toastify'

const AddDocs = () => {
  const { id } = useParams(); // if present → edit mode

  const [doc, setDoc] = useState({
    title: "",
    content: "",
    summary: "",
    tags: [],
    createdBy: "",
  });

  // If editing, fetch document by id
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/adddoc/${id}`)
        .then((res) => setDoc(res.data))
        .catch((err) => console.log("Error fetching doc:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setDoc({ ...doc, tags: value.split(",").map((tag) => tag.trim()) });
    } else {
      setDoc({ ...doc, [name]: value });
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/generateSummary", {
        content: doc.content,
      });
      setDoc({ ...doc,
         summary: res.data.summary,
          tags: res.data.tags });
    } catch (err) {
      console.log("Error generating summary/tags:", err);
    }
  };

const resetForm = () => {
    setDoc({
      title: "",
      content: "",
      summary: "",
      tags: [],
      createdBy: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // update
        await axios.put(`http://localhost:5000/updatedoc/${id}`, doc);
        toast.success("updated successfully" )
      } else {
        // add
        await axios.post("http://localhost:5000/addnewdoc", doc);
        toast.success("New Document added")
      }

    } catch (err) {
      console.log("Error saving doc:", err);
    }finally{
      resetForm()
    }
  };

  return (

   <>
   <Navbar/>
    <form onSubmit={handleSubmit} className="p-6 space-y-2 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Document" : "Add New Document"}
      </h1>

      <input
        type="text"
        placeholder="Title"
        value={doc.title}
        onChange={handleChange}
        name="title"
        className="border border-violet-400 p-2 rounded-md w-full"
        required
      />

      <input
        type="text"
        placeholder="Content"
        value={doc.content}
        onChange={handleChange}
        name="content"
        className="border border-violet-400 p-2 rounded-md w-full"
        required
      />

      <button
        onClick={handleGenerate}
        className="flex bg-violet-100 px-2 py-1 rounded-md border border-violet-500"
      >
        <FaStar className="text-violet-700 mr-2" /> Auto generate summary & tags
      </button>

      <textarea
        placeholder="Summary"
        value={doc.summary}
        onChange={handleChange}
        name="summary"
        className="border p-2 h-20 w-full rounded-md border-violet-400"
      />

      <input
        type="text"
        placeholder="Tags"
        value={doc.tags.join(", ")}
        onChange={(e) =>
          setDoc({
            ...doc,
            tags: e.target.value.split(",").map((tag) => tag.trim()), 
          })
        }
        name="tags"
        className="border p-1 focus:outline-gray-400 w-full border-violet-400"
      />

      <input
        type="text"
        placeholder="Created By"
        value={doc.createdBy}
        onChange={handleChange}
        name="createdBy"
        className="border p-2 w-full rounded-md border-violet-400"
        required
      />

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-violet-500 text-white py-2 px-4 rounded-md"
        >
          {id ? "Update Document" : "Add Document"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={3000}/>
    </form>
   </>
  );
};

export default AddDocs;
