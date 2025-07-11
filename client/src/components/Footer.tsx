import { Box, Container, Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000033",
        color: "white",
        padding: 4,
        marginTop: 4,
      }}
    >
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>
            Let’s keep the conversation going. Connect with us!
          </Typography>
          <Typography
            variant="body2"
            color="white"
            align="center"
            sx={{ padding: 2 }}
          >
            Follow us on social media for the latest updates.
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <InstagramIcon sx={{ marginLeft: 1, color: "white" }} />
            <FacebookIcon sx={{ marginLeft: 1, color: "white" }} />
            <XIcon sx={{ marginLeft: 1, color: "white" }} />
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ padding: 2, color: "white" }}
          >
            &copy;created by Prudence
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
