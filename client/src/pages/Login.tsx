import { useState } from "react";
import "@fontsource/roboto/400.css";
import {
  Card,
  Box,
  CardContent,
  CardActions,
  TextField,
  Stack,
  Typography,
  Alert
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from "react-router-dom";
import useUser from "../store/userStore"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";

interface signInDetails{
  userHandle: string,
  password: string
}


const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [userHandle, setUserHandle] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")

  const {isPending, mutate } =useMutation({mutationKey: ["login_user"], mutationFn: async (loginDetails: signInDetails) => {
    const response = await axiosInstance.post("/api/auth/login", loginDetails)
    console.log(response.data);
    return response.data;
  },
onError: (err) => {
  if (axios.isAxiosError(err)){
    setFormError(err.response?.data.message)
  } else {
    setFormError("Something went wrong")
  }
},
onSuccess: (data) => {
  setUser(data);
  navigate ("/blogs")
}})

  function handleSignIn() {
    setFormError("")
    mutate({userHandle, password})
  }
    return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "400px", padding: 3, backgroundColor: "green" }}>
        <CardContent>
          <Stack spacing={3}>
            {formError && <Alert severity = "error"></Alert> }
            <TextField
              label="userName or Email"
              variant="outlined"
              fullWidth
              required
              value={userHandle}
              onChange={(e) => setUserHandle(e.target.value)}
              sx={{ backgroundColor: "white" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: "white" }}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          < LoadingButton variant="contained" size="large" onClick={handleSignIn} loading = {isPending}>
            Sign In
          </ LoadingButton>
          <Typography>Forgot password</Typography>
        </CardActions>
        <Typography>
          Don't have an account?<Link to="/Signup">Sign Up</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
