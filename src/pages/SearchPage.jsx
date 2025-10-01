import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Star, ShoppingBag, ArrowLeft, Filter } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import { setSelectedCategory, setSearchTerm } from '../store/slices/productSlice'
import toast from 'react-hot-toast'

const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { filteredProducts, categories, selectedCategory, searchTerm } = useSelector(state => state.products)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos os Produtos'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h2 className="font-semibold text-gray-800">Filtrar por categoria</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'liquid-glass-button text-pink-700 shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="liquid-glass-card rounded-xl shadow-lg card-hover overflow-hidden">
                <div className="relative">
                  <div className="liquid-glass-image w-full h-64 cursor-pointer"
                    onClick={() => goToProduct(product.id)}
                  >
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Esgotado
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 
                    className="font-semibold text-lg mb-2 cursor-pointer hover:text-pink-600 transition-colors"
                    onClick={() => goToProduct(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-pink-600">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        product.inStock
                          ? 'liquid-glass-button text-pink-700 transform hover:scale-105'
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Nenhum produto encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou fazer uma nova busca.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  dispatch(setSearchTerm(''))
                  dispatch(setSelectedCategory('Todos'))
                }}
                className="btn-primary mr-4"
              >
                Limpar Filtros
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage