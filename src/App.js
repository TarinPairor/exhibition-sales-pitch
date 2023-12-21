import Home from "./components/Home";
import Pitch from "./components/Pitch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pitch" element={<Pitch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
