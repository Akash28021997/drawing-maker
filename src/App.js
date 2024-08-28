import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import PreviewComponent from "./components/PreviewComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/preview" element={<PreviewComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
