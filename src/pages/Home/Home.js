import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import trackEvent from "../../components/TrackEvent"; 
import { useAuth } from "../../context/AuthContext";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const { userData } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(null);

  console.log("userData", userData);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${Base_url}/products`);
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category || "Uncategorized"))
        );
        setCategories(uniqueCategories);

        trackEvent("PageLoad", { page: "Home" }, userData?._id);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const startTime = Date.now();
    setPageLoadTime(startTime);

    return () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); 
      trackEvent("TimeSpentOnPage", { page: "Home", timeSpent }, userData?._id);
    };
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingRecommendations(true);
        const { data } = await axios.get(`${Base_url}/recommendations/${user?._id}`);
        setRecommendedProducts(data);

        trackEvent("RecommendationsLoaded", { count: data.length }, userData?._id);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    trackEvent("CategoryChange", { selectedCategory: category }, userData._id);

    if (category === "") {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <div className="min-h-screen p-6 mobile:p-2 md:p-6">
      <div className="text-center py-12 text-white rounded-lg shadow-lg mb-8 bg-gradient-to-r from-orange-500 to-red-500 mobile:py-6 md:py-10">
        <h1 className="text-4xl font-bold mb-4 mobile:text-lg sm:text-xl md:text-2xl lg:text-4xl">Welcome to Our Shopping App</h1>
        <p className="text-lg mb-6 mobile:text-sm mobile:mb-4 md:mb-6 md:text-lg">
          Shop the best products at amazing prices!
        </p>
      </div>

      <section>
        <div className="mb-6 flex flex-col mobile:flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mobile:text-lg md:text-xl lg:text-2xl">
            Featured Products
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800 mobile:text-sm md:text-lg lg:text-lg">
              Filter by Category
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-orange-300 focus:outline-none text-gray-700 mobile:w-[40%] md:w-[50%] mobile:text-sm md:text-lg lg:text-lg"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
            <span>Loading products...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="margin-auto grid grid-cols-1 gap-6 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  trackEvent("ProductView", { productId: product._id }, userData._id)
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No products available for the selected category.
          </p>
        )}
      </section>

      <section className="mt-10 max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mobile:text-lg md:text-xl lg:text-2xl">
          Recommended for You
        </h2>
        {loadingRecommendations ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <span>Loading recommendations...</span>
          </div>
        ) : recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  trackEvent("RecommendedProductView", { productId: product._id }, userData._id)
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No recommendations available at the moment.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
