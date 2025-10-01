import { createSlice } from '@reduxjs/toolkit'
import { additionalProducts, updatedCategories } from '../../data/additionalProducts'

// Produtos de exemplo com imagens do Pexels
const defaultProducts = [
  {
    id: 1,
    name: "Base Líquida Mate",
    price: 89.90,
    category: "Base",
    description: "Base líquida de longa duração com acabamento mate natural. Ideal para todos os tipos de pele.",
    image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Paleta de Sombras Romance",
    price: 129.90,
    category: "Sombras",
    description: "Paleta com 12 cores românticas e versáteis. Texturas mate e cintilantes para looks incríveis.",
    image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Batom Matte Vermelho",
    price: 45.90,
    category: "Batom",
    description: "Batom com textura mate e cor intensa. Longa duração e conforto durante todo o dia.",
    image: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Delineador Líquido Preto",
    price: 39.90,
    category: "Delineador",
    description: "Delineador líquido de precisão com aplicador flexível. Cor intensa e à prova d'água.",
    image: "https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2533268/pexels-photo-2533268.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: 5,
    name: "Blush Rosa Natural",
    price: 55.90,
    category: "Blush",
    description: "Blush em pó com cor rosa natural. Fácil aplicação e efeito duradouro para um look fresco.",
    image: "https://images.pexels.com/photos/3373748/pexels-photo-3373748.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3373748/pexels-photo-3373748.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.5,
    reviews: 94
  },
  {
    id: 6,
    name: "Máscara para Cílios Volume",
    price: 67.90,
    category: "Máscara",
    description: "Máscara que proporciona volume e definição aos cílios. Fórmula resistente à água.",
    image: "https://images.pexels.com/photos/3373750/pexels-photo-3373750.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3373750/pexels-photo-3373750.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 178
  },
  ...additionalProducts
]

const getProductsFromStorage = () => {
  try {
    const products = localStorage.getItem('sophiaMakesProducts')
    if (products) {
      return JSON.parse(products)
    } else {
      // Se não há produtos salvos, usar os padrão e salvar
      localStorage.setItem('sophiaMakesProducts', JSON.stringify(defaultProducts))
      return defaultProducts
    }
  } catch (error) {
    return defaultProducts
  }
}

const initialState = {
  items: getProductsFromStorage(),
  categories: updatedCategories,
  selectedCategory: 'Todos',
  searchTerm: '',
  filteredProducts: getProductsFromStorage()
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      state.filteredProducts = action.payload
      localStorage.setItem('sophiaMakesProducts', JSON.stringify(action.payload))
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
      state.filteredProducts = filterProducts(state.items, action.payload, state.searchTerm)
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      state.filteredProducts = filterProducts(state.items, state.selectedCategory, action.payload)
    },
    addProduct: (state, action) => {
      state.items.push(action.payload)
      state.filteredProducts = filterProducts(state.items, state.selectedCategory, state.searchTerm)
      localStorage.setItem('sophiaMakesProducts', JSON.stringify(state.items))
    },
    updateProduct: (state, action) => {
      const { id, updates } = action.payload
      const index = state.items.findIndex(product => product.id === id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates }
        state.filteredProducts = filterProducts(state.items, state.selectedCategory, state.searchTerm)
        localStorage.setItem('sophiaMakesProducts', JSON.stringify(state.items))
      }
    }
  },
})

// Função auxiliar para filtrar produtos
const filterProducts = (products, category, searchTerm) => {
  let filtered = products

  if (category !== 'Todos') {
    filtered = filtered.filter(product => product.category === category)
  }

  if (searchTerm) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return filtered
}

export const { 
  setProducts, 
  setSelectedCategory, 
  setSearchTerm, 
  addProduct, 
  updateProduct 
} = productSlice.actions

export default productSlice.reducer