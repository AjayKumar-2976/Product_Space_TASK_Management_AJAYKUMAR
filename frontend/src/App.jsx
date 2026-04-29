import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      
      {/* 🔥 Global Toast Setup */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111827", // dark black
            color: "#fff",
            border: "1px solid #374151",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#10b981", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red
              secondary: "#fff",
            },
          },
        }}
      />

      {/* 🚀 Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;