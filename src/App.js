import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import {Home} from './components/home.js'
import Login from "./components/login.js";
import Register from "./components/register.js";
import { AuthProvider } from "./context/authContext.js";
import './App.css';
import { ProtectedRoute } from "./components/protectedRoutes.js";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {



  return (
    <div className="main">
      <AuthProvider>
        <Routes>
          <Route path="/home" element={
            <ProtectedRoute>
          <Home/>
          </ProtectedRoute>
          }></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}

export default App;
