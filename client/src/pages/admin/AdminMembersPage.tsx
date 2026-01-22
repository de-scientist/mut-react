import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { membersAPI } from '../../services/api'
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  User, 
  Mail, 
  GraduationCap, 
  ArrowLeft, 
  Users, 
  Clock, 
  UserCheck 
} from 'lucide-react'

type MemberStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface Member {
  id: string
  name: string
  email: string
  yearOfStudy: string
  course: string
  ministry1?: string
  ministry2?: string
  message?: string
  status: MemberStatus
}

const AdminMembersPage = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await membersAPI.getAll()
      setMembers(response.data || response.items || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load members')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: MemberStatus) => {
    try {
      await membersAPI.updateStatus(id, newStatus)
      setMembers((prev) => 
        prev.map(m => m.id === id ? { ...m, status: newStatus } : m)
      )
    } catch (err: any) {
      console.error('Failed to update member status:', err)
    }
  }

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Memoized stats for the dashboard header
  const stats = useMemo(() => ({
    total: members.length,
    pending: members.filter(m => m.status === 'PENDING').length,
    approved: members.filter(m => m.status === 'APPROVED').length
  }), [members])

  const getStatusBadge = (status: MemberStatus) => {
    const badges = {
      PENDING: 'bg-warning-subtle text-warning-emphasis border-warning',
      APPROVED: 'bg-success-subtle text-success-emphasis border-success',
      REJECTED: 'bg-danger-subtle text-danger-emphasis border-danger'
    }
    return `badge border px-3 py-2 rounded-pill ${badges[status]}`
  }

  if (loading) return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-medium">Loading membership data...</p>
    </div>
  )

  // Export members as CSV
const exportMembersCSV = () => {
  if (!members.length) return

  const headers = [
    'Name',
    'Email',
    'Course',
    'Year',
    'Ministry 1',
    'Ministry 2',
    'Status'
  ]

  const rows = members.map(m => [
    m.name,
    m.email,
    m.course,
    m.yearOfStudy,
    m.ministry1 || '',
    m.ministry2 || '',
    m.status
  ])

  const csvContent =
    [headers, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `members_${new Date().toISOString().split('T')[0]}.csv`
  link.click()

  URL.revokeObjectURL(url)
}

// Share members data
const shareMembers = async () => {
  const text = members
    .map(m => `${m.name} (${m.email}) - ${m.status}`)
    .join('\n')

  if (navigator.share) {
    await navigator.share({
      title: 'Members List',
      text
    })
  } else {
    await navigator.clipboard.writeText(text)
    alert('Members list copied to clipboard')
  }
}

  return (
    <div className="min-vh-100 bg-light py-4 px-lg-5">
      <div className="container-fluid">
        
        {/* Header & Back Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <button 
              onClick={() => navigate('/admin')}
              className="btn btn-link text-decoration-none text-muted p-0 mb-2 d-flex align-items-center gap-1"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h2 className="fw-bold text-dark mb-0">Member Management</h2>
            <p className="text-muted mb-0">Review and approve new organization applications</p>
          </div>
          
          <div className="d-flex gap-3">
            <div className="input-group shadow-sm" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 shadow-none" 
                placeholder="Search members..."
                title="Search by name or email"
                aria-label="Search members"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary-subtle p-3 rounded-3 text-primary"><Users size={24}/></div>
                <div>
                  <h4 className="fw-bold mb-0">{stats.total}</h4>
                  <small className="text-muted text-uppercase fw-bold">Total Applicants</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning-subtle p-3 rounded-3 text-warning"><Clock size={24}/></div>
                <div>
                  <h4 className="fw-bold mb-0">{stats.pending}</h4>
                  <small className="text-muted text-uppercase fw-bold">Pending Review</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success-subtle p-3 rounded-3 text-success"><UserCheck size={24}/></div>
                <div>
                  <h4 className="fw-bold mb-0">{stats.approved}</h4>
                  <small className="text-muted text-uppercase fw-bold">Approved Members</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3">Member Info</th>
                  <th className="py-3">Academic Details</th>
                  <th className="py-3">Ministries</th>
                  <th className="py-3">Status</th>
                  <th className="px-4 py-3 text-end">Management</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(member => (
                    <tr key={member.id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-3 text-primary border">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{member.name}</div>
                            <div className="text-muted small d-flex align-items-center">
                              <Mail size={12} className="me-1" /> {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="small">
                          <div className="text-dark fw-medium">{member.course}</div>
                          <div className="text-muted d-flex align-items-center">
                            <GraduationCap size={14} className="me-1" /> Year {member.yearOfStudy}
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex flex-wrap gap-1">
                          <span className="badge bg-light text-muted border fw-normal">{member.ministry1 || 'General'}</span>
                          {member.ministry2 && (
                            <span className="badge bg-light text-muted border fw-normal">{member.ministry2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={getStatusBadge(member.status)}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          {member.status !== 'APPROVED' && (
                            <button 
                              className="btn btn-success btn-sm px-3 rounded-pill shadow-sm"
                              title="Approve Member"
                              onClick={() => handleStatusChange(member.id, 'APPROVED')}
                            >
                              <CheckCircle size={14} className="me-1" /> Approve
                            </button>
                          )}
                          {member.status !== 'REJECTED' && (
                            <button 
                              className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                              title="Reject Member"
                              onClick={() => handleStatusChange(member.id, 'REJECTED')}
                            >
                              <XCircle size={14} className="me-1" /> Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="opacity-25 mb-3"><Users size={48} /></div>
                      <p className="text-muted mb-0">
                        {error ? <span className="text-danger">{error}</span> : 'No members found matching your search.'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top py-3 px-4">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted fw-medium">
                Showing {filteredMembers.length} of {members.length} records
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMembersPage