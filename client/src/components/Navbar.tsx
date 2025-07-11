import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        boxShadow: 3,
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
          sx={{ flexGrow: 1, fontSize: "16px" }}
        >
          Bloggit
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "centre",
            justifyContent: "centre",
          }}
          flexGrow={1}
        >
          <Button
            sx={{ color: "white", fontSize: "16px" }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            sx={{ color: "white", fontSize: "16px" }}
            component={Link}
            to="/Login"
          >
            Login
          </Button>
          <Button
            sx={{ color: "white", fontSize: "16px" }}
            component={Link}
            to="/Signup"
          >
            SignUp
          </Button>
        </Stack>
        <IconButton
          size="large"
          edge="end"
          aria-label="logo"
          sx={{
            display: { xs: "none", sm: "block", md: "flex", color: "inherit" },
          }}
        >
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
