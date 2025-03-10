import React from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import SetAvatar from "./Pages/Avatar/SetAvatar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AnimatedBackground from "./components/AnimatedBackground";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="454869967253-uu3r3ief7306tu57d7udkt2mpnjn6fp2.apps.googleusercontent.com">
      {/* Animated Background Applied to All Pages */}
      <AnimatedBackground />

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
