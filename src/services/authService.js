// Serviços de autenticação com localStorage

export const authService = {
  // Registrar usuário
  register: async (userData) => {
    try {
      const { name, email, password, phone } = userData
      
      // Verificar se email já existe
      const users = getUsers()
      const existingUser = users.find(user => user.email === email)
      
      if (existingUser) {
        throw new Error('Email já cadastrado')
      }
      
      // Criar novo usuário
      const newUser = {
        _id: generateId(),
        name,
        email,
        phone: phone || '',
        password: password, // Em produção, usar hash
        avatar: '',
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('sophiaMakesUsers', JSON.stringify(users))
      
      // Remover senha do retorno
      const { password: _, ...userWithoutPassword } = newUser
      return { success: true, user: userWithoutPassword }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const users = getUsers()
      const user = users.find(u => u.email === email && u.password === password)
      
      if (!user) {
        throw new Error('Email ou senha incorretos')
      }
      
      // Remover senha do retorno
      const { password: _, ...userWithoutPassword } = user
      return { success: true, user: userWithoutPassword }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Verificar se email existe (para recuperação de senha)
  checkEmail: async (email) => {
    try {
      const users = getUsers()
      const user = users.find(u => u.email === email)
      
      if (!user) {
        throw new Error('Email não encontrado')
      }
      
      return { success: true, message: 'Email encontrado' }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Simular envio de OTP
  sendOTP: async (email) => {
    try {
      // Gerar OTP de 6 dígitos
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Salvar OTP no localStorage (em produção seria enviado por email/SMS)
      const otpData = {
        email,
        otp,
        expires: Date.now() + 10 * 60 * 1000 // 10 minutos
      }
      
      localStorage.setItem('sophiaMakesOTP', JSON.stringify(otpData))
      
      // Em desenvolvimento, mostrar OTP no console
      console.log('OTP para', email, ':', otp)
      
      return { success: true, message: 'OTP enviado com sucesso' }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Verificar OTP
  verifyOTP: async (email, otp) => {
    try {
      const otpData = JSON.parse(localStorage.getItem('sophiaMakesOTP') || '{}')
      
      if (!otpData.email || otpData.email !== email) {
        throw new Error('OTP não encontrado')
      }
      
      if (Date.now() > otpData.expires) {
        throw new Error('OTP expirado')
      }
      
      if (otpData.otp !== otp) {
        throw new Error('OTP incorreto')
      }
      
      return { success: true, message: 'OTP verificado com sucesso' }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Redefinir senha
  resetPassword: async (email, newPassword) => {
    try {
      const users = getUsers()
      const userIndex = users.findIndex(u => u.email === email)
      
      if (userIndex === -1) {
        throw new Error('Usuário não encontrado')
      }
      
      users[userIndex].password = newPassword
      localStorage.setItem('sophiaMakesUsers', JSON.stringify(users))
      
      // Limpar OTP
      localStorage.removeItem('sophiaMakesOTP')
      
      return { success: true, message: 'Senha redefinida com sucesso' }
      
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

// Funções auxiliares
const getUsers = () => {
  try {
    const users = localStorage.getItem('sophiaMakesUsers')
    return users ? JSON.parse(users) : []
  } catch (error) {
    return []
  }
}

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}