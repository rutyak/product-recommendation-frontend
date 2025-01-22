import React from "react";

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="bg-white relative h-[500px] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 mobile:h-[360px] mobile:p-2 md:p-4 md:h-[410px]">
      <div className="w-40 h-56 mb-4 rounded-md overflow-hidden mx-auto my-auto mobile:w-28 mobile:h-36 md:w-40 md:h-56">
        <img
          src={product.image}
          alt={product.title}
          className="object-fill"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mobile:text-[12px] md:text-lg">{truncateText(product.title, 15)}</h3>
      <p className="text-sm text-gray-600 mt-1 mobile:text-[10px] md:text-sm">
        {truncateText(product.description, 30)}
      </p>
      <div className="mt-3">
        <p className="text-lg font-bold text-green-600 mobile:text-sm md:text-lg">${product.price}</p>
      </div>
      <div className="flex absolute bottom-3 left-12 items-center gap-2 mt-4 mobile:flex-col md:flex-row">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white font-medium px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition mobile:px-2 mobile:py-1 mobile:text-[10px] md:text-sm md:py-2 md:px-3"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onViewDetails(product)}
          className="bg-gray-200 text-gray-800 font-medium px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition mobile:px-2 mobile:py-1 mobile:text-[10px] md:text-sm md:py-2 md:px-3"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
