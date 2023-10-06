import { useAppDispatch } from "@/store/hook";
import { cancelOrder } from "@/store/slices/cartSlice";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ConfirmationPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status } = router.query;
  const orderId = router.query.orderId as string;
  const onSuccess = () => {
    console.log("Success");
    setOpen(true);
    router.push("/");
  };
  const onError = () => {
    console.log("Error");
  };
  const handelCancelOrder = () => {
    dispatch(cancelOrder({ orderId, onSuccess, onError }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">Order ID :{orderId}</Typography>
      <Typography variant="h4">Status : {status}</Typography>
      <Button variant="contained" onClick={handelCancelOrder}>
        Cancel Order
      </Button>
      <Snackbar
        message="Order cancelled...."
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default ConfirmationPage;
