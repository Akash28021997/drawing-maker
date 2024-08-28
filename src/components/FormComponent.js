import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

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
      {/* Header */}
      <Box bg="blue.500" color="white" py={4} position="relative" width="100%">
        <Flex
          align="center"
          px={5}
          maxW="1200px"
          mx="auto"
          justify="space-between"
        >
          <Box
            bg="white"
            borderRadius="md"
            p={2}
            mr={4} // Margin to space out from the text
          >
            <Image
              src="logo.png" // Replace with the path to your logo
              alt="Logo"
              boxSize="50px" // Adjust size as needed
            />
          </Box>
          <Box flex="1" textAlign="center">
            <Heading size="lg">RKD Drawing Maker</Heading>
          </Box>
        </Flex>
      </Box>

      {/* Main Form */}
      <Box p={5} maxW="600px" mx="auto" flex="1">
        <Heading mb={5} textAlign="center">
          Enter Your Details
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={3} isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isFullWidth
            />
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel>Application Number:</FormLabel>
            <Input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              isFullWidth
            />
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel>Upload Photos:</FormLabel>
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

      {/* Footer */}
      <Box
        bg="blue.500"
        color="white"
        py={4}
        textAlign="center"
        position="absolute"
        bottom={0}
        width="100%"
      >
        <Text>All Rights Reserved @ 2024</Text>
      </Box>
    </Box>
  );
};

export default FormComponent;
