import { 
   BrowserRouter,
   Routes, 
   Route ,
  } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Inspector } from "./pages/Inspector";
import { University } from "./pages/University";
import Home from "./pages/Home";
import Insights from "./pages/Inspector/Insights";
import Inshome from "./pages/Inspector/Inshome";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default App;
