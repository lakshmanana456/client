import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import AddDoc from "./components/AddDoc"
import Search from "./components/Search"
import Register from "./components/Register"
import Navbar from "./components/Navbar"
import QuestionAns from "./components/QuestionAns"

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/addnewdoc" element={<AddDoc/>}/>
    <Route path="/adddoc/:id" element={<AddDoc/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/questionans" element={<QuestionAns/>}/>
    
    <Route path="*" element={<Dashboard/>}/>
    
  </Routes>
  </BrowserRouter>
  )
}

export default App
