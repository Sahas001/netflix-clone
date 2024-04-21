import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useAuth from "../hooks/useAuth";

const tabs = [
  "Home",
  "Series",
  "New & Popular",
  "Browse by Language",
];

export default function NavBar() {
  const { user, isLoading } = useSelector(
    (state: RootState) => state.user.value,
  );
  const [showBackground, setShowBackground] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-16 py-6 flex items center ${
          showBackground ? "bg-black bg-opacity-90" : null
        }`}
      >
        <img
          className="h-8"
          src="https://www.freepnglogos.com/uploads/netflix-logo-drawing-png-19.png"
          alt="logo"
        />
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
        {user && !isLoading && (
          <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
            <p onClick={logout}>Logout</p>
          </div>
        )}
      </div>
    </nav>
  );
}
