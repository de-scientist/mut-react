import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import '../assets/mut/css/about.css'
import '../styles/adminForms.css'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const response = await authAPI.login({ email, password })

      // Debug: log full response to inspect structure
      console.log('Login response:', response)

      // Robust token extraction
      const token =
        response.token || response.accessToken || response.data?.token

      if (!token) throw new Error('Login did not return a token')

      // Optional: check if the user is an admin
      const userRole = response.data?.user?.role
      if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
        throw new Error('Unauthorized. Admin access required.')
      }

      // Store token
      localStorage.setItem('token', token)

      console.log('Login successful. Token stored. Redirecting to admin dashboard.')
      navigate('/admin')
    } catch (err: any) {
      console.error('Admin login error:', err) // Full error log for debugging
      setError(err?.message || 'Login failed. Please check your credentials.')
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
              <h2 className="mb-0">Admin Login</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    title="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    title="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
