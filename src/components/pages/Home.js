import { useState } from "react";
import CircularIndeterminate from "../Circular";
import "./Home.css";
import { motion } from "framer-motion";
import { API_KEY } from "../../API_KEY";
import ResultButtonsWrapper from "../ResultButtonsWrapper";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  const [exLoad, setExLoad] = useState(false);
  const [solutionLoad, setSolutionLoad] = useState(false);
  const [priceLoad, setPriceLoad] = useState(false);

  const [exFB, setExFB] = useState("");
  const [solutionFB, setSolutionFB] = useState("");
  const [priceFB, setPriceFB] = useState("");

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    return `generate me a proposed solution ${solutionWordCount} words long for sales proposal that utilizes a solution by the name of: "${solutionName}"
      , include this information about the solution: "${solutionInfo}" and finally, include the following features as bullet points: "${solutionFeatures}"`;
  }

  function generateProposedSolutionFeedBack(solutionFB) {
    if (!solutionFB) {
      return "";
    }
    return (
      proposedSolution +
      `

    Remake the above with the following feedback in mind.
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
    return `generate me proper "pricing and budget" information ${priceWordCount} words long for sales proposal of the solution by the name of: "${solutionName}"
       including this information about the solution: "${solutionInfo}" and include the following pricing details of the product "${priceInfo}"`;
  }

  function generatePriceAndBudgetFeedBack(priceFB) {
    if (!priceFB) {
      return "";
    }
    return (
      priceAndBudget +
      `

      Remake the above with the following feedback in mind.
    ${priceFB}
    `
    );
  }

  async function callOpenAIAPI(prompt, set, setLoad) {
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
      <div className="home-title-wrapper">
        <motion.div
          className="home-title"
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
              Generate Sales Proposal
            </motion.span>
          </h1>
        </motion.div>
        <motion.div
          className="home-title-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>
            Unlock the Power of Simplified Messages! 🚀 Are you ready to elevate
            your sales game? Paste in your preferences, and watch our Generative
            AI transform them into a compelling sales proposal that truly pops!
            <br />
            🌟 A sales proposal is more than a document; it's your strategic key
            to success! 🎯 This formal presentation outlines your offerings,
            addressing the client's unique needs with precision. Think of it as
            your personalized roadmap to a mutually beneficial partnership.
            <br />
            In a world of complexity, simplicity speaks volumes! Our Generative
            AI is here to turn your preferences into a vibrant sales pitch that
            resonates. Say goodbye to bland proposals; say hello to a
            persuasive, standout message!
          </p>
        </motion.div>
      </div>
      <Slider {...sliderSettings}>
        <div className="slider-container">
          <div className="exec-summary-container">
            <div className="exec-summary-title">
              <h2>Executive Summary</h2>
            </div>
            <div className="business-name">
              {/* Modify html textarea for businessName */}
              <textarea
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Paste your company name here!"
                cols={45}
                rows={2}
              />
            </div>
            <div className="exec-summary-info">
              {/* Modify html textarea for exInfo */}
              <textarea
                onChange={(e) => setExInfo(e.target.value)}
                placeholder="Paste additional information here! What do you do? What are some key qualifications?"
                cols={45}
                rows={8}
              />
            </div>
            <div className="-exec-summary-word-count">
              {/* Modify html textarea for word count */}
              <textarea
                type
                onChange={(e) => setExWordCount(e.target.value)}
                placeholder="Paste word count here!"
                cols={45}
                rows={1}
              />
            </div>
            <div className="exec-summary-Button">
              <Button
                onClick={() =>
                  callOpenAIAPI(
                    generateExecutiveSummary(businessName, exInfo, exWordCount),
                    setExecutiveSummary,
                    setExLoad
                  )
                }
              >
                Get Executive Summary
              </Button>
            </div>
            <div className="exec-summary-result">
              {exLoad ? (
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
                placeholder="Give feedback here! Give any recommendations on how you want to improve this."
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="exec-summary-feedback-Button">
              <Button
                onClick={() => {
                  callOpenAIAPI(
                    generateExecutiveSummaryFeedBack(exFB),
                    setExecutiveSummary,
                    setExLoad
                  );
                }}
              >
                Generate Feedback
              </Button>
            </div>
          </div>
        </div>

        <div className="slider-container">
          <div className="proposed-solution-container">
            <div className="proposed-solution-title">
              <h2>Proposal solution</h2>
            </div>
            <div className="solution-name">
              {/* Modify html textarea for solutionName */}
              <textarea
                onChange={(e) => setSolutionName(e.target.value)}
                placeholder="Paste your solution name here!"
                cols={45}
                rows={2}
              />
            </div>
            <div className="solution-info">
              {/* Modify html textarea for solutionInfo */}
              <textarea
                onChange={(e) => setSolutionInfo(e.target.value)}
                placeholder="Paste additional information about the solution here!"
                cols={45}
                rows={8}
              />
            </div>
            <div className="solution-features">
              {/* Modify html textarea for solutionFeatures */}
              <textarea
                onChange={(e) => setSolutionFeatures(e.target.value)}
                placeholder="Paste solution features here! Write each feature separated by a comma (,)."
                cols={45}
                rows={4}
              />
            </div>
            <div className="solution-word-count">
              {/* Modify html textarea for solutionWordCount */}
              <textarea
                onChange={(e) => setSolutionWordCount(e.target.value)}
                placeholder="Paste word count here!"
                cols={45}
                rows={1}
              />
            </div>
            <div className="solution-Button">
              <Button
                onClick={() =>
                  callOpenAIAPI(
                    generateProposedSolution(
                      solutionName,
                      solutionInfo,
                      solutionFeatures,
                      solutionWordCount
                    ),
                    setProposedSolution,
                    setSolutionLoad
                  )
                }
              >
                Get Proposed Solution
              </Button>
            </div>
            <div className="proposed-solution-result">
              {solutionLoad ? (
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
                placeholder="Give feedback here! Give any recommendations on how you want to improve this."
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="proposed-solution-feedback-Button">
              <Button
                onClick={() => {
                  callOpenAIAPI(
                    generateProposedSolutionFeedBack(solutionFB),
                    setProposedSolution,
                    setSolutionLoad
                  );
                }}
              >
                Generate Feedback
              </Button>
            </div>
          </div>
        </div>

        <div className="slider-container">
          <div className="price-container">
            <div className="price-title">
              <h2>Price And Budget</h2>
            </div>
            <div className="price-info">
              {/* Modify html textarea for price info */}
              <textarea
                onChange={(e) => setPriceInfo(e.target.value)}
                placeholder="Paste information about pricing and budget here!"
                cols={45}
                rows={10}
              />
            </div>
            <div className="price-word-count">
              {/* Modify html textarea for price word count */}
              <textarea
                onChange={(e) => setPriceWordCount(e.target.value)}
                placeholder="Paste pricing word count here!"
                cols={45}
                rows={1}
              />
            </div>
            <div className="price-Button">
              <Button
                onClick={() =>
                  callOpenAIAPI(
                    generatePriceAndBudget(
                      priceInfo,
                      priceWordCount,
                      solutionName,
                      solutionInfo
                    ),
                    setPriceAndBudget,
                    setPriceLoad
                  )
                }
              >
                Get Pricing And Budgeting Information
              </Button>
            </div>
            <div className="price-result">
              {priceLoad ? (
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
                placeholder="Give feedback here! Give any recommendations on how you want to improve this."
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="price-feedback-Button">
              <Button
                onClick={() => {
                  callOpenAIAPI(
                    generatePriceAndBudgetFeedBack(priceFB),
                    setPriceAndBudget,
                    setPriceLoad
                  );
                }}
              >
                Generate Feedback
              </Button>
            </div>
          </div>
        </div>
      </Slider>

      <ResultButtonsWrapper
        executiveSummary={executiveSummary}
        proposedSolution={proposedSolution}
        priceAndBudget={priceAndBudget}
      />
    </div>
  );
}

export default Home;
