import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, Star, ShoppingBag, Heart, Plus, Minus, MessageCircle } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const products = useSelector(state => state.products.items)
  const user = useSelector(state => state.user)
  
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user._id) {
      toast.error('Faça login para adicionar produtos ao carrinho')
      navigate('/login')
      return
    }
    
    dispatch(addToCart({ product, quantity }))
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`)
  }

  const handleBuyNow = () => {
    if (!user._id) {
      toast.error('Faça login para finalizar a compra')
      navigate('/login')
      return
    }
    
    dispatch(addToCart({ product, quantity }))
    navigate('/cart')
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detalhes do Produto</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagens do Produto */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-lg font-semibold text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.reviews} avaliações)
                </span>
              </div>
              
              <div className="text-4xl font-bold text-pink-600 mb-6">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Controles de Quantidade */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quantidade</h3>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus size={20} />
                </button>
                
                <span className="text-2xl font-semibold px-6 py-2 bg-gray-100 rounded-lg">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-6">
                Subtotal: R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
              </div>

              {/* Botões de Ação */}
              <div className="space-y-4">
                {product.inStock ? (
                  <>
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Comprar Agora
                    </button>
                    
                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center gap-2 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold py-4 rounded-lg transition-all duration-300"
                    >
                      <ShoppingBag size={20} />
                      Adicionar ao Carrinho
                    </button>
                  </>
                ) : (
                  <div className="w-full bg-gray-300 text-gray-500 font-semibold py-4 rounded-lg text-center">
                    Produto Esgotado
                  </div>
                )}
                
                <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-4 rounded-lg transition-all duration-300">
                  <Heart size={20} />
                  Adicionar aos Favoritos
                </button>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                Dúvidas sobre este produto?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Entre em contato conosco via WhatsApp para esclarecimentos!
              </p>
              <button
                onClick={() => {
                  const whatsappNumber = "558596485522"
                  const message = `Olá! Tenho dúvidas sobre o produto: ${product.name}`
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, '_blank')
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail