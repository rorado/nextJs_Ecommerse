import React from "react";
import Link from "next/link";

const items = [
  { title: "Dashboard", url: "dashboard", icon: () => <span>📊</span> },
  { title: "Settings", url: "dashboard/settings", icon: () => <span>⚙️</span> },
  { title: "Profile", url: "dashboard/profile", icon: () => <span>👤</span> },
];

export default function SidebateDashboard({ collapsed = false }) {
  return (
    <nav className=" flex flex-col mt-15 w-full">
      {items.map((item) => (
        <Link
          key={item.title}
          href={`/${item.url}`}
          className={`flex items-center p-2 my-1 rounded hover:bg-primary transition-colors duration-200 w-full 
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <item.icon />
          {!collapsed && <span className="ml-2">{item.title}</span>}
        </Link>
      ))}
    </nav>
  );
}
