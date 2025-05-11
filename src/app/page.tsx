import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          OSS ライブラリ情報検索
        </Typography>
        <TextField
          id="outlined-basic"
          label="ライブラリ名を入力"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        />
      </Box>
    </Container>
  );
}
