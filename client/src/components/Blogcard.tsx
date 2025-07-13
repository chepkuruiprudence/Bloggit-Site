import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditBlogForm from "./Editblog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface BlogCardProps {
  id: string;
  title: string;
  synopsis: string;
  image: string;
  firstName: string;
  secondName: string;
  createdAt: string;
  avatar: string;
}

const Blogcard: React.FC<BlogCardProps> = ({
  id,
  title,
  synopsis,
  image,
  firstName,
  secondName,
  createdAt,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: updateBlog } = useMutation({
    mutationFn: async (updatedBlog: {
      title: string;
      imageUrl: string;
      synopsis: string;
      content: string;
    }) => {
      const res = await axiosInstance.patch(`/api/blogs/${id}`, updatedBlog);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      setIsEditing(false);
    },
    onError: (err) => {
      console.error("Update error", err);
    },
  });

  const handleSave = (updatedBlog: {
    title: string;
    imageUrl: string;
    synopsis: string;
    content: string;
  }) => {
        updateBlog(updatedBlog); 
  };

  const { mutate: deleteBlog } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/api/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      console.error("Delete error", err);
    },
  });

  const avatarInitials = `${firstName[0]?.toUpperCase() || ""}${secondName[0]?.toUpperCase() || ""}`;

  if (isEditing) {
    return (
      <EditBlogForm
        initialTitle={title}
        initialImageUrl={image}
        initialSynopsis={synopsis}
        initialContent={""}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

 
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
     
      <CardMedia component="img" image={image} alt="Blog Image" height="200" />

      <CardContent>
       
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {synopsis}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Avatar>{avatarInitials}</Avatar>
          <Box>
            <Typography variant="body2">
              {firstName} {secondName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button
            component={Link}
            to={`/blogs/${id}`}
            variant="text"
            sx={{ color: "#6633CC", fontWeight: "bold" }}
          >
            Read More →
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#609773" }}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => deleteBlog()}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Blogcard;
