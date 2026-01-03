import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import '../assets/mut/css/about.css'

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

      // Debug: log full response to inspect token location
      console.log('Login response:', response)

      // Robust token extraction
      const token =
        response.token || response.accessToken || response.data?.token

      if (!token) throw new Error('Login did not return a token')

      // Store token and redirect to admin dashboard
      localStorage.setItem('token', token)
      navigate('/admin')
    } catch (err: any) {
      // Show friendly error message
      setError(err?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Admin Login</h2>
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
            <button className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
