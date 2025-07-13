import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import Blogcard from "../components/Blogcard";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  image: string;
  author: {
    firstName: string;
    secondName: string;
  };
  createdAt: string;
  avatar: string;
}

const Myblogs = () => {
  const { data, isLoading, isError, error } = useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/blogs");
      return response.data;
    },
  });
  if (isError) {
    return <Typography>There was an error</Typography>;
  }
  if (isLoading) {
    return (
      <Stack sx={{ p: 5 }} alignItems={"center"}>
        <CircularProgress />
        <Typography>Loading Tasks...</Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant="contained"
        sx={{ marginTop: 3, backgroundColor: "#609773" }}
        component={Link}
        to="/createBlog"
      >
        Create New Blog
      </Button>

      {isLoading && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography>Loading blogs...</Typography>
        </Box>
      )}

      {isError && <Alert severity="error">Failed to load blogs: {error}</Alert>}

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {data &&
          data.map((blog) => (
            <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Blogcard
                id={blog.id}
                title={blog.title}
                synopsis={blog.synopsis}
                image={blog.image}
                firstName={blog.author.firstName}
                secondName={blog.author.secondName}
                createdAt={blog.createdAt}
                avatar={blog.avatar}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Myblogs;
