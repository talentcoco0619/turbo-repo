import { Navbar } from "@repo/ui/navbar";
import Link from "next/link";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "../components/ui/card";

export default function Dashboard() {
  return (
    <div className="h-full">
      <Navbar>Store Dashboard</Navbar>
      <main className="p-20 h-full flex items-center justify-center">
        <Card className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0">
          <Link href="/products">
            <CardHeader className="text-center text-muted-foreground">
              <div className="relative w-64 h-64">
                <Image
                  src="/product.jpg"
                  fill
                  className="rounded-xl object-cover"
                  alt="Product"
                ></Image>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-center text-xs text-muted-forground text-2xl">
              <p>Manage Products</p>
            </CardFooter>
          </Link>
        </Card>
      </main>
    </div>
  );
}
