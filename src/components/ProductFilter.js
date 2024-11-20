import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bluetoothVersion, setBluetoothVersion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listings/assgnlistings');
      console.log("API Response:", response.data);
      const fetchedProducts = Array.isArray(response.data) ? response.data : [];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilters = () => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return;
    }

    const filtered = products.filter(product => {
      const isPriceValid = product.offerPrice >= priceRange[0] && product.offerPrice <= priceRange[1];
      const isCategoryValid = selectedCategory ? product.Category === selectedCategory : true;
      const isBluetoothValid = bluetoothVersion ? product.Specification.BluetoothVersion === bluetoothVersion : true;
      const isSearchValid = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return isPriceValid && isCategoryValid && isBluetoothValid && isSearchValid;
    });

    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Product Filter</h1>

      <form onSubmit={handleSubmit}>
        {/* Make all filters stack vertically */}
        <div className="flex flex-col space-y-6 mb-6">
          
          <div className="flex flex-col">
            <label className="font-medium text-lg text-gray-700 mb-2">Price Range</label>
            <div className="flex flex-col space-y-2">
              <input 
                type="number" 
                value={priceRange[0]} 
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} 
                className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                placeholder="Min Price"
              />
              <input 
                type="number" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} 
                className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                placeholder="Max Price"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-lg text-gray-700 mb-2">Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500">
              <option value="">All Categories</option>
              <option value="Wearables">Wearables</option>
              <option value="Smartphones">Smartphones</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-lg text-gray-700 mb-2">Bluetooth Version</label>
            <select 
              value={bluetoothVersion} 
              onChange={(e) => setBluetoothVersion(e.target.value)} 
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500">
              <option value="">All Versions</option>
              <option value="5.3">5.3</option>
              <option value="4.0">4.0</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-lg text-gray-700 mb-2">Search</label>
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by title or description"
            />
          </div>

        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
            Apply Filters
          </button>
        </div>
      </form>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filtered Products</h2>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-medium text-indigo-600">Price: ₹{product.offerPrice}</p>
              <p className="text-gray-500">Category: {product.Category}</p>
              <p className="text-gray-500">Bluetooth Version: {product.Specification.BluetoothVersion}</p>
              <div className="flex justify-center">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-auto max-w-xs object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
