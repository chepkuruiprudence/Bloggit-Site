import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  CardMedia,
  Stack,
  Button,
} from "@mui/material";

interface EditBlogFormProps {
  initialTitle: string;
  initialImageUrl: string;
  initialSynopsis: string;
  initialContent: string;
  onSave: (updatedBlog: {
    title: string;
    imageUrl: string;
    synopsis: string;
    content: string;
  }) => void;
  onCancel: () => void;
}

const EditBlogForm = ({
  initialTitle,
  initialImageUrl,
  initialSynopsis,
  initialContent,
  onSave,
  onCancel,
}: EditBlogFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [synopsis, setSynopsis] = useState(initialSynopsis);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave({ title, imageUrl, synopsis, content });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 4,
        paddingX: { xs: 2, sm: 4 },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 2,
          boxShadow: 3,
        }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt="Blog Cover"
            sx={{
              height: { xs: 180, sm: 220, md: 250 },
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              mb: 2,
            }}
          />
        )}
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Synopsis"
              multiline
              rows={3}
              variant="outlined"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              fullWidth
            />
            <TextField
              label="Content"
              multiline
              rows={6}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditBlogForm;
