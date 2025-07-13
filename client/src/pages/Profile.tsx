import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import HeroImage from "../assets/images/HeroImage.jpg";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import PasswordForm from "../components/PasswordForm";

interface User {
  firstName: string;
  secondName: string;
  email: string;
  userName: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    secondName: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get("/api/user");
      setUser(res.data);
      setFormValues({
        firstName: res.data.firstName,
        secondName: res.data.secondName,
        email: res.data.email,
        userName: res.data.userName,
      });
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.patch("/api/user", formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Card sx={{ padding: 3, boxShadow: 3, width: "500px", marginTop: 10 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar
              src={user.avatar || HeroImage}
              sx={{ width: 80, height: 80, fontSize: 28 }}
            >
              {!user.avatar && `${user.firstName[0]}${user.secondName[0]}`}
            </Avatar>
            <Typography variant="h6">
              {user.firstName} {user.secondName}
            </Typography>
          </Box>

          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Second Name"
              name="secondName"
              value={formValues.secondName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="User Name"
              name="userName"
              value={formValues.userName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
            <TextField
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Stack>

          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#6633CC" }}
            fullWidth
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ marginTop: 4, width: "500px" }}>
        <Card>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <PasswordForm />
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
