import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Home, Activity, Info, Briefcase, Phone, ArrowLeft } from "lucide-react";
import { preText } from "../utils/Constant";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768; // Adjust for small screens
      setIsSmallScreen(isSmall);
      setIsOpen(!isSmall); // Automatically close for small screens
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      width: "12rem", // Expanded width
      transition: { type: "spring", stiffness: 90, damping: 10 },
    },
    closed: {
      width: "5rem", // Collapsed width
      transition: { type: "spring", stiffness: 90, damping: 10 },
    },
  };

  // Link animation
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Icon hover animation
  const iconHover = {
    rest: { scale: 1 },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
  };

  const menuItems = [
    { name: "Dashboard", path: `${preText}dashboard`, icon: LayoutDashboard },
    { name: "User", path: `${preText}user`, icon: Users },
    { name: "Home", path: `${preText}home`, icon: Home },
    { name: "Activity", path: "/alter", icon: Activity },
    { name: "About", path: "/about", icon: Info },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <motion.aside
      className="min-h-screen bg-gradient-to-br from-[#1a1a40] to-[#292966] text-[#CCCCFF] shadow-lg relative border-r border-gray-700"
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      {/* Toggle Button */}
      <div className="absolute -right-2.5 top-4 ">
        <motion.button
          className="bg-[#CCCCFF] text-[#1a1a40] border-1 border-solid  rounded-full p-2 hover:[#5C5C99] transition cursor-pointer "
          onClick={() => setIsOpen(!isOpen)}
          // initial={{ opacity: 0, scale: 0.8 }}
          // animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowLeft size={16} />
          </motion.div>
        </motion.button>
      </div>

      {/* Navigation Menu */}
      <motion.nav
        className="mt-16 px-4 space-y-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {menuItems.map((item, index) => (
          <motion.div key={index} variants={linkVariants}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#414169] text-white shadow-md scale-105"
                    : "hover:bg-[#2a2a50] hover:text-white"
                }`
              }
            >
              <motion.div variants={iconHover} whileHover="hover" className="text-[#CCCCFF]">
                <item.icon size={22} color="#CCCCFF" />
              </motion.div>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </motion.aside>
  );
};

export default Sidebar;
