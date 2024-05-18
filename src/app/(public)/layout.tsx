import SearchBar from "@/components/common/search";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative container">
      <div className="flex gap-8 py-4 justify-between">
        <div className="flex gap-24">
          <Link href="/">
            <Image src="/next.svg" width={180} height={37} alt="logo" />
          </Link>
          <div className="w-72">
            <SearchBar />
          </div>
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
      {children}
    </div>
  );
}
