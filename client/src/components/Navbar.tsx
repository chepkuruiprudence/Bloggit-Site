import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); 
    navigate("/"); 
  };

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
          sx={{ mr: 2, color: "white", fontSize: "16px" }}
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
            display: "flex",
            gap: 4,
            ml: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user ? (
            <>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/MyBlogs"
              >
                My Blogs
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/Createblog"
              >
                Create Blog
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/blogs"
              >
                Blogs
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/profile"
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#C62828",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/blogs"
              >
                Blogs
              </Button>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#609773",
                }}
                component={Link}
                to="/signup"
              >
                SignUp
              </Button>
            </>
          )}
        </Box>

        {user && (
          <Avatar sx={{ ml: 1 }} component={Link} to="/profile">
            {user.firstName?.[0]?.toUpperCase() || ""}
            {user.secondName?.[0]?.toUpperCase() || ""}
          </Avatar>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
