import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Star, ShoppingBag, Heart, Sparkles, Award, Truck, MessageCircle } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import { setSelectedCategory } from '../store/slices/productSlice'
import toast from 'react-hot-toast'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { filteredProducts, categories, selectedCategory } = useSelector(state => state.products)
  const user = useSelector(state => state.user)

  const handleAddToCart = (product) => {
    if (!user._id) {
      toast.error('Faça login para adicionar produtos ao carrinho')
      navigate('/login')
      return
    }
    
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ))
  }

  const goToProduct = (productId) => {
    navigate(`/product/${productId}`)
  }

  const benefits = [
    {
      icon: <Sparkles size={32} className="text-pink-500" />,
      title: "Produtos de Qualidade",
      description: "Selecionamos apenas as melhores marcas e produtos para você"
    },
    {
      icon: <MessageCircle size={32} className="text-green-500" />,
      title: "Atendimento Personalizado",
      description: "Tire suas dúvidas diretamente no WhatsApp com nossa equipe"
    },
    {
      icon: <Truck size={32} className="text-blue-500" />,
      title: "Entrega Flexível",
      description: "Combinamos a melhor forma de entrega para você"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-400 via-rose-400 to-pink-300 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fadeInDown">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles size={32} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Bem-vinda à Sophia Makes
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            Descubra sua beleza com os melhores produtos de maquiagem
          </p>
          <button 
            onClick={() => navigate('/search')}
            className="btn-primary text-lg px-8 py-4 animate-zoomIn button-glow" 
            style={{ animationDelay: '600ms' }}
          >
            <ShoppingBag size={20} className="inline mr-2" />
            Explorar Produtos
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent animate-fadeInUp"></div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 animate-fadeInUp interactive ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {selectedCategory === 'Todos' ? 'Nossos Produtos' : selectedCategory}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg card-hover overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover cursor-pointer image-hover group-hover:scale-110 transition-all duration-500"
                    onClick={() => goToProduct(product.id)}
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <Heart size={20} className="text-gray-600 hover:text-pink-500 transition-colors" />
                  </button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold animate-pulse">
                        Esgotado
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 
                    className="font-semibold text-lg mb-2 cursor-pointer hover:text-pink-600 transition-colors duration-300 line-clamp-1"
                    onClick={() => goToProduct(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} avaliações)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 interactive ${
                        product.inStock
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag size={18} />
                      <span className="hidden sm:inline">
                        {product.inStock ? 'Comprar' : 'Esgotado'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 animate-fadeInUp">
              <div className="text-6xl mb-4 opacity-50">
                <ShoppingBag size={64} className="mx-auto text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Por que escolher a Sophia Makes?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-white to-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl border border-pink-100">
                  <div className="transition-transform duration-300 group-hover:animate-pulse">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-pink-600">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fadeInUp">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award size={40} className="text-yellow-300 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">Pronta para se maquiar?</h2>
            </div>
            <p className="text-xl mb-8 opacity-90">
              Explore nossa coleção completa e encontre os produtos perfeitos para você!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/search')}
                className="bg-white text-pink-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg button-glow"
              >
                <ShoppingBag size={20} className="inline mr-2" />
                Ver Todos os Produtos
              </button>
              <button 
                onClick={() => {
                  const whatsappNumber = "558596485522"
                  const message = "Olá! Gostaria de saber mais sobre os produtos da Sophia Makes"
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, '_blank')
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={20} className="inline mr-2" />
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home