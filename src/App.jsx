import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  
  if (loading) return null; 

 
  if (!token) return <Navigate to="/login" replace />;

  return children;
};

const AuthRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null;
  
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}