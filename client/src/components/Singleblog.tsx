import {
  Box,
  Typography,
  Avatar,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

interface Blog {
  id: string;
  title: string;
  image: string;
  content: string;
  createdAt: string;
  avatar: string;
  author: {
    firstName: string;
    secondName: string;
  };
}

const fetchSingleBlog = async (blogId: string): Promise<Blog> => {
  const response = await axiosInstance.get(`/api/blogs/${blogId}`);
  return response.data;
};

const SingleBlog = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<Blog, Error>({
    queryKey: ["singleBlog", blogId],
    queryFn: () => fetchSingleBlog(blogId!),
    enabled: !!blogId, 
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 6,
          border: "5px solid red",
          marginTop: 10,
        }}
      >
        <CircularProgress />
        <Typography>Loading blog...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 6 }}>
        Failed to load blog: {error.message}
      </Alert>
    );
  }

  if (!blog) return null;

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 6, border: "5px solid red", marginTop: 10, width: "500px" }}
    >
      <Box
        component="img"
        src={blog.image}
        alt="Featured Image"
        sx={{ width: "100%", height: 400, borderRadius: 3, objectFit: "cover" }}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {blog.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Avatar src={blog.avatar}>
          {blog.author.firstName[0]}
          {blog.author.secondName[0]}
        </Avatar>
        <Typography variant="body1">
          {blog.author.firstName} {blog.author.secondName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: "auto" }}
        >
          {new Date(blog.createdAt).toDateString()}
        </Typography>
      </Box>

      <Typography variant="body1" component="div">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </Typography>
    </Container>
  );
};

export default SingleBlog;
