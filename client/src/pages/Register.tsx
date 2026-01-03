import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import '../assets/mut/css/about.css'

const Register = () => {
  const [name, setName] = useState('')
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
      const response = await authAPI.register({ email, password, name: name || undefined })
      const token = response.data?.token || response.token || response?.accessToken || null
      if (!token) throw new Error('Registration did not return a token')
      try { localStorage.setItem('token', token); localStorage.setItem('email', email) } catch {}
      navigate('/admin')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" title='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
