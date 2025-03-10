import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import AnimatedBackground from "../../components/AnimatedBackground";

const formVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const shakeVariant = {
  shake: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }
    if (password !== "yourCorrectPassword") {
      setWrongPassword(true);
      setError("Incorrect password!");
      setTimeout(() => setWrongPassword(false), 500);
      return;
    }
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/dashboard");
  };

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="login-container">
        <motion.div
          className="login-box"
          initial="hidden"
          animate="visible"
          variants={formVariant}
        >
          <h2>Login</h2>
          <motion.form
            onSubmit={handleSubmit}
            animate={wrongPassword ? "shake" : ""}
            variants={shakeVariant}
          >
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              type="submit"
              className="login-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <p className="bottom-text">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </motion.form>

          {/* Google Login */}
          <div className="google-login">
            <GoogleLogin
              onSuccess={(response) =>
                console.log("Google Login Success:", response)
              }
              onError={() => console.log("Google Login Failed")}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
