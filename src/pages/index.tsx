import ProductCard from "@/components/Card";
import Layout from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchData } from "@/store/slices/productSlice";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const HomePage = () => {
  // const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   // if (!session) {
  //   //   router.push("/auth");
  //   // }
  // }, [session]);
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.products.items);
  const cardItems = useAppSelector((store) => store.cart.items);
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Layout title="Home Page">
      <Box sx={{ width: "100vw" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <Box key={product.id} sx={{ mr: 5, mb: 3 }}>
              <ProductCard
                title={product.title}
                description={product.description}
                imageUrl={product.imageUrl}
                href={`product/${product.id}`}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
