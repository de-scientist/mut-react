import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import '../assets/mut/css/about.css'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setError(null)
  try {
    setLoading(true)
    const response = await authAPI.login({ email, password })

    // Since apiRequest returns parsed JSON, token should be at response.token or response.accessToken
    const token = response.token || response.accessToken
    if (!token) throw new Error('Login did not return a token')

    localStorage.setItem('token', token)
    console.log('Login response:', response)
    // redirect to admin dashboard
    navigate('/admin')
  } catch (err: any) {
    setError(err.message || 'Login failed')
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
              <input className="form-control" title='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" title="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
