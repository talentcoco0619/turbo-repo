import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/inventory");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedProduct(products[index]);
  };

  const handleSaveClick = async () => {
    if (editedProduct !== null) {
      try {
        if (editedProduct.price <= 0 || editedProduct.quantity < 0) {
          alert("Set the price or amount correctly.");
          return;
        }

        await axios.post("http://localhost:4000/inventory/update", {
          productId: editedProduct.id,
          updated_quantity: editedProduct.quantity,
          updated_price: editedProduct.price,
        });

        const updatedProducts = [...products];
        updatedProducts[editIndex!] = editedProduct;
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to update product:", error);
      } finally {
        setEditIndex(null);
        setEditedProduct(null);
      }
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditedProduct(null);
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (editedProduct !== null) {
      setEditedProduct({ ...editedProduct, [field]: value });
    }
  };

  return (
    <div className="p-20 h-full flex items-center justify-center">
      <Table className="bg-primary/10 rounded-xl cursor-pointer transition border-0 text-lg">
        <TableCaption>A list of recent inventories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Product</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Update</TableHead>
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
              <TableCell>
                {editIndex === index ? (
                  <input
                    type="number"
                    className="bg-primary/20 rounded text-center text-primary"
                    value={editedProduct?.price || ""}
                    onChange={(e) =>
                      handleInputChange("price", Number(e.target.value))
                    }
                  />
                ) : (
                  "$" + product.price
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <input
                    type="number"
                    className="bg-primary/20 rounded text-center text-primary"
                    value={editedProduct?.quantity || ""}
                    onChange={(e) =>
                      handleInputChange("quantity", Number(e.target.value))
                    }
                  />
                ) : (
                  product.quantity
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <div className="flex justify-between">
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsPage;
