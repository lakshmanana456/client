import React, { useState, useEffect } from "react";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState([]);

  // fetch documents from backend
  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error(err));
  }, []);

  // generate summary + tags 
  const handleGenerateAI = async () => {
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setTags(data.tags);
    } catch (err) {
      console.error("AI generation failed", err);
    }
  };

  // save document
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, summary, tags }),
      });
      const newDoc = await res.json();
      setDocuments([...documents, newDoc]);
      setTitle("");
      setContent("");
      setSummary("");
      setTags([]);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="p-6">
      {/* Create Document Form */}
      <form
        onSubmit={handleSave}
        className="bg-white shadow-lg rounded-2xl p-6 mb-6"
      >
        <h2 className="text-xl font-bold mb-4">Create New Document</h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full rounded-md mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write content..."
          className="border p-2 w-full rounded-md h-32 mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={handleGenerateAI}
          className="px-4 py-2 bg-purple-500 text-white rounded-md mb-3"
        >
          ✨ Generate Summary & Tags
        </button>

        {summary && (
          <p className="text-gray-700 text-sm mb-2">
            <strong>Summary:</strong> {summary}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Save Document
        </button>
      </form>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="bg-white shadow-md p-4 rounded-xl flex flex-col"
          >
            <h3 className="font-bold text-lg">{doc.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{doc.summary}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By {doc.createdBy} •{" "}
              {new Date(doc.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
