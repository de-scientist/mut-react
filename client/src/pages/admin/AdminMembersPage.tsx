import { useEffect, useState } from 'react'
import { membersAPI } from '../../services/api'
import { Search, CheckCircle, XCircle, User, Mail, GraduationCap } from 'lucide-react'

// Define the literal type for better type safety
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

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      // Fixed: Use membersAPI as imported
      const response = await membersAPI.getAll()
      setMembers(response.data || response.items || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load members')
    } finally {
      setLoading(false)
    }
  }

  // Fixed: status parameter typed as MemberStatus to satisfy TypeScript
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

  const getStatusBadge = (status: MemberStatus) => {
    const badges = {
      PENDING: 'bg-warning-subtle text-warning-emphasis border-warning',
      APPROVED: 'bg-success-subtle text-success-emphasis border-success',
      REJECTED: 'bg-danger-subtle text-danger-emphasis border-danger'
    }
    return `badge border px-2 py-1 ${badges[status]}`
  }

  if (loading) return (
    <div className="d-flex justify-content-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  )

  return (
    <div className="container-fluid py-4 px-lg-5">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h4 className="mb-1 fw-bold text-dark">Member Management</h4>
              <p className="text-muted small mb-0">Review and manage organization memberships</p>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control bg-light border-start-0 shadow-none" 
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr className="text-muted small">
                <th className="ps-4">MEMBER</th>
                <th>STUDY INFO</th>
                <th>MINISTRIES</th>
                <th>STATUS</th>
                <th className="text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <tr key={member.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle text-primary rounded-circle p-2 me-3">
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
                    <td>
                      <div className="small">
                        <div className="text-dark fw-medium">{member.course}</div>
                        <div className="text-muted d-flex align-items-center">
                          <GraduationCap size={14} className="me-1" /> Year {member.yearOfStudy}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        <span className="badge bg-light text-dark border">{member.ministry1 || 'None'}</span>
                        {member.ministry2 && (
                          <span className="badge bg-light text-dark border">{member.ministry2}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(member.status)}>
                        {member.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        {member.status !== 'APPROVED' && (
                          <button 
                            className="btn btn-outline-success btn-sm d-flex align-items-center shadow-sm"
                            onClick={() => handleStatusChange(member.id, 'APPROVED')}
                          >
                            <CheckCircle size={14} className="me-1" /> Approve
                          </button>
                        )}
                        {member.status !== 'REJECTED' && (
                          <button 
                            className="btn btn-outline-danger btn-sm d-flex align-items-center shadow-sm"
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
                  <td colSpan={5} className="text-center py-5 text-muted">
                    {error ? <span className="text-danger">{error}</span> : 'No members found matches your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white border-top py-3">
           <small className="text-muted">Showing {filteredMembers.length} members</small>
        </div>
      </div>
    </div>
  )
}

export default AdminMembersPage