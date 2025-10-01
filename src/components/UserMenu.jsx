import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/userSlice'
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

const UserMenu = ({ close }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logout realizado com sucesso!')
    if (close) close()
  }

  const menuItems = [
    {
      icon: <User size={18} />,
      label: 'Meu Perfil',
      path: '/profile'
    },
    {
      icon: <ShoppingBag size={18} />,
      label: 'Meus Pedidos',
      path: '/orders'
    },
    {
      icon: <Heart size={18} />,
      label: 'Lista de Desejos',
      path: '/wishlist'
    },
    {
      icon: <Settings size={18} />,
      label: 'Configurações',
      path: '/settings'
    }
  ]

  return (
    <div className="min-w-48">
      <div className="border-b border-gray-200 pb-3 mb-3">
        <p className="font-semibold text-gray-800">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>

      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={close}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}

export default UserMenu