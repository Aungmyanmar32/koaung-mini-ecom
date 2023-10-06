import {
  Box,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Badge,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: Props) => {
  const [theme, settheme] = useState(false);
  const router = useRouter();
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
  }, [session, router]);

  const cartCount = useAppSelector((store) => store.cart.items.length);
  const hadleLogin = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ position: "fixed", top: 1, left: 0, w: "100vw" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Mini E-commerce Store
            </Typography>

            <Link href="/cart">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  m: 2,
                  bgcolor: cartCount > 0 ? "lightGrey" : "none",
                  transition: "background-color 1s ease-in-out ",
                }}
              >
                <Badge badgeContent={cartCount} color="info">
                  <LocalGroceryStoreIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 2 }}
              onClick={() => settheme(!theme)}
            >
              {!theme ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Button variant="contained" sx={{ mx: 2 }} onClick={hadleLogin}>
              {session ? "log out" : "log in"}
            </Button>
            <Button sx={{ mx: 2 }}></Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100vw", m: 3 }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
