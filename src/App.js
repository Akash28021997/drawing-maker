import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import PreviewComponent from "./components/PreviewComponent";
import HeaderComponent from "./assets/HeaderComponent";
import FooterComponent from "./assets/FooterComponent";

function App() {
  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <HeaderComponent />
        <Box
          flex="1"
          pt="80px" // Add padding to prevent content from being hidden under header
          pb="60px" // Add padding to prevent content from being hidden under footer
        >
          <Routes>
            <Route path="/" element={<FormComponent />} />
            <Route path="/preview" element={<PreviewComponent />} />
          </Routes>
        </Box>
        <FooterComponent />
      </Box>
    </Router>
  );
}

export default App;