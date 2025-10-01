import React, { useState } from "react";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { Heart, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItemCount = useSelector((state) => state?.cart?.itemCount);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    } 
    navigate("/user");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="h-24 lg:h-20 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <div className="text-2xl lg:text-3xl font-bold text-gradient">
                  Sophia Makes
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
              <FaRegCircleUser size={26} />
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-1 cursor-pointer text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <p className="font-medium">Olá, {user.name}</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded-lg p-4 min-w-52 shadow-xl border">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2 text-gray-700 hover:text-pink-600 transition-colors font-medium">
                  Entrar
                </button>
              )}
              
              <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors relative">
                <Heart size={24} />
              </button>
              
              <button
                onClick={goToCart}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 relative"
              >
                <ShoppingBag size={20} />
                <span className="hidden sm:inline">Carrinho</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Carrinho mobile */}
            <button
              onClick={goToCart}
              className="lg:hidden relative p-2 text-gray-700"
            >
              <BsCart4 size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
