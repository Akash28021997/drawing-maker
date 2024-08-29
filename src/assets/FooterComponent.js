import React from "react";
import { Box, Text } from "@chakra-ui/react";

const FooterComponent = () => {
  return (
    <Box
      bg="blue.500"
      color="white"
      py={4}
      textAlign="center"
      position="fixed" // Make footer fixed
      bottom={0}
      width="100%"
      zIndex="10" // Ensure the footer stays above content
    >
      <Text>All Rights Reserved @ 2024</Text>
    </Box>
  );
};

export default FooterComponent;
