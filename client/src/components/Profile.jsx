import "./Profile.css";
const Profile = () => {
  return (
    <div className="profile-container">
      <div >
        <img src="/user.jpg" alt="profile" />
        <input type="file" accept="image/*" />
        <button>Update Profile Image</button>        
        <p><strong>Username :</strong> Ram</p>
        <p><strong>Email :</strong> ram@gmail.com</p>
        <p><strong>Contact :</strong> 1234567890</p>
        <button style={{ backgroundColor: "#d00000"}}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;