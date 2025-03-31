import { useState } from "react";
import { 
  FaYoutube, FaInstagram, FaXTwitter, FaWhatsapp, FaPlus, FaTrash,
  FaLinkedin, FaTiktok, FaFacebook, FaSnapchat 
} from "react-icons/fa6";

const iconMap = {
  youtube: <FaYoutube className="w-8 h-8 text-red-500 bg-gray-200 rounded-full p-1" />,
  instagram: <FaInstagram className="w-8 h-8 text-pink-500 bg-gray-200 rounded-full p-1" />,
  twitter: <FaXTwitter className="w-8 h-8 text-blue-500 bg-gray-200 rounded-full p-1" />,
  whatsapp: <FaWhatsapp className="w-8 h-8 text-green-500 bg-gray-200 rounded-full p-1" />,
  linkedin: <FaLinkedin className="w-8 h-8 text-blue-600 bg-gray-200 rounded-full p-1" />,
  tiktok: <FaTiktok className="w-8 h-8 text-black bg-gray-200 rounded-full p-1" />,
  facebook: <FaFacebook className="w-8 h-8 text-blue-700 bg-gray-200 rounded-full p-1" />,
  snapchat: <FaSnapchat className="w-8 h-8 text-yellow-500 bg-gray-200 rounded-full p-1" />,
};

const defaultLinks = [
  { id: 1, name: "youtube", url: "", visible: true },
  { id: 2, name: "instagram", url: "", visible: true },
  { id: 3, name: "twitter", url: "", visible: true },
  { id: 4, name: "whatsapp", url: "", visible: true },
  { id: 5, name: "linkedin", url: "", visible: true },
  { id: 6, name: "tiktok", url: "", visible: true },
  { id: 7, name: "facebook", url: "", visible: true },
  { id: 8, name: "snapchat", url: "", visible: true },
];

const SocialLinks = ({ onUpdate }) => {
  const [links, setLinks] = useState(defaultLinks);
  const [extraLinks, setExtraLinks] = useState([]);

  const updateLink = (id, field, value, type) => {
    let updatedLinks;
    if (type === "default") {
      updatedLinks = links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      );
      setLinks(updatedLinks);
      onUpdate({ socialLinks: updatedLinks, extraLinks });
    } else {
      updatedLinks = extraLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      );
      setExtraLinks(updatedLinks);
      onUpdate({ socialLinks: links, extraLinks: updatedLinks });
    }
  };

  const addExtraLink = () => {
    const newExtraLinks = [...extraLinks, { id: Date.now(), icon: "", url: "" }];
    setExtraLinks(newExtraLinks);
    onUpdate({ socialLinks: links, extraLinks: newExtraLinks });
  };

  const removeExtraLink = (id) => {
    const filteredLinks = extraLinks.filter((link) => link.id !== id);
    setExtraLinks(filteredLinks);
    onUpdate({ socialLinks: links, extraLinks: filteredLinks });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Social Links</h2>

      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => (
          <div key={link.id} className="flex items-center gap-2 relative">
            {link.visible && iconMap[link.name]}
            <input
              type="text"
              placeholder="Enter URL"
              value={link.url}
              onChange={(e) => updateLink(link.id, "url", e.target.value, "default")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-gray-800 font-semibold">Custom Social Links</h3>
      {extraLinks.map((link) => (
        <div key={link.id} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Icon URL"
            value={link.icon}
            onChange={(e) => updateLink(link.id, "icon", e.target.value, "extra")}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-1/3"
          />
          <input
            type="text"
            placeholder="Enter URL"
            value={link.url}
            onChange={(e) => updateLink(link.id, "url", e.target.value, "extra")}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-1/3"
          />
          <button onClick={() => removeExtraLink(link.id)} className="text-red-500">
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      ))}

      <button
        onClick={addExtraLink}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        <FaPlus /> Add More Social Links
      </button>
    </div>
  );
};

export default SocialLinks;