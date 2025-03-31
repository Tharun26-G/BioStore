import { useState } from "react";

export default function Profile({ onUpdate }) {
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [image, setImage] = useState("");

  const handleInputChange = (setter, key) => (e) => {
    setter(e.target.value);
    onUpdate({ businessName, businessDescription, image, [key]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpdate({ businessName, businessDescription, image: imageUrl });
    }
  };

  return (
    <div className="w-2/3 p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>

      {/* Profile Image Upload */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-1/2 p-2 border border-gray-300 rounded-md text-sm bg-transparent focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={handleInputChange(setImage, "image")}
          className="w-1/2 p-2 border border-gray-300 rounded-md text-sm bg-transparent focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Business Name */}
      <label className="block mb-4">
        <span className="text-gray-700">Business Name</span>
        <input
          type="text"
          placeholder="Enter your business name"
          value={businessName}
          onChange={handleInputChange(setBusinessName, "businessName")}
          className="w-full p-3 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
        />
      </label>

      {/* Business Description */}
      <label className="block">
        <span className="text-gray-700">Business Description</span>
        <textarea
          placeholder="Describe your business"
          value={businessDescription}
          onChange={handleInputChange(setBusinessDescription, "businessDescription")}
          className="w-full p-3 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
          rows="3"
        />
      </label>
    </div>
  );
}
