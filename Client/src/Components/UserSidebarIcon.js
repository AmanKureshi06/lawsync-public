import React from "react";
import { Clock, Lock, MessageCircle, Newspaper, Pencil, Settings, Wallet, Menu, X, ChevronRight, ChevronLeft } from "lucide-react";

const SidebarIcon = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="burger-menu">
      <button className="burger-icon" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <ChevronLeft size={24} color="#000" />
        ) : (
          <ChevronRight size={24} className="closing-icon" />
        )}
      </button>
    </div>
  );
};

export default SidebarIcon;
