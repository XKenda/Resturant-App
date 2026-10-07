import "react-router-dom"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />}  />
      <Route path="/home" element={<Home />} />
    </Routes>
    </>
  )
}

export default App;