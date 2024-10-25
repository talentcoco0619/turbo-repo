import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.post("/inventory/update", async (req, res) => {
  const { productId, updated_quantity, updated_price } = req.body;
  console.log(updated_quantity);

  try {
    await prisma.product.update({
      where: { id: productId },
      data: { quantity: updated_quantity, price: updated_price },
    });

    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update inventory" });
  }
});

app.post("/inventory/order", async (req, res) => {
  const quantities = req.body.quantities;
  console.log(quantities);

  try {
    for (const productId in quantities) {
      const sold_quantity = quantities[productId];
      console.log(sold_quantity);

      // Fetch the current product to get the existing quantity
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (product) {
        const newQuantity = product.quantity - sold_quantity;

        // Update the product's quantity in the database
        await prisma.product.update({
          where: { id: productId },
          data: { quantity: newQuantity },
        });
      }
    }

    res
      .status(200)
      .json({ message: "Order processed and inventory updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process order and update inventory" });
  }
});

app.get("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
});

app.get("/inventory", async (req, res) => {
  const product = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
  res.status(200).json(product);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
