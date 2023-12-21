import { useState } from "react";
import CircularIndeterminate from "./Circular";
import "./Home.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { API_KEY } from "../API_KEY";

function Home() {
  const [businessName, setBusinessName] = useState("");
  const [exInfo, setExInfo] = useState("");
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [exWordCount, setExWordCount] = useState("");
  const [solutionName, setSolutionName] = useState("");
  const [solutionInfo, setSolutionInfo] = useState("");
  const [solutionFeatures, setSolutionFeatures] = useState("");
  const [solutionWordCount, setSolutionWordCount] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [priceWordCount, setPriceWordCount] = useState("");
  const [priceAndBudget, setPriceAndBudget] = useState("");
  const [load, setLoad] = useState(false);

  const [exFB, setExFB] = useState("");
  const [solutionFB, setSolutionFB] = useState("");
  const [priceFB, setPriceFB] = useState("");

  function generateExecutiveSummary(businessName, exInfo, wordCount) {
    if (!businessName && !exInfo && !wordCount) {
      return "";
    }
    const executiveSummaryTips = `
    Capture attention by focusing on the client's needs and the positive results they can expect.
    Demonstrate understanding of the client's situation and emphasize the benefits of solving the problem.
    Briefly introduce your effective solution, creating excitement without delving into specifics.
    Highlight your qualifications, expertise, or unique offerings that set you apart briefly.
    Close with enthusiasm, expressing a desire to work together and emphasizing mutual success.
    Additionally, fill in the [Company Name] with the businessName and don't include boilerplate text in [].
    `;
    return (
      `generate me an executive summary ${wordCount} words long for sales proposal about the following company: ${businessName}` +
      (exInfo === ""
        ? `, include the following information about the company: ${exInfo}`
        : " " + exInfo) +
      `and finally, write it with these components in mind` +
      executiveSummaryTips
    );
  }

  function generateExecutiveSummaryFeedBack(exFB) {
    if (!exFB) {
      return "";
    }
    return (
      executiveSummary +
      `
    
    ${exFB}
    `
    );
  }

  function generateProposedSolution(
    solutionName,
    solutionInfo,
    solutionFeatures,
    solutionWordCount
  ) {
    if (
      !solutionName &&
      !solutionInfo &&
      !solutionFeatures &&
      !solutionWordCount
    ) {
      return "";
    }
    return `generate me a proposed solution ${solutionWordCount} words long for sales proposal that utilizes a product by the name of: "${solutionName}"
      , include this information about the solution: "${solutionInfo}" and finally, include the following features as bullet points: "${solutionFeatures}"`;
  }

  function generateProposedSolutionFeedBack(solutionFB) {
    if (!solutionFB) {
      return "";
    }
    return (
      proposedSolution +
      `
    
    ${solutionFB}
    `
    );
  }

  function generatePriceAndBudget(
    priceInfo,
    priceWordCount,
    solutionName,
    solutionInfo
  ) {
    if (!solutionName && !solutionInfo && !priceInfo && !priceWordCount) {
      return "";
    }
    return `generate me proper "pricing and budget" information ${priceWordCount} words long for sales proposal of the product by the name of: "${solutionName}"
       including this information about the solution: "${solutionInfo}" and include the following pricing details of the product "${priceInfo}"`;
  }

  function generatePriceAndBudgetFeedBack(priceFB) {
    if (!priceFB) {
      return "";
    }
    return (
      priceAndBudget +
      `
    
    ${priceFB}
    `
    );
  }

  async function callOpenAIAPI(prompt, set) {
    if (!prompt) {
      set("Input something");
      return;
    }
    console.log("Calling the OpenAI API");
    setLoad(true);
    const APIBody = {
      model: "text-davinci-003",
      prompt: prompt, // input prompt here, other variables do not matter
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
        set(data.choices[0].text.trim()); // Extract the first element in data.choices array
        setLoad(false);
      });
  }

  return (
    <div className="Home">
      <div className="home-title" style={{ position: "relative" }}>
        <h1 style={{ fontWeight: "bold" }}>
          <span
            style={{
              backgroundImage: "linear-gradient(45deg, #f06, #9f6, #06f, #f06)",
              backgroundSize: "400% 400%",
              color: "transparent",
              WebkitBackgroundClip: "text",
              animation: "glitter 3s infinite linear",
              display: "inline-block",
            }}
          >
            Generate Sales Proposal
          </span>
        </h1>
      </div>
      <div className="exec-summary-container">
        <div className="exec-summary-title">
          <h2>Executive Summary</h2>
        </div>
        <div className="business-name">
          {/* Modify html textarea for businessName */}
          <textarea
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Paste your company name here!"
            cols={50}
            rows={2}
          />
        </div>
        <div className="exec-summary-info">
          {/* Modify html textarea for exInfo */}
          <textarea
            onChange={(e) => setExInfo(e.target.value)}
            placeholder="Paste additional information here! What do you do? What are some key qualifications?"
            cols={50}
            rows={8}
          />
        </div>
        <div className="-exec-summary-word-count">
          {/* Modify html textarea for word count */}
          <textarea
            type
            onChange={(e) => setExWordCount(e.target.value)}
            placeholder="Paste word count here!"
            cols={50}
            rows={1}
          />
        </div>
        <div className="exec-summary-button">
          <button
            onClick={() =>
              callOpenAIAPI(
                generateExecutiveSummary(businessName, exInfo, exWordCount),
                setExecutiveSummary
              )
            }
          >
            Get Executive Summary
          </button>
          <div className="exec-summary-result">
            {load ? (
              <CircularIndeterminate />
            ) : (
              <>
                {executiveSummary !== "" && (
                  <>
                    <h3>{executiveSummary}</h3>
                    <p>Word count: {executiveSummary.split(" ").length}</p>
                  </>
                )}
              </>
            )}
          </div>
          <div className="exec-summary-feedback-input">
            <textarea
              onChange={(e) => setExFB(e.target.value)}
              placeholder="Give feedback here!"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="exec-summary-feedback-button">
            <button
              onClick={() => {
                callOpenAIAPI(
                  generateExecutiveSummaryFeedBack(exFB),
                  setExecutiveSummary
                );
              }}
            >
              Generate Feedback
            </button>
          </div>
        </div>
      </div>
      <div className="proposed-solution-container">
        <div className="proposed-solution-title">
          <h2>Proposal solution</h2>
        </div>
        <div className="solution-name">
          {/* Modify html textarea for solutionName */}
          <textarea
            onChange={(e) => setSolutionName(e.target.value)}
            placeholder="Paste your solution name here!"
            cols={50}
            rows={2}
          />
        </div>
        <div className="solution-info">
          {/* Modify html textarea for solutionInfo */}
          <textarea
            onChange={(e) => setSolutionInfo(e.target.value)}
            placeholder="Paste additional information about the solution here!"
            cols={50}
            rows={8}
          />
        </div>
        <div className="solution-features">
          {/* Modify html textarea for solutionFeatures */}
          <textarea
            onChange={(e) => setSolutionFeatures(e.target.value)}
            placeholder="Paste solution features here! Write each feature separated by a bracket."
            cols={50}
            rows={4}
          />
        </div>
        <div className="solution-word-count">
          {/* Modify html textarea for solutionWordCount */}
          <textarea
            onChange={(e) => setSolutionWordCount(e.target.value)}
            placeholder="Paste word count here!"
            cols={50}
            rows={1}
          />
        </div>
        <div className="solution-button">
          <button
            onClick={() =>
              callOpenAIAPI(
                generateProposedSolution(
                  solutionName,
                  solutionInfo,
                  solutionFeatures,
                  solutionWordCount
                ),
                setProposedSolution
              )
            }
          >
            Get Proposed Solution
          </button>
          <div className="proposed-solution-result">
            {load ? (
              <CircularIndeterminate />
            ) : (
              <>
                {proposedSolution !== "" && (
                  <>
                    <h3>{proposedSolution}</h3>
                    <p>Word count: {proposedSolution.split(" ").length}</p>
                  </>
                )}
              </>
            )}
          </div>
          <div className="proposed-solution-feedback-input">
            <textarea
              onChange={(e) => setSolutionFB(e.target.value)}
              placeholder="Give feedback here!"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="proposed-solution-feedback-button">
            <button
              onClick={() => {
                callOpenAIAPI(
                  generateProposedSolutionFeedBack(solutionFB),
                  setProposedSolution
                );
              }}
            >
              Generate Feedback
            </button>
          </div>
        </div>
      </div>
      <div className="price-container">
        <div className="price-title">
          <h2>Price And Budget</h2>
        </div>
        <div className="price-info">
          {/* Modify html textarea for priceInfo */}
          <textarea
            onChange={(e) => setPriceInfo(e.target.value)}
            placeholder="Paste information about pricing and budget here!"
            cols={50}
            rows={10}
          />
        </div>
        <div className="price-word-count">
          {/* Modify html textarea for priceInfo */}
          <textarea
            onChange={(e) => setPriceWordCount(e.target.value)}
            placeholder="Paste pricing word count here!"
            cols={50}
            rows={1}
          />
        </div>
        <div className="price-button">
          <button
            onClick={() =>
              callOpenAIAPI(
                generatePriceAndBudget(
                  priceInfo,
                  priceWordCount,
                  solutionName,
                  solutionInfo
                ),
                setPriceAndBudget
              )
            }
          >
            Get Pricing And Budgeting Information
          </button>
          <div className="price-result">
            {load ? (
              <CircularIndeterminate />
            ) : (
              <>
                {priceAndBudget !== "" && (
                  <>
                    <h3>{priceAndBudget}</h3>
                    <p>Word count: {priceAndBudget.split(" ").length}</p>
                  </>
                )}
              </>
            )}
          </div>
          <div className="price-feedback-input">
            <textarea
              onChange={(e) => setPriceFB(e.target.value)}
              placeholder="Give feedback here!"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="price-feedback-button">
            <button
              onClick={() => {
                callOpenAIAPI(
                  generatePriceAndBudgetFeedBack(priceFB),
                  setPriceAndBudget
                );
              }}
            >
              Generate Feedback
            </button>
          </div>
        </div>
      </div>
      <div className="copy-to-clipboard-button">
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              executiveSummary + proposedSolution + priceAndBudget
            );
          }}
        >
          Copy to Clipboard
        </button>
      </div>
      <Link to="/pitch">
        <button>Link</button>
      </Link>
    </div>
  );
}

export default Home;
