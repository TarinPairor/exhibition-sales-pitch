import React from 'react'

function TextBoxInput(setUserMessage) {
  return (
    <div>
        <textarea name="textarea" id="textarea" onChange={(e) => setUserMessage(e.target.value)}></textarea>
    </div>
  )
}

export default TextBoxInput