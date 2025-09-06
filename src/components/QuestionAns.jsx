import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";
import { auth } from "../config";
import { useNavigate } from "react-router-dom";

const QuestionAns = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState(false)
    const navigate = useNavigate()

    const handleAsk = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/questionans", { question });
            setAnswer(res.data.answer);
            setQuestion("")
        } catch (err) {
            console.error("Error asking question:", err);
        } finally {
            setLoading(false);
        }
    };

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
    return (
        <>
            <Navbar />
            <div className="p-6">

                <h2 className="text-2xl font-bold mb-4 mx-auto flex justify-center"><FaStar className="w-3 text-violet-600" /> Team Q&A</h2>

                <form onSubmit={handleAsk} className="flex gap-2 mb-4 mx-auto w-1/2">
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="border p-2 rounded w-full bordr border-violet-500 focus:outline-violet-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                    >
                        Ask
                    </button>
                </form>

                {loading && <p className="text-gray-500">Thinking...</p>}

                {answer && (
                    <div className=" p-4 rounded shadow bg-violet-100">
                        <h3 className="font-semibold mb-2">Answer:</h3>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default QuestionAns;
