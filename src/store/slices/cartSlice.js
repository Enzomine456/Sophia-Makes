import { createSlice } from '@reduxjs/toolkit'

const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('sophiaMakesCart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('sophiaMakesCart', JSON.stringify(cart))
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error)
  }
}

const initialState = {
  items: getCartFromStorage(),
  total: 0,
  itemCount: 0,
}

// Calcular totais
const calculateTotals = (items) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    ...calculateTotals(initialState.items)
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          category: product.category
        })
      }
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
      
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
      
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.id === productId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId)
        } else {
          item.quantity = quantity
        }
        
        const totals = calculateTotals(state.items)
        state.total = totals.total
        state.itemCount = totals.itemCount
        
        saveCartToStorage(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      saveCartToStorage([])
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer