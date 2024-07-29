import Home from "./components/pages/Home";
import Pitch from "./components/pages/Pitch";
import ButtonAppBar from "./components/ButtonAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="App">
      <Router>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pitch" element={<Pitch />} />
          <Route path="/images" element={<ImageUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
