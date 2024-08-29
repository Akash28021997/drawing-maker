import React from "react";
import { useLocation } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const PreviewComponent = () => {
  const { state } = useLocation(); // Access the passed data from the form component
  const { name, number, photos } = state;

  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 595.28; // A4 size in points
    const pageHeight = 841.89;

    // Convert cm to points
    const marginTop = 2.5 * 28.35; // Top margin
    const marginBottom = 2.5 * 28.35; // Bottom margin
    const marginLeft = 2.5 * 28.35; // Left margin
    const marginRight = 2.5 * 28.35; // Right margin

    const contentWidth = pageWidth - marginLeft - marginRight;
    const contentHeight = pageHeight - marginTop - marginBottom;

    // Embed static image
    const staticImageUrl = "sign.jpg"; // Update with the path to your static image
    let staticImageBytes;
    try {
      staticImageBytes = await fetch(staticImageUrl).then((res) =>
        res.arrayBuffer()
      );
      const staticImageType = (
        await fetch(staticImageUrl).then((res) =>
          res.headers.get("Content-Type")
        )
      ).split("/")[1];
      let staticImage;

      if (staticImageType === "png") {
        staticImage = await pdfDoc.embedPng(staticImageBytes);
      } else if (staticImageType === "jpeg" || staticImageType === "jpg") {
        staticImage = await pdfDoc.embedJpg(staticImageBytes);
      } else {
        throw new Error("Unsupported static image format");
      }

      // Define image size
      const staticImgWidth = 150; // Adjust size as needed
      const staticImgHeight = 50; // Adjust size as needed

      for (let index = 0; index < photos.length; index++) {
        const photo = photos[index];
        const photoType = photo.type;

        let image;
        if (photoType === "image/png") {
          const imgData = await photo.arrayBuffer();
          image = await pdfDoc.embedPng(imgData);
        } else if (photoType === "image/jpeg") {
          const imgData = await photo.arrayBuffer();
          image = await pdfDoc.embedJpg(imgData);
        } else {
          throw new Error("Unsupported image format");
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = image;

        // Define X positions for left and right aligned text
        const leftAlignX = marginLeft;
        const rightAlignX = pageWidth - marginRight - 100; // Adjust as needed

        // Header Information
        page.drawText(`NAME: ${name}`, {
          x: leftAlignX,
          y: pageHeight - marginTop + 12, // Adjust Y position for header
          size: 12,
          color: rgb(0, 0, 0),
        });
        page.drawText(`NO: ${number}`, {
          x: leftAlignX,
          y: pageHeight - marginTop - 12, // Adjust Y position for header
          size: 12,
          color: rgb(0, 0, 0),
        });

        page.drawText(`NO. OF SHEETS: ${photos.length}`, {
          x: rightAlignX,
          y: pageHeight - marginTop + 12, // Adjust Y position for header
          size: 12,
          color: rgb(0, 0, 0),
        });
        page.drawText(`SHEET NO: ${index + 1}`, {
          x: rightAlignX,
          y: pageHeight - marginTop - 12, // Adjust Y position for header
          size: 12,
          color: rgb(0, 0, 0),
        });

        // Image Dimensions
        const imgWidth = contentWidth; // Fit image within content width
        const imgHeight = (height / width) * imgWidth;

        // Center the image on the page
        page.drawImage(image, {
          x: marginLeft,
          y: pageHeight - marginTop - imgHeight - 100, // Adjust Y position
          width: imgWidth,
          height: imgHeight,
        });

        // Footer Information
        const footerSpacing = 20; // Space between footer lines
        const footerTopPosition = marginBottom + staticImgHeight + 10; // Move image up by reducing this value

        // Draw static image in footer
        page.drawImage(staticImage, {
          x: pageWidth - marginRight - staticImgWidth, // Align to right
          y: footerTopPosition + 12, // Move image up
          width: staticImgWidth,
          height: staticImgHeight,
        });

        // Adjust Y position for footer text
        const footerTextTopPosition =
          footerTopPosition - staticImgHeight - footerSpacing;

        const footerText = [
          `MOHAN RAJKUMAR DEWAN, IN/PA-25`,
          "OF R. K. DEWAN & CO.",
          "APPLICANT'S PATENT ATTORNEY",
        ];

        footerText.forEach((text, idx) => {
          const yPosition =
            footerTextTopPosition + (footerText.length - idx) * footerSpacing; // Calculate Y position for each line
          page.drawText(text, {
            x: pageWidth - marginRight - 175, // Align text to right with margin
            y: yPosition, // Position from the bottom
            size: 10,
            color: rgb(0, 0, 0),
            maxWidth: 200, // Constrain text width
          });
        });
      }

      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.pdf";
      link.click();
    } catch (error) {
      console.error("Error handling PDF generation:", error);
    }
  };

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="100%"
    >
      <Heading color={"blue.500"} mt={-2} mb={1}>
        Preview
      </Heading>
      <Box
        borderWidth={1}
        borderRadius="md"
        p={9}
        m={4}
        w="800px" // Set width to A4 size in pixels
        h="1123px" // Set height to A4 size in pixels
        mx="auto" // Center horizontally
        overflow="auto" // Handle overflow if content is larger
      >
        {photos.map((photo, index) => (
          <Box
            key={index}
            borderWidth={1}
            borderRadius="md"
            mb={4}
            p={4}
            boxShadow="md"
          >
            {/* Header Information */}
            <Flex justify="space-between" mb={2}>
              <Box>
                <Text>NAME: {name}</Text>
                <Text>NO: {number}</Text>
              </Box>
              <Box textAlign="right">
                <Text>NO. OF SHEETS: {photos.length}</Text>
                <Text>SHEET NO: {index + 1}</Text>
              </Box>
            </Flex>

            {/* Image */}
            <Image
              src={URL.createObjectURL(photo)}
              alt={`Uploaded ${index}`}
              maxW="100%"
              maxH="1000px" // Adjust to fit content within the A4 height
              mx="auto"
              mb={4}
            />

            {/* Footer Information */}
            <Flex direction="column" align="flex-end" mt={4} mb={2}>
              {/* Static Image */}
              <Image
                src="sign.jpg" // Update with the path to your static image
                alt="Static Footer Image"
                boxSize="100px" // Adjust size as needed
                mb={2}
              />
              {/* Footer Text */}
              <Box textAlign="right">
                <Text>MOHAN RAJKUMAR DEWAN, IN/PA-25</Text>
                <Text>OF R. K. DEWAN & CO.</Text>
                <Text>APPLICANT'S PATENT ATTORNEY</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      <Button colorScheme="teal" onClick={handleDownloadPDF}>
        Download as PDF
      </Button>
    </Box>
  );
};

export default PreviewComponent;
