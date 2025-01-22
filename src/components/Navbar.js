import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import MenuDrawer from "./MenuDrawer/MenuDrawer";
import profileIcon from "../assets/profile.png";

function Navbar() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dropdown

  const navigate = useNavigate();

  const pageStyle = "text-lg text-black hover:text-hovercolor";

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open); 
  };

  const toggleProfile = () => {
    setProfileOpen((prevState) => !prevState); // Toggle profile dropdown
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="text-black px-6 py-4 flex justify-between items-center">
      <div className="text-teal-600 text-3xl font-semibold mobile:text-lg sm:text-xl lg:text-3xl">
        Shopping Platform
      </div>

      <div className="hidden lg:flex items-center space-x-10">
        <Link to="/" className={pageStyle}>
          Home
        </Link>
        <Link to="/cart" className={pageStyle}>
          Cart
        </Link>

        {user ? (
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={toggleProfile} 
            >
              <img src={profileIcon} alt="profile" className="w-9 h-9"/> 
            </button>
            {profileOpen && ( 
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                  onClick={() => setProfileOpen(false)} 
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setProfileOpen(false); 
                  }}
                  className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="border-2 border-teal-500 text-teal-500 px-4 py-2 rounded-md hover:bg-teal-500 hover:text-white">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center justify-center lg:hidden">
        <p className="text-lg hover:text-hovercolor">Menu</p>
        <button onClick={toggleDrawer(true)} className="text-xl">
          &#9776;
        </button>
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={toggleDrawer(false)}
          >
            <div
              className="h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <MenuDrawer
                user={user}
                toggleDrawer={toggleDrawer}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
