import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    photos: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e) => {
    setFormData({
      ...formData,
      photos: Array.from(e.target.files),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/preview", { state: formData });
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Main Form */}
      <Box p={5} maxW="600px" mx="auto" flex="1">
        <form onSubmit={handleSubmit}>
          <FormControl mb={3} isRequired>
            <FormLabel>Applicant Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isFullWidth
            />
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel>Patent Application Number:</FormLabel>
            <Input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              isFullWidth
            />
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel>Upload Drawings:</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/jpeg, image/png"
              onChange={handlePhotoUpload}
              isFullWidth
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Preview
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormComponent;
