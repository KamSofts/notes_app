import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import api, { BASE_URL } from "../utils/api";
import { AuthContext } from "../utils/AuthContext";

const Profile = () => {
  const [error, setError] = useState("");
  const [profileImage, setImage] = useState(null);
  const { user, setUser, logout } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!profileImage) {
      setError("Please select an image first");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profile_image", profileImage);
      const response = await api.post("/auth/update-image", formData);
      setUser({ ...user, profile_image: response.data.profile_image });
      setImage(null);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to upload image");
    }
  };

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div >
        <h4 className="form-title">PROFILE</h4>
        <p className="error">{error}</p>
        <p><strong>Username :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Contact :</strong> {user.contact || "N/A"}</p>
        <img
          src={user?.profile_image ? `${BASE_URL}${user.profile_image}` : "/user.jpg"}
          alt="No Photo"
        />
        <input type="file" accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }} />
        {profileImage && <button onClick={handleSubmit}>Update Profile Image</button>}
        <button style={{ backgroundColor: "#d00000" }}
          onClick={() => {
            if (confirm("Are you sure to delete?")) {
              logout();
            }
          }}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;