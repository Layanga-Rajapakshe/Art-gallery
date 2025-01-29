"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-5xl mx-auto z-50", 
        className
      )}
    >
      <Menu setActive={setActive}>
        {/* Home Link */}
        <MenuItem setActive={setActive} active={active} item="Home">
          <HoveredLink href="/home">Browse Art</HoveredLink>
        </MenuItem>

        {/* Categories */}
        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/paintings">Paintings</HoveredLink>
            <HoveredLink href="/sculptures">Sculptures</HoveredLink>
            <HoveredLink href="/digital-art">Digital Art</HoveredLink>
            <HoveredLink href="/photography">Photography</HoveredLink>
          </div>
        </MenuItem>

        {/* Account */}
        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/profile">Profile</HoveredLink>
            <HoveredLink href="/orders">My Orders</HoveredLink>
            <HoveredLink href="/favorites">Favorites</HoveredLink>
            <HoveredLink href="/logout">Logout</HoveredLink>
          </div>
        </MenuItem>

        {/* Featured Products */}
        <MenuItem setActive={setActive} active={active} item="Featured">
          <div className="grid grid-cols-2 gap-6 p-4 text-sm">
            <ProductItem
              title="Sunset Dreams"
              href="/products/1"
              src="/assets/art1.jpg"
              description="A stunning landscape painting to brighten any space."
            />
            <ProductItem
              title="Abstract Harmony"
              href="/products/2"
              src="/assets/art2.jpg"
              description="A bold abstract piece for the modern collector."
            />
            <ProductItem
              title="City Lights"
              href="/products/3"
              src="/assets/art3.jpg"
              description="Capture the vibrant energy of the urban nightscape."
            />
            <ProductItem
              title="Serene Reflections"
              href="/products/4"
              src="/assets/art4.jpg"
              description="A calming view perfect for mindful moments."
            />
          </div>
        </MenuItem>

      </Menu>
    </div>
  );
}
