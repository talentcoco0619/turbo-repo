import { Navbar } from "@repo/ui/navbar";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "../components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOrder = async () => {
    const isOrderValid = products.every(product => {
      const orderedQuantity = quantities[product.id] ?? 0;
      return orderedQuantity <= product.quantity && orderedQuantity >= 0;
    });

    const areAllQuantitiesZero = products.every(product => {
      const orderedQuantity = quantities[product.id] ?? 0;
      return orderedQuantity === 0;
    });

    if (!isOrderValid) {
      alert("Order with correct amount."); 
      return; 
    }

    if (areAllQuantitiesZero) {
      alert("Please order at least one item."); 
      return; 
    }
    
    try {
      const response = await axios.post("http://localhost:4000/inventory/order", {
        quantities,
      });
      alert(`Order successful: ${response.data.message}`); 
      toggleModal();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again."); 

    }
  }

  const handleInputChange = (id: number, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/inventory");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="h-full">
    <Navbar>Store</Navbar>
      <main className="p-20 h-full flex items-center justify-center gap-6">
        {products.map((product, index) => (
          <Card className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0">
            <CardHeader className="text-center text-muted-foreground">
              <div className="relative w-64 h-64">
                <Image
                  src={`/${product.name.toLowerCase()}.jpg`}
                  fill
                  className="rounded-xl object-cover"
                  alt="Product"
                ></Image>
              </div>
              <p className="font-bold text-xl">{product.name}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-forground text-md">
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity} </p>
            </CardFooter>
          </Card>
        ))}
      </main>
      <div className="w-full flex items-center justify-center">
        <Button
          variant="secondary"
          size="sm"
          className="rounded-xl text-xl p-8"
          onClick={toggleModal}
        >
          Order
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <h2 className="text-lg font-bold mb-4 text-center">Order Details</h2>
          <Table className="bg-muted-foreground/20 rounded-xl cursor-pointer transition border-0 text-lg">
            <TableCaption>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl text-xl p-8"
                onClick={handleOrder}
              >
                Confirm
              </Button>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center text-muted-forground">
                  No
                </TableHead>
                <TableHead className="text-center text-muted-forground">
                  Name
                </TableHead>
                <TableHead className="text-center text-muted-forground">
                  Product
                </TableHead>
                <TableHead className="text-center text-muted-forground">
                  Price
                </TableHead>
                <TableHead className="text-center text-muted-forground">
                  Quantity
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-center text-muted-forground">
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="flex justify-center">
                    <Image
                      src={`/${product.name.toLowerCase()}.jpg`}
                      width={64}
                      height={32}
                      alt={product.name}
                      className="rounded-xl object-cover"
                    />
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="bg-primary/20 rounded text-center text-primary"
                      value={product.quantity === 0 ? NaN : quantities[product.id] ?? 0}
                      onChange={(e) =>
                        handleInputChange(product.id, Number(e.target.value))
                      }
                      disabled={product.quantity === 0}
                      placeholder={product.quantity === 0 ? 'N/A' : ''}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Modal>
      )}
    </div>
  );
}
