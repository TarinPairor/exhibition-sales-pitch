import React, { useState } from "react";
import CircularIndeterminate from "../Circular";
import "./Home.css";
import { motion } from "framer-motion";
import { API_KEY } from "../../API_KEY";
import ResultButtonsWrapper from "../ResultButtonsWrapper";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CopyToClipboardButton from "../CopyToClipboardButton";
import { useRef } from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Home() {
  //EXECUTIVE SUMMARY
  const [businessName, setBusinessName] = useState("");
  const [exInfo, setExInfo] = useState("");
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [exWordCount, setExWordCount] = useState(0);

  //PROPOSED SOLUTION
  const [solutionName, setSolutionName] = useState("");
  const [solutionInfo, setSolutionInfo] = useState("");
  const [solutionFeatures, setSolutionFeatures] = useState("");
  const [solutionWordCount, setSolutionWordCount] = useState(0);
  const [proposedSolution, setProposedSolution] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [priceWordCount, setPriceWordCount] = useState(0);

  //PRICE AND BUDGET
  const [priceAndBudget, setPriceAndBudget] = useState("");
  const [exLoad, setExLoad] = useState(false);
  const [solutionLoad, setSolutionLoad] = useState(false);
  const [priceLoad, setPriceLoad] = useState(false);

  //FEEDBACK
  const [exFB, setExFB] = useState("");
  const [solutionFB, setSolutionFB] = useState("");
  const [priceFB, setPriceFB] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function AlertDialog({ dialogTitle, dialogContent }) {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  //SLIDER SETTINGS
  const sliderRef = useRef();
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    touchThreshold: 10,
  };

  //SLIDER CONTROL USING KEYS
  /*
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      sliderRef.current.slickPrev();
    } else if (e.key === "ArrowRight") {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
*/
  // FUNCTIONS TO GENERATE PROMPTS

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
      `do not include the title and finally, write it with these components in mind` +
      executiveSummaryTips
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
      , include this information about the solution: "${solutionInfo}" 
      
      ,do not include the title and finally, include the following features as bullet points: "${solutionFeatures}"`;
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
       including this information about the solution: "${solutionInfo}" 
       
       ,do not include the title, and include the following pricing details of the product "${priceInfo}"`;
  }

  function generateFeedBack(fb, res) {
    if (!fb) {
      return "";
    }
    return (
      res +
      `

      Remake the above with the following feedback in mind.
    ${fb}
    `
    );
  }

  // CALL OPEN AI FUNCTION

  async function callOpenAIAPIWithSetLoad(prompt, set, setLoad, wordCount) {
    if (!prompt) {
      set("Input something in the prompt otherwise you'll get nothing!");
      return;
    }

    console.log("Calling the OpenAI API");
    setLoad(true);

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    };

    /*
    Old version
    const APIBody = {
      model: "text-davinci-003",
      prompt: prompt, // input prompt here, other variables do not matter
      temperature: 0,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    */

    await fetch("https://api.openai.com/v1/chat/completions", {
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
        if (data.choices && data.choices[0]) {
          const res = data.choices[0].message.content.trim();
          const resLen = res.split(" ").length;
          if (wordCount > 500) {
            console.log("Heavy load in duty");
            const resArray = res.split("\n").filter((x) => x.length > 0);
            const avgIncreaseInLen = Math.ceil(
              (wordCount - resLen) / resArray.length
            );
            const recursivePrompt = (s) =>
              `${s}
            
            :Increase the length of this paragraph to ${avgIncreaseInLen} words`;

            const lengthenedArrayPromises = resArray.map(async (s) => {
              const result = await returnOpenAIAPIPrompt(recursivePrompt(s));
              return result;
            });

            Promise.all(lengthenedArrayPromises)
              .then((lengthenedArray) => {
                set(lengthenedArray.join("\n"));
              })
              .catch((error) => {
                console.error("Error in Promise.all:", error);
              });
          } else {
            set(data.choices[0].message.content.trim());
          }
        } else {
          console.error(data.error);
        }
        setLoad(false);
      });
  }

  async function returnOpenAIAPIPrompt(prompt) {
    console.log("Calling the OpenAI API");
    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1250,
    };

    /*
    Old version
    const APIBody = {
      model: "text-davinci-003",
      prompt: prompt, // input prompt here, other variables do not matter
      temperature: 0,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    */

    // Explicitly return the promise
    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.choices[0].message.content.trim());
        if (data.choices && data.choices[0]) {
          return data.choices[0].message.content.trim();
        } else {
          console.error(data.error);
          return "Something went wrong but at least I was returned";
        }
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
      <Slider ref={sliderRef} {...sliderSettings}>
        <div className="slider-container">
          <motion.div
            className="heavy-loader-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h6>
              Deploy our "Heavy Load" prompt for responses exceeding 500 words.
              It may take a while...
            </h6>
          </motion.div>
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
            <div className="exec-summary-word-count">
              {/* Modify html textarea for word count */}
              Paste word count here!
              <input
                type="number"
                onChange={(e) => setExWordCount(e.target.value)}
              />
            </div>
            <div className="exec-summary-Button">
              <Button
                onClick={() =>
                  callOpenAIAPIWithSetLoad(
                    generateExecutiveSummary(businessName, exInfo, exWordCount),
                    setExecutiveSummary,
                    setExLoad,
                    exWordCount
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
                      <div className="res-textarea">
                        <textarea
                          value={executiveSummary}
                          onChange={(e) => setExecutiveSummary(e.target.value)}
                          placeholder="Executive Summary Goes Here!"
                          cols={50}
                          rows={10}
                        />
                      </div>
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
              {open && (
                <div className="alert">
                  <AlertDialog
                    dialogTitle="Feedback Error"
                    dialogContent="We do not support feedback for heavy duty prompts over 500 words."
                  />
                </div>
              )}
              <Button
                onClick={() => {
                  if (
                    exWordCount > 500 ||
                    executiveSummary.split(" ").length > 500
                  ) {
                    handleClickOpen();
                  } else {
                    callOpenAIAPIWithSetLoad(
                      generateFeedBack(exFB, executiveSummary),
                      setExecutiveSummary,
                      setExLoad,
                      0
                    );
                  }
                }}
              >
                Generate Feedback
              </Button>
            </div>
            <CopyToClipboardButton text={executiveSummary} />
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
              {/* Modify html textarea for word count */}
              Paste word count here!
              <input
                type="number"
                onChange={(e) => setSolutionWordCount(e.target.value)}
              />
            </div>
            <div className="solution-Button">
              <Button
                onClick={() =>
                  callOpenAIAPIWithSetLoad(
                    generateProposedSolution(
                      solutionName,
                      solutionInfo,
                      solutionFeatures,
                      solutionWordCount
                    ),
                    setProposedSolution,
                    setSolutionLoad,
                    solutionWordCount
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
                      <div className="res-textarea">
                        <textarea
                          value={proposedSolution}
                          onChange={(e) => setProposedSolution(e.target.value)}
                          placeholder="Proposed Solution Goes Here!"
                          cols={50}
                          rows={10}
                        />
                      </div>
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
                  if (
                    solutionWordCount > 500 ||
                    proposedSolution.split(" ").length > 500
                  ) {
                    handleClickOpen();
                  } else {
                    callOpenAIAPIWithSetLoad(
                      generateFeedBack(solutionFB, proposedSolution),
                      setProposedSolution,
                      setSolutionLoad,
                      0
                    );
                  }
                }}
              >
                Generate Feedback
              </Button>
            </div>
            <CopyToClipboardButton text={proposedSolution} />
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
              Paste word count here!
              <input
                type="number"
                onChange={(e) => setPriceWordCount(e.target.value)}
              />
            </div>

            <div className="price-Button">
              <Button
                onClick={() =>
                  callOpenAIAPIWithSetLoad(
                    generatePriceAndBudget(
                      priceInfo,
                      priceWordCount,
                      solutionName,
                      solutionInfo
                    ),
                    setPriceAndBudget,
                    setPriceLoad,
                    priceWordCount
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
                      <div className="res-textarea">
                        <textarea
                          value={priceAndBudget}
                          onChange={(e) => setPriceAndBudget(e.target.value)}
                          placeholder="Executive Summary Goes Here!"
                          cols={50}
                          rows={10}
                        />
                      </div>
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
                  if (
                    priceWordCount > 500 ||
                    priceAndBudget.split(" ").length > 500
                  ) {
                    handleClickOpen();
                  } else {
                    callOpenAIAPIWithSetLoad(
                      generateFeedBack(priceFB, priceAndBudget),
                      setPriceAndBudget,
                      setPriceLoad,
                      0
                    );
                  }
                }}
              >
                Generate Feedback
              </Button>
            </div>
            <CopyToClipboardButton text={priceAndBudget} />
          </div>
        </div>
      </Slider>
      <div className="under-slider-container">
        <div className="result-button-wrapper">
          <ResultButtonsWrapper
            executiveSummary={executiveSummary}
            proposedSolution={proposedSolution}
            priceAndBudget={priceAndBudget}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
