// src/pages/auth/index.tsx

import Layout from "@/components/Layout";
import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);
  return (
    <Layout title="Log in page">
      <Box
        sx={{
          display: "flex",
          p: 0.5,
          m: 3,
          justifyContent: "center",
        }}
      >
        {/* <Typography variant="h4" sx={{ bgcolor: "lightblue" }}>
          Please Log in
        </Typography>
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            signIn();
          }}
        >
          Log in
        </Button> */}
        <img
          src="https://media.istockphoto.com/id/1299656601/vector/login-blue-realistic-3d-button-isolated-on-white-background-hand-clicked-vector-illustration.jpg?s=612x612&w=0&k=20&c=DSw2YOOTIq6NT4uQ3suOL2fdWBIAg4J_NsHqu4Lslu4="
          alt=""
        />
      </Box>
    </Layout>
  );
};

export default AuthPage;
