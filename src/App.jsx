import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, CssBaseline, Box } from "@mui/material";
import ConfigPage from "./components/ConfigPage";
import OutputPage from "./components/OutputPage";

const App = () => (
  <Router>
    <CssBaseline />
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e3f2fd, #bbdefb)",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          background: "linear-gradient(45deg, #1976d2, #42a5f5)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Button color="inherit" component={Link} to="/config" sx={{ mr: 2 }}>
            Configure
          </Button>
          <Button color="inherit" component={Link} to="/output">
            Output
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: "64px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/" element={<ConfigPage />} />
        </Routes>
      </Box>
    </Box>
  </Router>
);

export default App;
