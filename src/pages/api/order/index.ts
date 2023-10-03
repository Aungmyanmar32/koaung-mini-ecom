// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cart } from "@/types/cartState";
import { prisma } from "@/utils/db";
import { OrderLines, Products, Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const cartItems = req.body as Cart[];

    const cartItemIds = cartItems.map((item) => item.id);

    let totalPrice = 0;

    const products = await prisma.products.findMany({
      where: {
        id: { in: cartItemIds },
      },
    });

    const getTotalPrice = (item: Cart) => {
      const product = products.find((ele) => ele.id === item.id) as Products;
      return product.price * item.quantity;
    };

    cartItems.forEach((item) => {
      const price = getTotalPrice(item);
      totalPrice += price;
    });

    const createOrder = await prisma.orders.create({
      data: { totalPrice, status: Status.ORDERED },
    });

    cartItems.forEach(async (item) => {
      const data = {
        orderId: createOrder.id,
        productId: item.id,
        quantity: item.quantity,
      };
      await prisma.orderLines.create({ data });
    });

    console.log(createOrder);
    return res.status(200).send(createOrder);
  }
  res.status(200).json({ name: "John Doe" });
}
