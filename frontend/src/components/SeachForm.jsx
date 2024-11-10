import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getURLData } from "../utils/methodsHandler";
import { ImSpinner2 } from "react-icons/im"; // Import a spinner icon
import { toast } from "react-toastify";

function SearchForm({
  searchQuery,
  numberofWords,
  setSearchQuery,
  setNumberOfWords,
  setWordData,
}) {
  const [loading, setLoading] = useState(false); // Add loading state

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when fetch starts

    try {
      const res = await getURLData({ url: searchQuery, n: numberofWords });
      setWordData(res.data.topWords);
      if (res.length == 0 || res === undefined) {
        // console.log(res);
        toast.warn("No valid words to be shown....");
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      toast.error(String(error.response.data.errors));
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  return (
    <>
      <div className="text-2xl font-bold text-center text-white p-4 shadow-lg shadow-orange-500 mb-5">
        Top N Words
      </div>

      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 w-full max-w-4xl mx-auto p-4"
      >
        {/* Search Icon and Input */}
        <div className="relative flex items-center w-full md:max-w-xs">
          <AiOutlineSearch
            className="absolute left-3 text-gray-400"
            size={24}
          />
          <input
            type="text"
            placeholder="Enter the URL ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading} // Disable input when loading
            className={`w-full pl-10 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition duration-200 ${
              loading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Number of Words Input */}
        <div className="w-full md:max-w-xs">
          <input
            type="number"
            placeholder="Enter number of words ..."
            value={numberofWords}
            onChange={(e) => setNumberOfWords(e.target.value)}
            disabled={loading} // Disable input when loading
            className={`w-full p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition duration-200 ${
              loading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className={`w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-black text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out transform ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:from-black hover:to-orange-500 hover:scale-105"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ImSpinner2 className="animate-spin mr-2" size={20} />
              Loading...
            </div>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </>
  );
}

export default SearchForm;
