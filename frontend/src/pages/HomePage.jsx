import { useState } from "react";
import backgroundImage from "../assets/background-2.jpg";
import Card from "../components/Card.jsx";
import SearchForm from "../components/SeachForm.jsx";
function DarkBackgroundImage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [numberofWords, setNumberOfWords] = useState("");
  const [wordData, setWordData] = useState([]);

  return (
    <>
    <div
      className="min-h-screen bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="fixed inset-0 bg-black opacity-30 backdrop-blur-sm"></div>
      <div className="relative z-10 text-white flex flex-col items-center justify-center">
        <SearchForm
          setWordData={setWordData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          numberofWords={numberofWords}
          setNumberOfWords={setNumberOfWords}
        />
        <Card wordData={wordData} />
      </div>
    </div>
    </>
  );
}

export default DarkBackgroundImage;
