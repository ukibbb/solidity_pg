"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image"

import Logo from "../../../public/logo.png"

export default function LandingPage() {
  return (
    <section>



    <h1>BetWorld is not just a betting platform It's a movement towards a more secure, fair, and enjoyable betting future. With its innovative use of blockchain technology, BetWorld is set to transform the world of betting. Join us on this exciting journey and be a part of the betting revolution. Built for pulsechain for a trustworthy and exhilarating betting experience.</h1>
    <Image 
        src={Logo} 
        alt="Bet world logo." 
        width={500}
        height={500}
    />
    </section>
  );
}
