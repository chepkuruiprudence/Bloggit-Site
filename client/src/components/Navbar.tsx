import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = user
    ? [
        { label: "Home", to: "/" },
        { label: "My Blogs", to: "/MyBlogs" },
        { label: "Create Blog", to: "/Createblog" },
        { label: "Blogs", to: "/blogs" },
        { label: "Profile", to: "/profile" },
        { label: "Logout", onClick: handleLogout },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Blogs", to: "/blogs" },
        { label: "SignUp", to: "/signup" },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white" }}>
        Bloggit
      </Typography>
      <List>
        {navLinks.map((item, index) => (
          <ListItem
            key={index}
            component={item.to ? Link : "button"}
            to={item.to}
            onClick={item.onClick}
            sx={{ color: "white" }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 3,
        backgroundColor: "#0C3B2E",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, color: "white", display: { md: "none" } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: "16px", color: "white" }}
        >
          Bloggit
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            ml: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {navLinks.map((item, index) =>
            item.to ? (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontSize: "16px",
                  "&:hover": { borderColor: "#fff" },
                }}
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontSize: "16px",
                  "&:hover": { borderColor: "#fff" },
                }}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            )
          )}
        </Box>

        {user && (
          <Avatar
            sx={{ ml: 1, display: { xs: "none", md: "flex" } }}
            component={Link}
            to="/profile"
          >
            {user.firstName?.[0]?.toUpperCase() || ""}
            {user.secondName?.[0]?.toUpperCase() || ""}
          </Avatar>
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { backgroundColor: "#0C3B2E", color: "white", width: 220 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
