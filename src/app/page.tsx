"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { getOssUsedByCompanies } from "./actions";

interface SearchResult {
  text: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const actionResult = await getOssUsedByCompanies(inputValue);
    setResult({ text: actionResult });
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2, // 要素間のスペース
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          OSS ライブラリ利用企業検索
        </Typography>
        <TextField
          id="library-name-input"
          label="ライブラリ名を入力"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !inputValue.trim()}
          sx={{ alignSelf: "stretch" }}
        >
          {loading ? <CircularProgress size={24} /> : "検索"}
        </Button>

        {result && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <>
              <Typography variant="h6" gutterBottom>
                利用企業リスト:
              </Typography>
              {result.text}
            </>
            )
          </Box>
        )}
      </Box>
    </Container>
  );
}
