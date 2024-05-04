"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  path: string;
  icon: ReactNode;
  title: string;
}
const NavLink = ({ path, title, icon }: IProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
        {
          "bg-primary font-semibold text-primary-foreground":
            pathname.includes(path),
        }
      )}
    >
      {icon}

      <span className="sr-only">{title}</span>
    </Link>
  );
};

export default NavLink;
