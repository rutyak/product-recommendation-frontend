import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuDrawer = ({ user, toggleDrawer, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="w-64 h-full bg-white shadow-md"
    >
      <ul className="py-4">
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link to="/" className="text-lg text-black">
            Home
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link to="/createShopping" className="text-lg text-black">
            Shopping Creation
          </Link>
        </li>
        {user ? (
          <>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/login" className="text-lg text-black">
                Sign In
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link to="/signup" className="text-lg text-black">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuDrawer;
