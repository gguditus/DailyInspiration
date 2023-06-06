import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [image, setImage] = useState("");
  const [explanation, setExpl] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Fetch the NASA image of the day API
    // if the image of the day is a video, use the thumbnail instead
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=O4d9QZRjTnrBZsdB4SHXpj61zlIIjpXPsJenvNkl&thumbs=true"
    )
      .then((response) => response.json())
      .then((data) => {
        setImage(data.url);
        setExpl(data.explanation);
      })
      .catch((error) => console.error(error));

    // Fetch the Quotes API with the "Inspirational" tag (which are currently case sensitive, but that is listed as a bug on the quotable github)
    fetch("https://api.quotable.io/random?tags=Inspirational")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Update the background image of the body element
    document.body.style.background = `url(${image}) no-repeat center top fixed`;
    document.body.style.backgroundSize = "cover";
  }, [image]);

  return (
    <div>
      <p className="quote">{quote}</p>
      <p className="explanation">{explanation}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
