import "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/auth/Register";

const App = () => {


  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/auth">
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;