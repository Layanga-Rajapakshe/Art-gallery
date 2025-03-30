"use client";
import React, { useState, useEffect } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
    };
    
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Get access token for authorization header
      const accessToken = localStorage.getItem('accessToken');
      
      // Get CSRF token from cookie if it exists
      const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

      // Make logout request to server
      const response = await fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization header if token exists
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
          // Include CSRF token if available
          ...(csrfToken && { 'X-CSRFToken': csrfToken }),
        },
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error(`Logout failed: ${response.status} ${response.statusText}`);
        // Try to get more error details if available
        try {
          const errorData = await response.json();
          console.error('Error details:', errorData);
        } catch (e) {
          // If response can't be parsed as JSON, ignore
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear auth data and redirect regardless of server response
      clearAuthData();
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  // Helper function to clear all authentication data
  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    
    // Clear cookies - this works for same-domain cookies but may not work for HttpOnly cookies
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

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
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/">Home</HoveredLink>
            <HoveredLink to="/browse">Browse Art</HoveredLink>
          </div>
        </MenuItem>

        {/* Categories */}
        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/paintings">Paintings</HoveredLink>
            <HoveredLink to="/sculptures">Sculptures</HoveredLink>
            <HoveredLink to="/digital-art">Digital Art</HoveredLink>
            <HoveredLink to="/photography">Photography</HoveredLink>
          </div>
        </MenuItem>

        {/* Account - Show different options based on login status */}
        <MenuItem setActive={setActive} active={active} item="Account">
          <div className="flex flex-col space-y-4 text-sm">
            {isLoggedIn ? (
              <>
                <HoveredLink to="/profile">Profile</HoveredLink>
                <HoveredLink to="/cart">My Cart</HoveredLink>
                <HoveredLink to="/orders">My Orders</HoveredLink>
                <HoveredLink to="/favorites">Favorites</HoveredLink>
                <div 
                  onClick={handleLogout} 
                  className="cursor-pointer text-sm py-1 px-2 hover:text-blue-500 transition-colors"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <HoveredLink to="/login">Login</HoveredLink>
                <HoveredLink to="/signup">Sign Up</HoveredLink>
              </>
            )}
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

export default Navbar;