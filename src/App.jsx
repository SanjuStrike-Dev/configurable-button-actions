import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, CssBaseline, Box } from "@mui/material";
import ConfigPage from "./components/ConfigPage";
import OutputPage from "./components/OutputPage";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #e1f5fe, #b3e5fc)",
        }}
      >
        <Navigation />
        <Box sx={{ pt: "70px", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
          <Routes>
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/output" element={<OutputPage />} />
            <Route path="/" element={<ConfigPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        background: "linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/config"
          sx={{
            mr: 2,
            padding: "8px 16px",
            background: location.pathname === "/config" ? "#64b5f6" : "transparent",
            borderRadius: "8px",
            fontWeight: location.pathname === "/config" ? "bold" : "normal",
            boxShadow: location.pathname === "/config" ? "0 0 8px rgba(100, 181, 246, 0.7)" : "none",
            "&:hover": {
              background: "#90caf9",
            },
          }}
        >
          Configure
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/output"
          sx={{
            padding: "8px 16px",
            background: location.pathname === "/output" ? "#64b5f6" : "transparent",
            borderRadius: "8px",
            fontWeight: location.pathname === "/output" ? "bold" : "normal",
            boxShadow: location.pathname === "/output" ? "0 0 8px rgba(100, 181, 246, 0.7)" : "none",
            "&:hover": {
              background: "#90caf9",
            },
          }}
        >
          Output
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default App;
