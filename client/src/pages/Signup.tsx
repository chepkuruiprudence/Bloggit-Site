import { useState } from "react";
import "@fontsource/roboto/400.css";
import {
  Card,
  CardContent,
  Stack,
  Button,
  CardActions,
  Box,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: String;
  secondName: String;
  userName: String;
  password: String;
  email: String;
}

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const Navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser,
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
      Navigate("/login");
    },
  });

  function handleSignUp() {
    setFormError("");
    if (password != confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    const newUser = { firstName, secondName, userName, email, password };
        mutate(newUser);
  }
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        flexDirection: "column",
        border: "5px solid red",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          padding: 2,
          border: "5px solid blue",
        }}
      >
        <CardContent>
          <Paper component="form" sx={{ padding: 2 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                {formError && <Alert severity="error">{formError}</Alert>}
                <TextField
                  label="First Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Second Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </Stack>
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Stack>
          </Paper>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSignUp}
            loading={isPending}
            sx={{ backgroundColor: "#609773" }}
          >
            Sign Up
          </Button>
        </CardActions>
        <Typography>
          Already have an account?<Link to="/Login">Login</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
