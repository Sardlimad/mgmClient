import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { useAuth } from "../helpers/AuthProvider";

export const CDrawer = ({ open, toggleDrawer }) => {
  const { authData } = useAuth();
  const theme = useTheme();

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          borderRadius: "0 20px 20px 0",
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          textAlign: "center",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <AccountCircleIcon
          sx={{
            width: 90,
            height: 90,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.dark,
            mb: 1,
          }}
        >
          {authData.username}
        </Typography>
        <Divider sx={{ width: "80%", my: 2 }} />
        <Typography
          sx={{
            fontWeight: "bold",
            color: theme.palette.text.secondary,
            mb: 1,
          }}
        >
          Menú Principal
        </Typography>
        <List sx={{ width: "100%" }}>
          <ListItemButton
            href="/"
            sx={{
              px: 3,
              py: 1.5,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText
              primary="Inicio"
              primaryTypographyProps={{
                fontWeight: "medium",
              }}
            />
          </ListItemButton>
          <ListItemButton
            href="/client"
            sx={{
              px: 3,
              py: 1.5,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText
              primary="Consulta Cliente"
              primaryTypographyProps={{
                fontWeight: "medium",
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};
