import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react'
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice'
import toast from 'react-hot-toast'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total, itemCount } = useSelector(state => state.cart)
  const user = useSelector(state => state.user)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId))
      toast.success('Produto removido do carrinho')
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (productId, productName) => {
    dispatch(removeFromCart(productId))
    toast.success(`${productName} removido do carrinho`)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Carrinho limpo com sucesso')
  }

  const handleWhatsAppCheckout = () => {
    if (!user._id) {
      toast.error('Faça login para finalizar o pedido')
      navigate('/login')
      return
    }

    const whatsappNumber = "558596485522"
    const message = createWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
  }

  const createWhatsAppMessage = () => {
    let message = `🛍️ *PEDIDO - SOPHIA MAKES* 🛍️\n\n`
    message += `👤 *Cliente:* ${user.name}\n`
    message += `📧 *Email:* ${user.email}\n`
    if (user.phone) {
      message += `📱 *Telefone:* ${user.phone}\n`
    }
    message += `\n📋 *PRODUTOS:*\n`
    
    items.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}*\n`
      message += `   Quantidade: ${item.quantity}\n`
      message += `   Valor unitário: R$ ${item.price.toFixed(2).replace('.', ',')}\n`
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`
    })
    
    message += `\n💰 *TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n`
    message += `📦 *Total de itens:* ${itemCount}\n\n`
    message += `💬 Olá! Gostaria de finalizar este pedido. Podemos combinar a forma de pagamento e entrega?`
    
    return message
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 mb-6">
            Adicione alguns produtos incríveis ao seu carrinho!
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Meu Carrinho</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="font-semibold text-lg px-3 py-1 bg-gray-100 rounded">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Unitário</div>
                  <div className="font-semibold text-gray-800">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Subtotal</div>
                  <div className="font-bold text-pink-600 text-lg">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleClearCart}
                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
                Limpar Carrinho
              </button>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Resumo do Pedido
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} itens)</span>
                  <span className="font-semibold">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-pink-600">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Finalizar Pedido via WhatsApp
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Clique no botão abaixo para finalizar seu pedido via WhatsApp. 
                Iremos combinar a forma de pagamento e entrega que for melhor para você!
              </p>
              
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={24} />
                <span className="text-lg">Finalizar Pedido</span>
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Você será redirecionado para o WhatsApp com seu pedido pronto
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                Vantagens da Sophia Makes
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Atendimento personalizado</li>
                <li>• Pagamento flexível</li>
                <li>• Entrega combinada</li>
                <li>• Produtos de qualidade</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart