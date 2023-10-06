import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "DELETE") {
    const orderId = req.query.id;

    const isValid = Number(orderId);
    console.log(orderId);

    if (!isValid) return res.status(400).send("bad request");

    const foundedId = await prisma.orders.findFirst({
      where: { id: Number(orderId) },
    });
    if (!foundedId) return res.status(400).send("bad request");

    await prisma.orderLines.deleteMany({
      where: {
        orderId: Number(orderId),
      },
    });

    await prisma.orders.delete({
      where: {
        id: Number(orderId),
      },
    });
    return res.status(200).send("Deleted");
  }
  res.status(500);
}
