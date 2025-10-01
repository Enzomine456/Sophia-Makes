import React, { useState } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { Heart, ShoppingBag, Menu, Sparkles } from "lucide-react";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItemCount = useSelector((state) => state?.cart?.itemCount);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <header className="h-20 liquid-glass-hero shadow-lg sticky top-0 z-30 flex flex-col justify-center backdrop-blur-sm bg-opacity-95">
        {!(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center px-4 justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110 hover:bg-white/20 rounded-lg"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="h-full flex items-center">
              <Link to={"/"} className="h-full flex justify-center items-center group">
                <div className="flex items-center gap-2 transition-all duration-300 group-hover:scale-105">
                  <div className="w-8 h-8 liquid-glass-button rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles size={16} className="text-pink-600" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-liquid-glass text-pink-700">
                    Sophia Makes
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <Search />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-2 cursor-pointer text-gray-700 hover:text-pink-600 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <FaRegCircleUser size={16} className="text-white" />
                    </div>
                    <p className="font-medium">Olá, {user.name}</p>
                    <div className={`transition-transform duration-300 ${openUserMenu ? 'rotate-180' : ''}}`}>
                      <GoTriangleDown size={16} />
                    </div>
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12 animate-fadeInDown">
                      <div className="bg-white rounded-lg p-4 min-w-52 shadow-xl border border-pink-100">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={redirectToLoginPage} 
                  className="text-lg px-4 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium hover:bg-white/20 rounded-lg"
                >
                  Entrar
                </button>
              )}
              
              <button className="p-3 text-gray-700 hover:text-pink-600 transition-all duration-300 relative hover:scale-110 hover:bg-white/20 rounded-lg">
                <Heart size={22} />
              </button>
              
              <button
                onClick={goToCart}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 relative shadow-lg hover:shadow-xl"
              >
                <ShoppingBag size={20} />
                <span className="hidden sm:inline">Carrinho</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Cart */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={goToCart}
                className="relative p-2 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110 hover:bg-white/20 rounded-lg"
              >
                <ShoppingBag size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Search */}
        <div className="container mx-auto px-4 lg:hidden mt-2">
          <Search />
        </div>
      </header>
    </>
  );
};

export default Header;