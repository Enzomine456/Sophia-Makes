import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: localStorage.getItem('userId') || '',
  name: localStorage.getItem('userName') || '',
  email: localStorage.getItem('userEmail') || '',
  phone: localStorage.getItem('userPhone') || '',
  avatar: localStorage.getItem('userAvatar') || '',
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { _id, name, email, phone, avatar } = action.payload
      state._id = _id
      state.name = name
      state.email = email
      state.phone = phone
      state.avatar = avatar
      state.isLoggedIn = true
      
      // Salvar no localStorage
      localStorage.setItem('userId', _id)
      localStorage.setItem('userName', name)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userPhone', phone || '')
      localStorage.setItem('userAvatar', avatar || '')
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout: (state) => {
      state._id = ''
      state.name = ''
      state.email = ''
      state.phone = ''
      state.avatar = ''
      state.isLoggedIn = false
      
      // Limpar localStorage
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userPhone')
      localStorage.removeItem('userAvatar')
      localStorage.removeItem('isLoggedIn')
    },
    updateUserDetails: (state, action) => {
      const { name, phone, avatar } = action.payload
      if (name !== undefined) {
        state.name = name
        localStorage.setItem('userName', name)
      }
      if (phone !== undefined) {
        state.phone = phone
        localStorage.setItem('userPhone', phone)
      }
      if (avatar !== undefined) {
        state.avatar = avatar
        localStorage.setItem('userAvatar', avatar)
      }
    }
  },
})

export const { setUserDetails, logout, updateUserDetails } = userSlice.actions

export default userSlice.reducer