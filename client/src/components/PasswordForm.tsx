import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
  Stack,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formError, setFormError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.patch("/api/user/password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      return res.data;
    },
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFormError("");
      alert("Password updated successfully!");
    },
    onError: (err: any) => {
      setFormError(err.response?.data.message || "Failed to update password");
    },
  });

  return (
    <Stack spacing={3}>
      {formError && <Alert severity="error">{formError}</Alert>}

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Current Password</InputLabel>
        <OutlinedInput
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          label="Current Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                edge="end"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth required>
        <InputLabel>New Password</InputLabel>
        <OutlinedInput
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          label="New Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowNewPassword((prev) => !prev)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth required>
        <InputLabel>Confirm New Password</InputLabel>
        <OutlinedInput
          type={showConfirmPassword ? "text" : "password"}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          label="Confirm New Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#6633CC" }}
        onClick={() => mutate()}
        disabled={
          isPending ||
          !currentPassword ||
          !newPassword ||
          !confirmNewPassword ||
          newPassword !== confirmNewPassword
        }
      >
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </Stack>
  );
};

export default PasswordForm;
