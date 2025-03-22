import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Card,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";

const actionsList = [
  "Alert",
  "Show Text",
  "Show Image",
  "Refresh Page",
  "Set LocalStorage",
  "Get LocalStorage",
  "Increase Button Size",
  "Close Window",
  "Prompt and Show",
  "Change Button Color",
  "Disable Button",
];

const ConfigPage = () => {
  const [label, setLabel] = useState("Click Me!");
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [editingActionId, setEditingActionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    if (storedConfig) {
      setLabel(storedConfig.label);
      setActions(storedConfig.actions);
    }
  }, []);

  const addAction = (action) => {
    if (action) {
      setActions([...actions, { id: uuidv4(), name: action }]);
      setSelectedAction("");
    }
  };

  const removeAction = (id) => {
    setActions(actions.filter((action) => action.id !== id));
  };

  const startEditing = (id) => {
    setEditingActionId(id);
  };

  const saveEdit = (id, newAction) => {
    if (newAction) {
      setActions(
        actions.map((action) =>
          action.id === id ? { ...action, name: newAction } : action
        )
      );
    }
    setEditingActionId(null);
  };

  const cancelEdit = () => {
    setEditingActionId(null);
  };

  const saveConfig = () => {
    localStorage.setItem("buttonConfig", JSON.stringify({ label, actions }));
    alert("Configuration Saved!");
    navigate("/output");
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: "15px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    background: "#fff",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "25px",
    padding: theme.spacing(1.5),
    fontWeight: "bold",
    textTransform: "none",
    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
    "&:hover": {
      background: "linear-gradient(45deg, #1565c0, #2196f3)",
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
          Configure Your Button
        </Typography>
        <TextField
          label="Button Label"
          variant="outlined"
          fullWidth
          margin="normal"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              background: "#f9f9f9",
            },
          }}
        />
        <Select
          fullWidth
          value={selectedAction}
          onChange={(e) => {
            setSelectedAction(e.target.value);
            addAction(e.target.value);
          }}
          displayEmpty
          sx={{
            mt: 2,
            borderRadius: "6px",
            background: "#f9f9f9",
            "& .MuiSelect-select": {
              color: selectedAction === "" ? "#757575" : "inherit",
            },
          }}
        >
          <MenuItem
            value=""
            disabled
            sx={{ color: "#757575", fontStyle: "italic" }}
          >
            Select Action
          </MenuItem>
          {actionsList.map((action) => (
            <MenuItem key={action} value={action}>
              {action}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#424242" }}>
          Action Sequence
        </Typography>
        <Divider />
        <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {actions.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#757575", py: 2 }}>
              No actions added yet.
            </Typography>
          ) : (
            actions.map((action) => (
              <ListItem
                key={action.id}
                sx={{
                  borderRadius: "8px",
                  mb: 1,
                  background: "#fafafa",
                  "&:hover": { background: "#f0f0f0" },
                }}
              >
                {editingActionId === action.id ? (
                  <Select
                    fullWidth
                    value={action.name}
                    onChange={(e) => saveEdit(action.id, e.target.value)}
                    sx={{
                      borderRadius: "10px",
                      background: "#f9f9f9",
                    }}
                  >
                    {actionsList.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <ListItemText
                    primary={action.name}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                )}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    edge="end"
                    color={
                      editingActionId === action.id ? "default" : "primary"
                    }
                    onClick={() =>
                      editingActionId === action.id
                        ? cancelEdit()
                        : startEditing(action.id)
                    }
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => removeAction(action.id)}
                    disabled={editingActionId === action.id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>
        <StyledButton
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={saveConfig}
        >
          Save Configuration
        </StyledButton>
      </StyledCard>
    </Box>
  );
};

export default ConfigPage;
