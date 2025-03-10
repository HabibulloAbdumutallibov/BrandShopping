import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";



function FullProduct() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedMonths, setSelectedMonths] = useState(3); 
  const handleAddToCart = () => {
    if (!product) return;
  
    const cartItem = {
      ...product,
      quantity: quantity, 
    };
  
    dispatch(addToCart(cartItem));
    toast.success(`${product.title} (${quantity} dona) savatchaga qo‘shildi!`);
  };
  
  if (!product) {
    return <p className="text-center text-gray-500">Mahsulot topilmadi</p>;
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  function calculateDiscountPrice(price, discountPercentage) {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  }

  function calculateInstallments(price, months) {
    return (price / months).toFixed(2);
  }

  const discountedPrice = calculateDiscountPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center text-gray-800">{product.title}</h1>

    <div className="flex w-full flex-col lg:flex-row gap-6 mt-6">
      <div className="flex w-full flex-col gap-4  lg:w-1/3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className=" h-64 md:h-80 rounded-lg shadow"
        />
        <div className="flex gap-2 justify-center overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index}`}
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={decreaseQuantity}
            className="px-4 py-2 bg-gray-200 text-xl rounded-md hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-4 py-2 bg-gray-200 text-xl rounded-md hover:bg-gray-300"
          >
            +
          </button>
          <span className="text-sm text-gray-500">
            ({product.stock} dona mavjud)
          </span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-4">
        <p className="text-gray-700">{product.description}</p>
        <div className="space-y-2 flex flex-col justify-start items-start gap-2">
          <p className="text-lg line-through font-semibold">
            {product.price} so'm
          </p>
          <p className=" text-lg rounded-md px-2 bg-yellow-400 font-semibold">
            {discountedPrice} so'm (-{product.discountPercentage}%)
          </p>
          <p className="text-sm text-gray-500">📦 {product.availabilityStatus}</p>
          <p className="text-sm text-gray-500">🚚 {product.shippingInformation}</p>
          <p className="text-sm text-gray-500">🔄 {product.returnPolicy}</p>
          <p className="text-sm"><strong>Brand:</strong> {product.brand}</p>
          <p className="text-sm"><strong>Category:</strong> {product.category}</p>
          <p className="text-yellow-500">⭐ {product.rating} / 5</p>
        </div>

        <div className="flex justify-between ">
        <div className="bg-gray-100 p-4 flex gap-5 flex-col rounded-lg">
          <h3 className="text-lg font-semibold">Oylik to‘lov:</h3>
          <div className="flex items-center gap-4">
            <select
              value={selectedMonths}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
              className="p-2 border rounded-md"
            >
              {[3, 6, 9, 12, 24].map((month) => (
                <option key={month} value={month}>
                  {month} oy
                </option>
              ))}
            </select>
            <span className="text-gray-700 text-lg font-semibold">
               {calculateInstallments(discountedPrice * quantity, selectedMonths)} so'm / oy
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
          <button className="w-full sm:w-auto px-6 py-3  rounded-md bg-yellow-400">
            Buy Now
          </button>
          <button
  className="w-full sm:w-auto px-6 py-3 bg-yellow-400 rounded-md hover:bg-yellow-400"
  onClick={handleAddToCart} 
>
  Add to Cart
</button>
        </div>
        </div>

       

        <div className="text-center">
          <h3 className="text-lg font-semibold">Mahsulot QR kodi</h3>
          <img src={product.meta.qrCode} alt="QR Code" className="w-32 mx-auto" />
        </div>
        </div>
      </div>
    </div>

    <div className="mt-8">
      <h2 className="text-xl font-bold">Foydalanuvchi Sharhlari</h2>
      <div className="space-y-4">
        {product.reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-md shadow-sm">
            <p>⭐ {review.rating} / 5</p>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-sm text-gray-500">- {review.reviewerName}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default FullProduct;
