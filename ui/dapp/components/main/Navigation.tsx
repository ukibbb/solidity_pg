"use client";
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
import { ModeToggle } from "../mode-toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Navigation({ children }) {
  return (
    <>
      <header className="border border-solid border-white flex justify-between h-12">
        <ModeToggle />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink>In play</NavigationMenuLink>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuLink>Upcoming</NavigationMenuLink>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuLink>Ended</NavigationMenuLink>
          </NavigationMenuList>
          <NavigationMenuList>
            <Link href="/contract">Contract Info</Link>
          </NavigationMenuList>
        </NavigationMenu>
        <ConnectButton />
      </header>
      <section className="flex">
        <aside className="w-64 min-h-screen border border-solid border-white">
          Available on the platform:
          <Link className="block px-4 py-2 " href="/soccer">
            Soccer
          </Link>
          <Link className="block px-4 py-2" href="/boxing">
            Boxing
          </Link>
          <Link className="block px-4 py-2" href="/cs2">
            CS 2
          </Link>
        </aside>
        {children}
      </section>
    </>
  );
}
