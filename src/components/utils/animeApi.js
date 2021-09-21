import { useState, useEffect } from "react";

const AnimeApi = () => {
  const [Quote, setQuote] = useState("");
  const URL = process.env.REACT_APP_ANIME_API;
  useEffect(() => {
    const fetchQuote = () =>
      fetch(URL)
        .then((response) => response.json())
        .then((quote) => {
          if (quote.quote.length > 180) {
            fetchQuote();
          } else setQuote(quote);
        });
    fetchQuote();
  }, []);
  return !Quote ? (
    ""
  ) : (
    <figure className="alert alert-light fade show">
      <blockquote className="blockquote">
        <p>{Quote.quote}</p>
      </blockquote>
      <figcaption className="blockquote-footer">
        &copy;<cite title="Source Title">{Quote.character}</cite>
      </figcaption>
    </figure>
  );
};

export default AnimeApi;
