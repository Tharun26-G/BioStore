import { useState } from "react";
import { FaPlus, FaTrash, FaCheck, FaSearch, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp, FaShareAlt } from "react-icons/fa";

export default function Store({ onUpdate }) {
  const [storeItems, setStoreItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddItem = () => {
    setExpandedIndex(storeItems.length);
    setStoreItems([...storeItems, { name: "", image: "", url: "", price: "", confirmed: false, hidden: false }]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...storeItems];
    updatedItems[index][field] = value;
    setStoreItems(updatedItems);
    onUpdate({ storeItems: updatedItems });
  };

  const handleConfirm = (index) => {
    const updatedItems = [...storeItems];
    updatedItems[index].confirmed = true;
    setStoreItems(updatedItems);
    setExpandedIndex(null);
    onUpdate({ storeItems: updatedItems });
  };

  const handleDelete = (index) => {
    const updatedItems = storeItems.filter((_, i) => i !== index);
    setStoreItems(updatedItems);
    onUpdate({ storeItems: updatedItems });
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Affiliate link copied!");
  };

  const toggleVisibility = (index) => {
    const updatedItems = [...storeItems];
    updatedItems[index].hidden = !updatedItems[index].hidden;
    setStoreItems(updatedItems);
    onUpdate({ storeItems: updatedItems });
  };

  const handleExpandToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredItems = storeItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Affiliate Store</h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 p-2 border rounded"
        />
      </div>

      {filteredItems.map((item, index) => (
        <div key={index} className="border rounded mb-4">
          {/* Top Section - Clicking anywhere here toggles expansion */}
          <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => handleExpandToggle(index)}>
            <span className="font-semibold">
              {item.name || "Unnamed Product"}
            </span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering expand toggle
                  toggleVisibility(index);
                }}
                className="p-2 bg-gray-200 rounded"
              >
                {item.hidden ? <FaEyeSlash /> : <FaEye />}
              </button>
              {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>

          {expandedIndex === index && (
            <div className="p-4 border-t">
              <input type="text" placeholder="Product Name" value={item.name} onChange={(e) => handleChange(index, "name", e.target.value)} className="w-full p-2 border rounded mb-2" />
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Product Image URL" value={item.image} onChange={(e) => handleChange(index, "image", e.target.value)} className="flex-1 p-2 border rounded" />
                <input type="file" className="hidden" id={`file-upload-${index}`} />
                <label htmlFor={`file-upload-${index}`} className="px-3 py-2 bg-gray-200 rounded cursor-pointer">Upload</label>
              </div>
              <div className="flex gap-2 mb-2">
                <input type="text" placeholder="Affiliate Link" value={item.url} onChange={(e) => handleChange(index, "url", e.target.value)} className="flex-1 p-2 border rounded" />
                <input type="number" placeholder="Price (Optional)" value={item.price} onChange={(e) => handleChange(index, "price", e.target.value)} className="w-1/3 p-2 border rounded" />
              </div>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleConfirm(index)} className="p-2 bg-gray-200 rounded">
                  <FaCheck />
                </button>
                <button onClick={() => handleShare(item.url)} className="p-2 bg-gray-200 rounded">
                  <FaShareAlt />
                </button>
                <button onClick={() => handleDelete(index)} className="p-2 bg-gray-200 rounded">
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddItem} className="flex items-center gap-2 mt-4 px-4 py-2 bg-gray-200 rounded w-full justify-center">
        <FaPlus /> Add Product
      </button>
    </div>
  );
}
