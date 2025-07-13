import { useState } from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formError, setFormError] = useState("");

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
    <Stack spacing={2}>
      {formError && <Alert severity="error">{formError}</Alert>}
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#6633CC" }}
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </Stack>
  );
};

export default PasswordForm;
