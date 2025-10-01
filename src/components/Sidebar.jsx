import React, { useState } from 'react'
import { Menu, X, Home, Search, ShoppingCart, User, Heart, Settings, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/userSlice'
import toast from 'react-hot-toast'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const cartItemCount = useSelector(state => state.cart.itemCount)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logout realizado com sucesso!')
    onClose()
    navigate('/')
  }

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Início',
      path: '/',
      showAlways: true
    },
    {
      icon: <Search size={20} />,
      label: 'Produtos',
      path: '/search',
      showAlways: true
    },
    {
      icon: <ShoppingCart size={20} />,
      label: 'Carrinho',
      path: '/cart',
      badge: cartItemCount > 0 ? cartItemCount : null,
      showAlways: true
    },
    {
      icon: <User size={20} />,
      label: 'Meu Perfil',
      path: '/profile',
      requireAuth: true
    },
    {
      icon: <Heart size={20} />,
      label: 'Favoritos',
      path: '/wishlist',
      requireAuth: true
    },
    {
      icon: <Settings size={20} />,
      label: 'Configurações',
      path: '/settings',
      requireAuth: true
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.showAlways || (item.requireAuth && user._id)
  )

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Sophia Makes</h2>
              <p className="text-xs text-gray-600">Sua loja de maquiagem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        {user._id ? (
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-25 to-rose-25">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-gray-200">
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={onClose}
                className="w-full btn-primary py-3 text-center block rounded-lg transition-all duration-200 hover:scale-105"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="w-full btn-secondary py-3 text-center block rounded-lg transition-all duration-200 hover:scale-105"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {filteredMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`transition-transform duration-200 ${
                    location.pathname === item.path ? 'scale-110' : ''
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        {user._id && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar