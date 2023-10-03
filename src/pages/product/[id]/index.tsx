import Layout from "@/components/Layout";
import SnackBar from "@/components/SnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slices/cartSlice";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";

import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import ShortUniqueId from "short-unique-id";

const ProductPreview = () => {
  const products = useAppSelector((store) => store.products.items);
  const router = useRouter();
  const productId = Number(router.query.id);
  const [sanckOpen, setSnackOpen] = useState<boolean>(false);

  const currentProduct = products.find((item) => item.id === productId);
  const imgSrc = currentProduct?.imageUrl as string;
  const suid = new ShortUniqueId();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...currentProduct, quantity: 1 }));
    setSnackOpen(true);
    setTimeout(() => router.push("/"), 700);
  };

  if (!currentProduct) return null;
  return (
    <Layout title="Product Detail">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            "&:hover img": {
              transform: "scale(1.1) rotate(-2deg)",
              color: "blue",
              marginTop: 1,
            },
          }}
        >
          <>
            <Typography variant="h6" align="center">
              code : {suid.rnd()}
            </Typography>
            <img src={imgSrc} alt="" width={200} />
            <Typography variant="h4" align="center">
              {currentProduct.price} $
            </Typography>
          </>
        </Box>
        <Box>
          <Paper
            elevation={3}
            sx={{ maxWidth: 800, m: 3, p: 3, textAlign: "center" }}
          >
            <Typography variant="h5" sx={{ bgcolor: "primary", p: 3 }}>
              {currentProduct.title}
            </Typography>
            <Divider sx={{ bgcolor: "blue", m: 2 }} />

            <Typography align="left">{currentProduct.description}</Typography>
          </Paper>
          <Button
            variant="contained"
            sx={{ maxHeight: 100 }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
      <SnackBar msg="Item added." open={sanckOpen} setOpen={setSnackOpen} />
    </Layout>
  );
};

export default ProductPreview;
