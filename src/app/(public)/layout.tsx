import SearchBar from "@/components/common/search";
import Image from "next/image";
import Link from "next/link";
import AccountButton from "./account-button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/option";
import CartSlider from "./cart-slider";
import { auth } from "@/utils/firebase";
import { getMyCart } from "@/features/cart/model";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const myCart = session?.user.id ? await getMyCart(session?.user.id) : null;

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
          <AccountButton email={session?.user.email || ""} />

          <CartSlider id={myCart?.id || ""} products={myCart?.products || []} />
        </div>
      </div>
      {children}
    </div>
  );
}
