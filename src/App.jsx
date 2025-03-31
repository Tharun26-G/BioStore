import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SocialLinks from "./components/SocialLinks";
import Store from "./components/Store";
import MobilePreview from "./components/MobilePreview";

export default function App() {
  const [profileData, setProfileData] = useState({
    businessName: "",
    businessDescription: "",
    image: "",
    socialLinks: [], // ✅ Ensure this updates
    storeItems: [],
  });

  const handleUpdate = (newData) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <Router>
      <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
        <NavBar />

        <div className="w-full flex justify-between mt-20 p-4">
          <div className="w-2/3">
            <Routes>
              <Route path="/profile" element={<Profile onUpdate={handleUpdate} />} />
              <Route path="/social-links" element={<SocialLinks onUpdate={handleUpdate} />} />
              <Route path="/store" element={<Store onUpdate={handleUpdate} />} />
              <Route path="*" element={<Profile onUpdate={handleUpdate} />} />
            </Routes>
          </div>

          {/* Pass Updated Data to Mobile Preview */}
          <MobilePreview {...profileData} />
        </div>
      </div>
    </Router>
  );
}
