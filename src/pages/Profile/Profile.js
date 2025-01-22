import React from "react";
import profileIcon from "../../assets/profile.png";

const Profile = () => {

  return (
    <div className="min-h-[87.9vh] bg-gray-100">
      <div className="relative bg-gradient-to-r from-blue-500 to-green-500 h-60 flex items-center justify-center shadow-lg">
        <div className="absolute bottom-4 flex flex-col items-center">
          <div className="w-36 h-36 mb-2">
            <img
              src={profileIcon}
              alt="User Profile"
            />
          </div>
          <div className="mt-2">
            <span className="bg-gray-800 text-white text-xl px-4 py-2 rounded-full shadow-md">
              Rutik
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
