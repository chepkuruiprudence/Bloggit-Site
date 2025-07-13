import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  CardMedia,
  Stack,
  Button,
  Alert,
  Typography,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import axiosInstance from "../api/axios";

const Createblog = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized. Please log in again.");

            const res = await axiosInstance.post("/api/blogs", {
        title,
        synopsis,
        content,
        image: imageUrl,
      });

      return res.data;
    },
    onSuccess: () => {
      navigate("/blogs");
      setContent("");
      setFormError("");
      setImageUrl("");
      setSynopsis("");
      setTitle("");
    },
    onError: (err: any) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError(err.message || "Something went wrong");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 4,
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "500px", padding: 2, marginTop: 10 }}>
        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            height="200"
            alt="Blog Image"
          />
        )}

        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ color: "green" }}>
              New Blog Post
            </Typography>

            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <TextField
              label="Synopsis"
              multiline
              rows={6}
              variant="outlined"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
            <TextField
              label="Content"
              multiline
              rows={6}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#609773" }}
              onClick={() => mutate()}
              disabled={isPending}
            >
              {isPending ? "Publishing..." : "Publish Blog"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Createblog;
