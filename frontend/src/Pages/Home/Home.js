import "./home.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getTransactions } from "../../utils/ApiRequest";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const [cUser, setcUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log("🔹 Checking localStorage in Home.js:", storedUser);

    if (!storedUser) {
      console.log("⚠️ No user found, redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (!user || !user._id) {
        console.log("⚠️ Invalid user data in localStorage. Redirecting...");
        navigate("/login");
        return;
      }

      if (!user.isAvatarImageSet || !user.avatarImage) {
        console.log("⚠️ Avatar not set, redirecting to /setAvatar...");
        navigate("/SetAvatar");
        return;
      }

      setcUser(user);
      setRefresh(true);
    } catch (error) {
      console.error("❌ Error parsing user data from localStorage:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      if (!cUser) return;
      setLoading(true);
      try {
        console.log("🔹 Fetching transactions for user:", cUser._id);
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency,
          startDate,
          endDate,
          type,
        });

        console.log("✅ Transactions fetched successfully:", data.transactions);
        setTransactions(data.transactions);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        toast.error("Error fetching data. Please try again.", toastOptions);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <Container className="mt-3">
          <h2 className="text-white">Welcome to Home Page</h2>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default Home;
