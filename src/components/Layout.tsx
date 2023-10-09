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
import Script from "next/script";

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

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth");
  //   }
  // }, [session]);

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
        <Script id="44938">
          {` !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){if(window.analytics.initialized)return window.analytics[e].apply(window.analytics,arguments);var i=Array.prototype.slice.call(arguments);i.unshift(e);analytics.push(i);return analytics}};for(var i=0;i<analytics.methods.length;i++){var key=analytics.methods[i];analytics[key]=analytics.factory(key)}analytics.load=function(key,i){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=i};analytics._writeKey="jRAcp6AoUeCLSqLTKlU9Ht5KQXPQz1K5";;analytics.SNIPPET_VERSION="4.16.1";
            analytics.load("jRAcp6AoUeCLSqLTKlU9Ht5KQXPQz1K5");
            analytics.page();
            }}();`}
        </Script>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
