import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HeroImage from "../assets/images/HeroImage.jpg";
import Signup from "./Signup";

const Herosetion = () => {
  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        backgroundImage: `url(${HeroImage})`,
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        "&:hover": {
          boxShadow: "0 8px 30px rgba(20, 19, 19, 0.4)",
        },
        transition: "box-shadow 0.3s ease-in-out",

        marginTop: 4,
        overflow: "hidden",
        backgroundSize: "cover",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        onClick={Signup}
        component={Link}
        to="/login"
        sx={{ position: "relative", size: "large", fontSize: "16px" }}
      >
        Get Started
      </Button>
      <Typography variant="h4" sx={{ margin: 4 }}>
        Bring Out Your Reasoning in Writing.
      </Typography>
    </Box>
  );
};

export default Herosetion;
