import { useState } from "react";
import CircularIndeterminate from "../Circular";
import { motion } from "framer-motion";
import React from "react";
import "./Pitch.css";
import { API_KEY } from "../../API_KEY";
function Pitch() {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState("");
  const [load, setLoad] = useState(false);
  async function callOpenAIAPI() {
    if (text.length == 0) {
      setPitch("Input Something");
      return;
    }
    console.log("Calling the OpenAI API");
    setLoad(true);
    const APIBody = {
      model: "text-davinci-003",
      prompt:
        "Generate a sales pitch of a product utilizing the following information:" +
        text, // input prompt here, other variables do not matter
      temperature: 0,
      max_tokens: 400,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setPitch(data.choices[0].text.trim()); // Extract the first element in data.choices array
        setLoad(false);
      });
  }

  return (
    <div className="pitch-container">
      <div className="pitch-title-wrapper">
        <motion.div
          className="pitch-title"
          style={{ position: "relative" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ fontWeight: "bold" }}>
            <motion.span
              className="glitter-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Generate Sales Pitch
            </motion.span>
          </h1>
        </motion.div>
        <motion.div
          className="pitch-title-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>
            Generate an elevator pitch for any situation. Type in some keywords
            (i.e., product name, description, etc.), and you're good to go!
          </p>
        </motion.div>
      </div>
      <div className="wrapper">
        <div className="pitch-word-count">
          {/* Modify html textarea for word count */}
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste Pitch Info here! Be succinct"
            cols={50}
            rows={10}
          />
        </div>
        <div className="pitch-button">
          <button onClick={() => callOpenAIAPI()}>Get Pitch</button>
        </div>
        <div className="pitch-result">
          {load ? (
            <>
              <CircularIndeterminate></CircularIndeterminate>
            </>
          ) : (
            <>{pitch}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pitch;
