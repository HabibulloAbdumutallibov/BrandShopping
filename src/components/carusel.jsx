import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ products }) => {
  const navigate = useNavigate(); // Navigatsiya funksiyasi

  // Rasmlar va mahsulot ma'lumotlarini olish
  const slides = products.flatMap(product =>
    product.images.map(image => ({
      id: product.id,  
      image, 
      price: product.price
    }))
  );
console.log(slides);

  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (carouselRef.current) {
      if (current >= slides.length - 3) {
        // Oxiriga yetganda boshiga qaytish
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setCurrent(0);
      } else {
        setCurrent((prev) => prev + 3);
        carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
      }
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      if (current <= 0) {
        // Boshlanishga yetganda oxiriga qaytish
        carouselRef.current.scrollTo({ left: carouselRef.current.scrollWidth, behavior: "smooth" });
        setCurrent(slides.length - 3);
      } else {
        setCurrent((prev) => prev - 3);
        carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full shadow-2xl overflow-hidden b pb-4 mb-4  relative">
      {/* Scrollable rasm qatori */}
      <div
        ref={carouselRef}
        className="flex  overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((slide, index) => (
      <div
      key={index}
      className="relative shadow-2xl flex-shrink-0 mx-2 rounded-lg cursor-pointer"
      style={{ width: "200px", scrollSnapAlign: "start" }}
      onClick={() => navigate(`/fullproduct/${slide.id}`)}
    >
      <img
        src={slide.image}
        alt={`Slide ${index + 1}`}
        className="h-40 w-full rounded-lg"
      />
      <p className="absolute top-0 left-0 p-1  bg-yellow-400 text-[60%] font-bold text-center text-black py-2 rounded-full">
        {slide.price} so'm
      </p>
    </div>
    
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
