import { useState } from "react";
import "@fontsource/roboto/400.css";
import HeroImage from "../assets/images/HeroImage.jpg";
import {
  Card,
  CardContent,
  Stack,
  Button,
  CardActions,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Alert,
  TextField,
  CardMedia,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface User {
  firstName: string;
  secondName: string;
  userName: string;
  password: string;
  email: string;
}

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser
      );
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSignUp = () => {
    setFormError("");
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    const newUser = { firstName, secondName, userName, email, password };
    mutate(newUser);
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        flexDirection: "column",
        backgroundColor: "#8EB69B"
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CardContent>
          <Paper component="form" sx={{ padding: 2 }}>
            <Stack spacing={3}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <Stack direction="row" spacing={2}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Second Name"
                  fullWidth
                  required
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </Stack>

              <TextField
                label="Username"
                fullWidth
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
            variant="contained"
            size="large"
            onClick={handleSignUp}
            disabled={isPending}
            sx={{ backgroundColor: "#609773" }}
          >
            Sign Up
          </Button>
          <Typography>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
            </Stack>
          </Paper>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          
        </CardActions>
        
        <CardMedia component="img" image={HeroImage} alt="Blog Image" sx = {{width:"50%"}} />
      </Card>
    </Box>
  );
};

export default Signup;
