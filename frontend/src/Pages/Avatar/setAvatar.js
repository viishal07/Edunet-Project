import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { setAvatarAPI } from "../../utils/ApiRequest.js";

const SetAvatar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [imgURL, setImgURL] = useState([]);
  const sprites = ["adventurer", "micah", "avataaars", "bottts"];
  const [selectedSprite, setSelectedSprite] = useState(sprites[0]);

  // ✅ Authentication check
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser || !parsedUser._id) {
        navigate("/login");
      } else if (parsedUser.isAvatarImageSet) {
        navigate("/dashboard"); // Redirect if avatar is already set
      } else {
        setUser(parsedUser);
        setCheckingAuth(false);
      }
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Generate unique random seed
  const randomName = () => `seed-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // ✅ Fetch Avatars from DiceBear API
  useEffect(() => {
    if (selectedSprite) {
      const generatedAvatars = Array(4)
        .fill("")
        .map(() => `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`);

      console.log("🔹 Generated Avatar URLs:", generatedAvatars);

      // ✅ Double-check if URLs are valid
      setImgURL(generatedAvatars);
    }
  }, [selectedSprite]); // Triggers when sprite changes

  // ✅ Set Profile Picture
  const setProfilePicture = async () => {
    if (!user) {
      toast.error("User not found, please log in again.");
      navigate("/login");
      return;
    }
    if (selectedAvatar === null) {
      toast.error("Please select an avatar.");
      return;
    }

    try {
      console.log("🔹 Sending avatar update request...");
      const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
        image: imgURL[selectedAvatar],
      });

      if (data.isSet) {
        const updatedUser = { ...user, isAvatarImageSet: true, avatarImage: data.image };
        console.log("✅ Avatar set successfully! Updating localStorage:", updatedUser);

        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Avatar set successfully!");

        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard after setting avatar
        }, 1500);
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error setting avatar:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  if (checkingAuth) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Checking Authentication...</h2>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>Choose Your Avatar</h1>

      {/* ✅ Avatar Display */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {imgURL.length > 0 ? (
          imgURL.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`avatar-${index}`}
              style={{
                border: selectedAvatar === index ? "3px solid gold" : "none",
                cursor: "pointer",
              }}
              onClick={() => setSelectedAvatar(index)}
              width="100"
              height="100"
              onError={(e) => {
                console.error(`❌ Image failed to load: ${image}`);
                e.target.style.display = "none"; // Hide broken image
              }}
            />
          ))
        ) : (
          <p style={{ color: "white" }}>⚠️ No avatars found. Please select a different type.</p>
        )}
      </div>

      {/* ✅ Sprite Selection */}
      <select
        onChange={(e) => setSelectedSprite(e.target.value)}
        className="form-select mt-5"
        style={{ width: "200px", margin: "0 auto", display: "block" }}
      >
        {sprites.map((sprite, index) => (
          <option value={sprite} key={index}>
            {sprite}
          </option>
        ))}
      </select>

      {/* ✅ Set Profile Button */}
      <Button onClick={setProfilePicture} type="submit" className="mt-5" style={{ display: "block", margin: "0 auto" }}>
        Set as Profile Picture
      </Button>

      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
