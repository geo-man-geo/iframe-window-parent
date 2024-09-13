import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {
      console.log(event)
      // Verify the origin to ensure it's from the correct iframe
      if (event.origin.includes("https://iframe-window-cors.vercel.app/") && event.data === "close-iframe") {
        const iframe = document.getElementById("my-iframe");
        if (iframe) {
          // Remove or hide the iframe
          iframe.style.display = "none"; // You can also use iframe.remove() to remove it entirely
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={() => processChange()} />
        <input type="text" onChange={() => processChangeclone()} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      
        <iframe
          id="my-iframe"
          src="https://iframe-window-cors.vercel.app/"
          width="600"
          height="400"
        ></iframe>
    
      </header>
    </div>
  );
}

export default App;

// DEBOUNCE FUNCTION
const DEFAULT_TIMEOUT = 1000;
const debounce = (func, timeout = DEFAULT_TIMEOUT) => {
  let timer;
  return (args) => {
    console.log("[args]", func);
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const saveInput = (num) => {
  console.log("Saving data", num);
};

const anotherFunction = (value, countryName) =>
  console.log("[o/p]", value, new Date(), countryName);

const processChange = debounce(() => saveInput(Math.floor(Math.random() * 10)));
const processChangeclone = debounce(() => anotherFunction(5, "InidSDFa"));
