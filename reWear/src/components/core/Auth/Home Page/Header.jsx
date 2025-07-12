import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../../Ui/Button";
import { Badge } from "../../../../Ui/Badge";
import { Search, Plus, User, Coins } from "lucide-react";
import UserDropdown from "../common/UserDropdown"; // adjust path as needed

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-2xl font-bold text-green-500 text-foreground">
            Re<span className="text-black">Wear</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search clothing items..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-sage focus:outline-none transition-smooth"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {/* Points */}
          <div className="hidden sm:flex items-center space-x-2 bg-sage-light/20 px-3 py-2 rounded-lg">
            <Coins className="h-4 w-4 text-green-500" />
            <span className="font-semibold text-green-500">847</span>
            <span className="text-sm text-muted-foreground">pts</span>
          </div>

          {/* Add Item */}
          <Button size="sm" className="bg-green-500 hover:bg-green-400 transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>

          {/* Profile / Dropdown Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Dropdown Menu */}
          {dropdownOpen && <UserDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
