import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import ConfirmationModal from '../components/ConfirmationModal'
import '../assets/mut/css/about.css'
import '../styles/adminForms.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState<React.ReactNode>(null)
  const navigate = useNavigate()

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const openModal = (message: React.ReactNode) => {
    setModalMessage(message)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMessage(null)
  }

  const handleChange = (field: string, value: string) => {
    if (field === 'name') setName(value)
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)
    if (field === 'confirmPassword') setConfirmPassword(value)

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }))
    }
    setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !emailPattern.test(email.trim()),
      password: !password.trim() || password.length < 6,
      confirmPassword: password !== confirmPassword,
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      if (newErrors.password) {
        setError('Password must be at least 6 characters long')
      } else if (newErrors.confirmPassword) {
        setError('Passwords do not match')
      } else {
        setError('Please fill in all required fields correctly')
      }
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.register({
        email: email.trim(),
        password: password.trim(),
        name: name.trim() || undefined,
      })
      const token = response.data?.token || response.token || response?.accessToken || null
      if (!token) throw new Error('Registration did not return a token')
      
      localStorage.setItem('token', token)
      localStorage.setItem('email', email.trim())
      
      openModal(
        <div>
          <p className="mb-3">
            <strong>Registration successful!</strong>
          </p>
          <p>
            Welcome to MUTCU! Your account has been created successfully. You can now access the admin dashboard.
          </p>
        </div>
      )

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    } catch (err: any) {
      const errorMessage = err?.message || err?.data?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
      openModal(
        <div>
          <p className="text-danger mb-0">{errorMessage}</p>
        </div>
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm admin-form-container">
            <div className="card-header">
              <h2 className="mb-0">Register</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" title='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" title='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" title='password' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
