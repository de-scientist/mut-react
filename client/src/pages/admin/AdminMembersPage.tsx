import { useEffect, useState } from 'react'
import { membersAPI } from '../services/api'

interface Member {
  id: string
  name: string
  email: string
  yearOfStudy: string
  course: string
  ministry1?: string
  ministry2?: string
  message?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const AdminMembersPage = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await membersAPI.updateStatus(id, status)
      setMembers((prev) => prev.map(m => m.id === id ? { ...m, status } : m))
    } catch (err: any) {
      console.error('Failed to update member status:', err)
    }
  }

  if (loading) return <p>Loading members...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container py-5">
      <h2 className="mb-4">Members Management</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Year</th>
            <th>Course</th>
            <th>Ministry 1</th>
            <th>Ministry 2</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.yearOfStudy}</td>
              <td>{member.course}</td>
              <td>{member.ministry1 || '-'}</td>
              <td>{member.ministry2 || '-'}</td>
              <td>{member.status}</td>
              <td>
                {member.status !== 'APPROVED' && (
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleStatusChange(member.id, 'APPROVED')}>Approve</button>
                )}
                {member.status !== 'REJECTED' && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(member.id, 'REJECTED')}>Reject</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMembersPage
