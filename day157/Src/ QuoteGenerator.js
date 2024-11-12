import { useEffect, useState } from "react";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data);
    } catch(err){
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote();
  }, [])
  
  return (
    <div>
      <p>Quote: {quote.content}</p>
      <button onClick={fetchQuote} disabled={isLoading ? true : false}>random</button>
      
    </div>
  )
}

export default QuoteGenerator;