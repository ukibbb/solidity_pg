"use client";
import Web3Modal from "web3modal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import upcoming from "../../library/data/upcoming.json";
import inplay from "../../library/data/inplay.json";

import { usePathname } from "next/navigation";

export default function Dapp() {
  const pathName = usePathname();

  console.log(upcoming);
  console.log(inplay);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            className="link active"
            href="dapp/sports"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink>Sports</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
