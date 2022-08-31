import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import MyPets from "./pages/MyPets";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import PetPage from "./pages/PetPage";
import ProtectedRoute from "../src/ProtectedRoute";
import ProtectedRouteAdmin from "../src/ProtectedRouteAdmin";
import { ModalContextProvider } from "./contexts/ModalContext";
import { PetContextProvider } from "./contexts/PetContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdminContextProvider } from "./contexts/AdminContext";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <UserContextProvider>
            <AdminContextProvider>
              <PetContextProvider>
                <ModalContextProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route path="/PetPage" element={<PetPage />} />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/MyPets"
                        element={
                          <ProtectedRoute>
                            <MyPets />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRouteAdmin>
                            <Dashboard />
                          </ProtectedRouteAdmin>
                        }
                      />
                    </Routes>
                  </LocalizationProvider>
                </ModalContextProvider>
              </PetContextProvider>
            </AdminContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
