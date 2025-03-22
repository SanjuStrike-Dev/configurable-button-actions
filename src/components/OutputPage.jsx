import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Box, Fade } from "@mui/material";
import { styled } from "@mui/system";
import Dog from "../assets/Dog.jpg";

const OutputPage = () => {
  const [config, setConfig] = useState(null);
  const [buttonSize, setButtonSize] = useState(16);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [buttonColor, setButtonColor] = useState("#1976d2");

  useEffect(() => {
    const storedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    if (storedConfig) setConfig(storedConfig);
  }, []);

  const executeActions = async () => {
    if (!config) return;
    for (let action of config.actions) {
      if (action.name === "Alert") alert("Welcome!");
      if (action.name === "Show Text") setDisplayText("Hello, World!");
      if (action.name === "Show Image") setImageURL(Dog);
      if (action.name === "Refresh Page") window.location.reload();
      if (action.name === "Set LocalStorage")
        localStorage.setItem("exampleKey", "Testing LocalStorage");
      if (action.name === "Get LocalStorage")
        setDisplayText(localStorage.getItem("exampleKey") || "No data");
      if (action.name === "Increase Button Size")
        setButtonSize((prev) => prev + 5);
      if (action.name === "Close Window") window.close();
      if (action.name === "Prompt and Show") {
        const response = prompt("Enter your name:");
        if (response) {
          setDisplayText(`Hello, ${response}`);
        } else {
          setDisplayText("");
        }
      }
      if (action.name === "Change Button Color")
        setButtonColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      if (action.name === "Disable Button") setButtonDisabled(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  if (!config)
    return (
      <Typography sx={{ textAlign: "center", mt: 10, color: "#757575" }}>
        Loading configuration...
      </Typography>
    );

  const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: "15px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    background: "#fff",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "25px",
    padding: theme.spacing(1.5, 3),
    fontWeight: "bold",
    textTransform: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <StyledCard elevation={3}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Button Workflow
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <StyledButton
            onClick={executeActions}
            disabled={buttonDisabled}
            sx={{
              fontSize: buttonSize,
              backgroundColor: buttonColor,
              color: "#fff",
            }}
            variant="contained"
          >
            {config.label}
          </StyledButton>
          <Fade in={!!displayText}>
            <Typography
              sx={{
                mt: 3,
                color: "#424242",
                fontSize: "1.2rem",
                wordWrap: "break-word",
              }}
            >
              {displayText}
            </Typography>
          </Fade>
          <Fade in={!!imageURL}>
            <Box sx={{ mt: 3 }}>
              {imageURL && (
                <img
                  src={imageURL}
                  alt="image"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}
            </Box>
          </Fade>
        </Box>
      </StyledCard>
    </Box>
  );
};

export default OutputPage;
