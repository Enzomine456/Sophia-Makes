import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await authService.checkEmail(email)
      
      if (result.success) {
        const otpResult = await authService.sendOTP(email)
        if (otpResult.success) {
          toast.success('Código de verificação enviado!')
          navigate('/otp-verification', { state: { email } })
        } else {
          toast.error(otpResult.message)
        }
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-500 mb-6">
            <ArrowLeft size={20} />
            Voltar ao login
          </Link>
          
          <div className="text-4xl font-bold text-gradient mb-2">
             Sophia Makes
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Esqueceu sua senha?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite seu email para receber um código de verificação
          </p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar código'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword