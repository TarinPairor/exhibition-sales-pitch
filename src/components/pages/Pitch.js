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
    if (text.length === 0) {
      setPitch("Input Something");
      return;
    }

    function generatePitch() {
      return `Generate a sales pitch script of a product utilizing the following information: ${text} 
      
      .Additionally, to construct this pitch, I want you to utilize these key components:
      Identify the problem.
      State your value proposition.
      Offer solutions.
      Show social proof.

      `;
    }

    console.log("Calling the OpenAI API");
    setLoad(true);
    const APIBody = {
      model: "text-davinci-003",
      prompt: generatePitch(),
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
            Let's infuse some energy and enthusiasm into the elevator pitch.
            Provide the keywords or a brief description of your product,
            service, or idea? This will help me tailor the pitch to make it
            truly stand out!
          </p>
        </motion.div>
      </div>
      <div className="wrapper">
        <div className="pitch-container">
          {/* Modify html textarea for pitch */}
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste Pitch Info here! Be succinct."
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
