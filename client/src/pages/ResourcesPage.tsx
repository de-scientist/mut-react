import { useEffect, useState } from 'react'
import { resourcesAPI } from '../services/api'
import '../assets/mut/css/about.css'

type ResourceItem = {
  id?: string
  title: string
  description?: string
  url?: string
}

const fallbackResources: ResourceItem[] = [
  { id: '1', title: 'Weekly Sermon 2025-01-01', description: 'Audio download of last Sunday sermon', url: '#' },
  { id: '2', title: 'Daily Devotional - January', description: 'A month of devotionals to keep you grounded', url: '#' },
]

const ResourcesPage = () => {
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        setLoading(true)
        const res = await resourcesAPI.getAll()
        // backend expected to return wrapper { success, data }
        const data = res.data || res
        if (mounted && Array.isArray(data)) {
          setResources(data)
        } else if (mounted && data && data.items) {
          setResources(data.items)
        } else if (mounted) {
          // fallback if backend doesn't provide resources endpoint
          setResources(fallbackResources)
        }
      } catch (err: any) {
        // On any fetch error, fall back to built-in mock resources (do not break the page)
        console.error('Resources fetch failed, using fallback:', err)
        setResources(fallbackResources)
        setError(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="resources-page container py-5">
      <h1 className="mb-4">Resources</h1>
      <p className="lead mb-4">Sermons, devotionals, and other MUTCU resources.</p>

      {loading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row">
          {resources.length === 0 && (
            <div className="col-12">
              <p>No resources available yet.</p>
            </div>
          )}

          {resources.map((r) => (
            <div className="col-md-6 mb-4" key={r.id || r.title}>
              <div className="card shadow-sm p-3 h-100">
                <h5>{r.title}</h5>
                {r.description && <p className="mb-2">{r.description}</p>}
                {r.url ? (
                  <a className="btn btn-sm btn-primary" href={r.url} target="_blank" rel="noreferrer">View / Download</a>
                ) : (
                  <span className="text-muted">No download available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResourcesPage
