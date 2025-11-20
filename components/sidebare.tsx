"use client";

import { useState, useEffect, JSX } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  Book,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface INavItem {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

interface ISidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ className, isOpen, setIsOpen }: ISidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const navigationItems: INavItem[] = [
    { id: 1, name: "Dashboard", icon: <Home />, path: "/dashboard" },
    { id: 2, name: "Profile", icon: <Users />, path: "/dashboard/profile" },
    { id: 3, name: "Resources", icon: <Users />, path: "dashboard/resources" },
    { id: 4, name: "Settings", icon: <Settings />, path: "dashboard/settings" },
    { id: 5, name: "Help", icon: <HelpCircle />, path: "dashboard/help" },
  ];

  const [activeItem, setActiveItem] = useState<number>(navigationItems[0].id);

  const handleItemClick = (id: number) => {
    setActiveItem(id);
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        aria-label="Toggle Menu"
        className="md:hidden fixed top-16 left-4 z-50 p-2 bg-background dark:bg-gray-800 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full bg-background dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out z-40 ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:w-20 md:translate-x-0"
        } ${className}`}
      >
        <div className="flex flex-col h-full">

          {/* Collapse toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex absolute -right-3 top-20 dark:bg-gray-800 rounded-full p-1.5 border border-gray-200 dark:border-gray-700 cursor-pointer shadow-lg"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.path}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                      activeItem === item.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    aria-current={activeItem === item.id ? "page" : undefined}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </button>
                  </Link>
                  
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
              {isOpen && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
