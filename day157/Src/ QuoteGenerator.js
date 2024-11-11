
import React, { useState } from 'react';

const QuoteGenerator = () => {
  // Array of quotes
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson",
    "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  ];

  // State for the current quote
  const [quote, setQuote] = useState(quotes[0]);

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="quote-generator">
      <h1>Random Quote Generator</h1>
      <p>{quote}</p>
      <button onClick={getRandomQuote}>New Quote</button>
    </div>
  );
};




export default QuoteGenerator;
