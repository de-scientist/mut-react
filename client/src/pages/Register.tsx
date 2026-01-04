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
    <div className="register-page min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg admin-form-container">
              <div className="card-header text-center">
                <h2 className="mb-0">
                  <i className="fas fa-user-plus me-2"></i>
                  Create Account
                </h2>
                <p className="text-muted mb-0 mt-2 small">Join MUTCU Community</p>
              </div>
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      title='submit'
                      onClick={() => setError(null)}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control${errors.name ? ' is-invalid' : ''}`}
                      value={name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">Please enter your name.</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control${errors.email ? ' is-invalid' : ''}`}
                      value={email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">Please enter a valid email address.</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control${errors.password ? ' is-invalid' : ''}`}
                      value={password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      minLength={6}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">Password must be at least 6 characters long.</div>
                    )}
                    <small className="form-text text-muted">Password must be at least 6 characters</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control${errors.confirmPassword ? ' is-invalid' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">Passwords do not match.</div>
                    )}
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <p className="text-muted mb-0">
                      Already have an account?{' '}
                      <Link to="/admin/login" className="text-primary text-decoration-none">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage ?? ''}
        onClose={closeModal}
      />
    </div>
  )
}

export default Register
