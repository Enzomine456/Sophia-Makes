import React, { useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../store/slices/productSlice'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.items)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      dispatch(setSearchTerm(searchValue.trim()))
      navigate('/search')
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setShowSuggestions(value.length > 0)
  }

  const handleSuggestionClick = (productName) => {
    setSearchValue(productName)
    dispatch(setSearchTerm(productName))
    navigate('/search')
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearchValue('')
    setShowSuggestions(false)
    dispatch(setSearchTerm(''))
  }

  // Filtrar produtos para sugestões
  const suggestions = searchValue.length > 0 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase())
      ).slice(0, 5)
    : []

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <SearchIcon 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Buscar maquiagens..."
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(searchValue.length > 0)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product.name)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-8 h-8 object-cover rounded"
              />
              <div>
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-xs text-gray-500">{product.category}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search