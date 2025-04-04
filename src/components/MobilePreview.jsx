export default function MobilePreview({ 
  businessName = "Business Name", 
  businessDescription = "Business description here...", 
  image, 
  socialLinks = [], 
  storeItems = [], 
  extraLinks = [] 
}) {
  const combinedLinks = [
    ...socialLinks.filter(link => link.url?.trim()),
    ...extraLinks.filter(link => link.url?.trim() && link.icon?.trim())
  ];

  return (
    <div className="w-1/3 flex justify-center items-center fixed right-10 top-20">
      <div className="relative w-72 h-[650px] bg-transparent border-4 border-gray-800 rounded-[50px] flex flex-col items-center p-4 shadow-xl">
        
        {/* Profile Image */}
        {image ? (
          <img src={image} alt="Profile" className="w-24 h-24 rounded-full mt-8" />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full mt-8"></div>
        )}
        
        {/* Business Name */}
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{businessName}</h2>

        {/* Business Description */}
        <p className="text-gray-600 text-center">{businessDescription}</p>

        {/* Social Links Preview */}
        {combinedLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 w-full justify-center">
            {combinedLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                <img src={link.icon} alt="Icon" className="w-10 h-10 p-2 bg-gray-200 rounded-full object-cover" />
              </a>
            ))}
          </div>
        )}

        {/* Store Items Preview */}
        {storeItems.length > 0 && (
          <div className="mt-4 w-full grid grid-cols-2 gap-2">
            {storeItems.filter(item => item.confirmed && !item.hidden).map((item, index) => (
              <div key={index} className="border p-2 rounded-lg flex flex-col items-center hover:bg-gray-100 transition">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                </a>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">{item.name}</a>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
