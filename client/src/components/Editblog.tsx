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
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "500px", padding: 2 }}>
        {imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt="Blog Cover"
            sx={{ borderRadius: "8px" }}
          />
        )}
        <CardContent>
          <Stack spacing={2}>
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
              rows={4}
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

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
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
