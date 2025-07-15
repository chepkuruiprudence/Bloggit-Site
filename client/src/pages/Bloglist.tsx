import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import Blogcard from "../components/Blogcard";
import { Box, CircularProgress, Alert } from "@mui/material";

const Bloglist = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/blogs");
            return res.data;
    },
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load blogs.</Alert>;

  return (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
      justifyContent: "center",
      paddingTop: "80px",
      mt: 4,
    }}
  >
    {data.map((blog: any) => (
      <Blogcard
        key={blog.id}
        id={blog.id}
        title={blog.title}
        synopsis={blog.synopsis}
        image={blog.image}
        createdAt={blog.createdAt}
        firstName={blog.author?.firstName || "Anonymous"}
        secondName={blog.author?.secondName || ""}
        avatar={`${blog.avatar || ""}`}
        authorId = {blog.authorId}
      />
    ))}
  </Box>
);

};

export default Bloglist;
