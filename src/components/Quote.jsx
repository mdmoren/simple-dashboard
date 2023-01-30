import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();

      // if (data.content.length > 75) {
      //   fetchQuote();
      // } else {
      //   setQuote(data.content);
      //   setAuthor(data.author);
      // }
      setQuote(data.content);
      setAuthor(data.author);
    }

    fetchQuote();
  }, []);

  return (
    <div
      className="
      flex relative w-full h-full justify-center items-center
      "
    >
      <div className="absolute flex flex-col items-center justify-center text-[#eee] w-full h-full px-2 md:px-10">
        <p className="text-md md:text-xl font-bold text-center mb-4">
          "{quote}"
        </p>
        <p className="text-sm md:text-md font-semibold text-center">
          - {author}
        </p>
      </div>
    </div>
  );
};

export default Quote;
