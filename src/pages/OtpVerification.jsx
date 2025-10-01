import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos
  
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          toast.error('Código expirado. Solicite um novo código.')
          navigate('/forgot-password')
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, navigate])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      toast.error('Digite o código completo')
      return
    }

    setIsLoading(true)

    try {
      const result = await authService.verifyOTP(email, otpString)
      
      if (result.success) {
        toast.success('Código verificado com sucesso!')
        navigate('/reset-password', { state: { email } })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const result = await authService.sendOTP(email)
      if (result.success) {
        toast.success('Novo código enviado!')
        setTimeLeft(600)
        setOtp(['', '', '', '', '', ''])
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Erro ao reenviar código')
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!email) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/forgot-password" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-500 mb-6">
            <ArrowLeft size={20} />
            Voltar
          </Link>
          
          <div className="text-4xl font-bold text-gradient mb-2">
             Sophia Makes
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Verificar código
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite o código de 6 dígitos enviado para<br />
            <span className="font-semibold">{email}</span>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Tempo restante: <span className="font-semibold text-pink-600">{formatTime(timeLeft)}</span>
            </p>
            
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-pink-600 hover:text-pink-500 font-medium"
            >
              Reenviar código
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verificando...' : 'Verificar código'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OtpVerification