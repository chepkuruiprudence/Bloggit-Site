import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Card,
  CardContent,
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
    id: string;
  };
  createdAt: string;
  avatar: string;
  authorId: string;
}

const Myblogs = () => {
  const { data, isLoading, isError, error } = useQuery<Blog[], Error>({
    queryKey: ["myblogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/user/blogs");
      return response.data;
    },
  });

  if (isError) {
    return (
      <Stack sx={{ p: 5 }} alignItems="center">
        <Alert severity="error">Failed to load blogs: {error.message}</Alert>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Stack sx={{ p: 5 }} alignItems="center">
        <CircularProgress />
        <Typography>Loading Blogs...</Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ paddingTop: "80px", paddingX: 2 }}>
      <Grid container spacing={3}>
        {data &&
          data.map((blog) => (
            <Grid key={blog.id} size = {{xs:12, sm:6, md:4}}>
              <Blogcard
                id={blog.id}
                title={blog.title}
                synopsis={blog.synopsis}
                image={blog.image}
                firstName={blog.author.firstName}
                secondName={blog.author.secondName}
                createdAt={blog.createdAt}
                avatar={blog.avatar}
                authorId={blog.author.id}
              />
            </Grid>
          ))}
      </Grid>

      {data?.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          You haven't created any blogs yet.
        </Typography>
      )}

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "100%", maxWidth: 500, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Ready to write something new?
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#609773" }}
              fullWidth
              component={Link}
              to="/createBlog"
            >
              Create New Blog
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Myblogs;
