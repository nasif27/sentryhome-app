import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import NavBar from "./components/NavBar.jsx";
import NavBar from "./components/Navibar";
import { useLocalStorage } from "usehooks-ts";
import { AuthContext } from "./AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [token, setToken] = useLocalStorage('token', '');
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  // const [incorrectCredentialTxt, setIncorrectCredentialTxt] = useLocalStorage('txt', '');
  const [incorrectCredentialTxt, setIncorrectCredentialTxt] = useState('');

  return (
    <AuthContext.Provider value={{
      token, 
      setToken, 
      isLoggedIn, 
      setIsLoggedIn,
      incorrectCredentialTxt,
      setIncorrectCredentialTxt
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } 
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
