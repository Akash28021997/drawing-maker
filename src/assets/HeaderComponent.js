import React from "react";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";

const HeaderComponent = () => {
  return (
    <Box
      bg="blue.500"
      color="white"
      h="70px" // Set height same as footer
      position="fixed" // Make header fixed
      top={0}
      width="100%"
      zIndex="10" // Ensure the header stays above content
    >
      <Flex
        align="center"
        px={5}
        maxW="1200px"
        mx="auto"
        justifyContent="space-between" // Adjust for proper spacing
      >
        {/* Move the logo all the way to the left */}
        <Box
          bg="white"
          borderRadius="md"
          p={1}
          display="inline-block"
          mr={4}
          mt={8}
          ml={8}
          mb={4}
          position="absolute" // Fix the logo to the left end
          left="10px" // Adjust this to control how far left it appears
        >
          <Image
            src="logo.png" // Replace with your logo path
            alt="Logo"
            boxSize="50px" // Adjust size as needed
          />
        </Box>

        <Box flex="1" mt={4} textAlign="center">
          <Heading size="lg">Drawings Maker</Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderComponent;
