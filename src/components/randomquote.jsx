import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    async function getRandomQuote() {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        setQuote(response.data.content);
      } catch (error) {
        console.error(error)
      }
    }
    getRandomQuote();
  }, []);

  
  return (
    <div>
        <p>A random quote for your labor: </p>
     <h5>{quote && <p>{quote}</p>}</h5>
    </div>
  );
}

export default RandomQuote;