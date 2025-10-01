import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

const Checkout = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <ShoppingBag size={64} className="mx-auto text-pink-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Checkout via WhatsApp
        </h2>
        <p className="text-gray-600 mb-6">
          Finalize seu pedido diretamente no WhatsApp para uma experiência personalizada!
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="btn-primary"
        >
          Ir para o Carrinho
        </button>
      </div>
    </div>
  )
}

export default Checkout