import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedBackground from "../../components/AnimatedBackground";

const formVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const shakeVariant = {
  shake: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shakeForm, setShakeForm] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (password.length < 6) return { text: "Weak", color: "red" };
    if (password.match(/[A-Z]/) && password.match(/[0-9]/))
      return { text: "Strong", color: "green" };
    return { text: "Medium", color: "orange" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
      return;
    }
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/login");
  };

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="register-container">
        <motion.div
          className="register-box"
          initial="hidden"
          animate="visible"
          variants={formVariant}
        >
          <h2>Register</h2>
          <motion.form
            onSubmit={handleSubmit}
            animate={shakeForm ? "shake" : ""}
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

            <p
              className="password-strength"
              style={{ color: passwordStrength().color }}
            >
              {passwordStrength().text}
            </p>

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="register-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>

            <p className="bottom-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
