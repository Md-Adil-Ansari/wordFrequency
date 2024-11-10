// CardCarousel.js
import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { toast } from "react-toastify";

// CarouselCard Component with Responsive Table and List Layout
const CarouselCard = ({ words, currentSlide, wordsPerCard }) => {
  return (
    <div className="flex items-center justify-center h-auto bg-white rounded-lg shadow-lg shadow-orange-500 p-4 sm:p-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
      {words.length ? (
        <div className="w-full shadow-lg rounded-lg p-4 shadow-orange-500">
          {/* Desktop/Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="text-gray-600 font-medium p-2 text-xs sm:text-sm">
                    No.
                  </th>
                  <th className="text-gray-600 font-medium p-2 text-xs sm:text-sm">
                    Word
                  </th>
                  <th className="text-gray-600 font-medium p-2 text-xs sm:text-sm">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody>
                {words.map((word, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-gray-700 text-xs sm:text-sm">
                      {currentSlide * wordsPerCard + index + 1}
                    </td>
                    <td className="p-2 text-gray-700 text-xs sm:text-sm">
                      {word.word}
                    </td>
                    <td className="p-2 text-gray-700 text-xs sm:text-sm">
                      {word.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/List Layout */}
          <div className="block sm:hidden">
            {words.map((word, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">No:</span>
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {currentSlide * wordsPerCard + index + 1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Word:
                  </span>
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {word.word}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Frequency:
                  </span>
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {word.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xs sm:text-sm shadow-lg shadow-orange-500 p-4">
          <p>Please enter the URL and</p>
          <p>hit the search button </p>
          <p>to see the top N words.</p>
        </div>
      )}
    </div>
  );
};

// CardCarousel Component with Responsive Navigation Arrows
const CardCarousel = ({ wordData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wordsPerCard, setWordsPerCard] = useState(10);

  // Update wordsPerCard based on window width
  useEffect(() => {
    const updateWordsPerCard = () => {
      if (window.innerWidth < 640) {
        setWordsPerCard(5); // Small screens
      } else {
        setWordsPerCard(10); // Default
      }
    };

    updateWordsPerCard();
    window.addEventListener("resize", updateWordsPerCard);
    return () => window.removeEventListener("resize", updateWordsPerCard);
  }, []);

  // Reset to the first slide when wordData changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [wordData]);

  // Split word data into chunks based on wordsPerCard
  const chunkedData = [];
  for (let i = 0; i < wordData.length; i += wordsPerCard) {
    chunkedData.push(wordData.slice(i, i + wordsPerCard));
  }

  // Move to the next slide
  const nextSlide = () => {
    if (currentSlide < chunkedData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      toast.info("You have reached the last slide.");
    }
  };

  // Move to the previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      toast.info("You are at the first slide.");
    }
  };

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
    },
    onSwipedRight: () => {
      prevSlide();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="w-full max-w-4xl mx-auto my-8 relative px-4 sm:px-6 lg:px-8"
      {...handlers}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {chunkedData.map((words, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 flex justify-center"
            >
              <CarouselCard
                words={words}
                currentSlide={currentSlide}
                wordsPerCard={wordsPerCard}
              />
            </div>
          ))}
          {/* Show an empty card if there's no data */}
          {chunkedData.length === 0 && (
            <div className="min-w-full flex-shrink-0 flex justify-center">
              <CarouselCard
                words={[]}
                currentSlide={0}
                wordsPerCard={wordsPerCard}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {chunkedData.length > 0 && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous Slide"
            className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 sm:p-3 rounded-full shadow-md hover:bg-opacity-100 focus:outline-none transition-opacity duration-300 z-10 ${
              currentSlide === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <FaArrowLeft
              className={`text-gray-600 text-base sm:text-lg ${
                currentSlide === 0 ? "text-gray-300" : ""
              }`}
            />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === chunkedData.length - 1}
            aria-label="Next Slide"
            className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 sm:p-3 rounded-full shadow-md hover:bg-opacity-100 focus:outline-none transition-opacity duration-300 z-10 ${
              currentSlide === chunkedData.length - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            <FaArrowRight
              className={`text-gray-600 text-base sm:text-lg ${
                currentSlide === chunkedData.length - 1 ? "text-gray-300" : ""
              }`}
            />
          </button>
        </>
      )}

      {/* Dots for navigation */}
      {chunkedData.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {chunkedData.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full focus:outline-none transition-colors duration-300 ${
                index === currentSlide ? "bg-orange-500" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;

