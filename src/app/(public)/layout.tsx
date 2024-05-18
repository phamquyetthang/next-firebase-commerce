import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Boxes, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative container">
      <div className="flex gap-8 py-4 justify-between">
        <div className="flex gap-8">
          <Image src="/next.svg" width={180} height={37} alt="logo" />

          <Input placeholder="Search product ..." className="w-72" />
        </div>

        <div className="flex gap-8">
          <Button>
            <User />
            Account
          </Button>
          <Button>
            <ShoppingCart />
            Cart
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[200px_1fr]">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="font-semibold text-lg">Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-col">
                <div className="flex gap-1">
                  <Boxes className="w-5 h-5" />
                  <span>Nhà Cửa - Đời Sống</span>
                </div>
                <div className="flex gap-1">
                  <Boxes className="w-5 h-5" />
                  <span>Nhà Cửa - Đời Sống</span>
                </div>
                <div className="flex gap-1">
                  <Boxes className="w-5 h-5" />
                  <span>Nhà Cửa - Đời Sống</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
