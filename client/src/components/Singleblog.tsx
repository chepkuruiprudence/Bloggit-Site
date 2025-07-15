import {
  Box,
  Typography,
  Avatar,
  Container,
  CircularProgress,
  Alert,
  Stack,
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

const SingleBlog = () => {
  const { blogId } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<Blog, Error>({
    queryKey: ["singleBlog", blogId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`);
      return response.data;
    },
    enabled: !!blogId,
  });

  if (isLoading) {
    return (
      <Stack sx={{ p: 5 }} alignItems={"center"}>
        <CircularProgress />
        <Typography>Loading Blog...</Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 6 }}>
        Failed to load blog: {error.message}
      </Alert>
    );
  }

  if (!blog) {
    return <Typography>No blog found.</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 4, md: 8 },
        p: { xs: 2, md: 4 },
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        component="img"
        src={blog.image}
        alt="Featured Image"
        sx={{
          width: "100%",
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: 2,
          objectFit: "cover",
        }}
      />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 3, fontSize: { xs: "1.8rem", md: "2.4rem" } }}
      >
        {blog.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
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

      <Typography
        variant="body1"
        component="div"
        sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}
      >
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </Typography>
    </Container>
  );
};

export default SingleBlog;
