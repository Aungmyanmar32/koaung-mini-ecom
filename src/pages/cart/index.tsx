import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Box,
  Button,
  Divider,
  Typography,
  listItemClasses,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { confirmOrder, updateQuantity } from "@/store/slices/cartSlice";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import SnackBars from "@/components/SnackBar";

const CartPage = () => {
  const cartItems = useAppSelector((store) => store.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const handleIncrease = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleDecrease = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity })); // 3 , 0
  };
  const onSuccess = (data: any) => {
    console.log("Success", data);
    router.push(`/confirmation?orderId=${data.id}&status=${data.status}`);
    // /confirmation?orderId=16&status=ORDERED
  };
  const onError = () => {
    console.log("Error");
  };
  const createOrder = () => {
    dispatch(confirmOrder({ payload: cartItems, onSuccess, onError }));
  };

  return (
    <Layout title="Cart Preview">
      <Box>
        {cartItems.length ? (
          <Box>
            {cartItems.map((item) => {
              return (
                <Box key={item.id}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={item.imageUrl || ""} width={100} />
                    <Box>
                      <Typography>{item.title}</Typography>
                      <Typography>{item.price}</Typography>
                    </Box>
                    <Box sx={{ mx: 7, display: "flex", alignItems: "center" }}>
                      <RemoveCircleOutlineIcon
                        sx={{ fontSize: 40, mx: 2, cursor: "pointer" }}
                        onClick={() =>
                          handleDecrease(item.id, item.quantity - 1)
                        }
                      />

                      <Typography>{item.quantity}</Typography>

                      <AddCircleOutlineIcon
                        sx={{ fontSize: 40, mx: 2, cursor: "pointer" }}
                        onClick={() =>
                          handleIncrease(item.id, item.quantity + 1)
                        }
                      />
                    </Box>
                  </Box>

                  <Divider />
                </Box>
              );
            })}
            <Box>
              <Typography variant="h4">
                Total price :{getTotalPrice()}{" "}
              </Typography>
              <Button variant="contained" onClick={createOrder}>
                Confirm Order
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h2">Empty Cart</Typography>
        )}
      </Box>
    </Layout>
  );
};

export default CartPage;
