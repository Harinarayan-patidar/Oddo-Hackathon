import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="absolute top-12 right-0 w-48 bg-white shadow-md border rounded-lg p-2 z-50"
    >
      <ul className="flex flex-col space-y-2">
        <li>
          <Link
            to="/login"
            className="block px-4 py-2 text-sm hover:bg-green-100 rounded-md"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="block px-4 py-2 text-sm hover:bg-green-100 rounded-md"
          >
            Signup
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm hover:bg-green-100 rounded-md"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default UserDropdown;
