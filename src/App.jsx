import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Goals from "./components/Goals";
import Analytics from "./components/Analytics";
import ProtectedRoutes from "../utils/ProtectedRoutes";
// import {  } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<Dashboard />}>
            <Route path="/main/home" element={<Home />} />
            <Route path="/main/to-dos" element={<Todos />} />
            <Route path="/main/goals" element={<Goals />} />
            <Route path="/main/analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
