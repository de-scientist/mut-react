import { useEffect, useState } from 'react'
import { resourcesAPI } from '../services/api'

type ResourceItem = {
  id?: string
  title: string
  description?: string
  url?: string
  type?: 'audio' | 'pdf' | 'video' | 'link' // Added for better UX icons
}

const fallbackResources: ResourceItem[] = [
  { id: '1', title: 'Weekly Sermon 2025-01-01', description: 'Audio download of last Sunday sermon regarding stewardship.', url: '#', type: 'audio' },
  { id: '2', title: 'Daily Devotional - January', description: 'A month of devotionals to keep you grounded in the Word.', url: '#', type: 'pdf' },
]

const ResourcesPage = () => {
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Resources | MUTCU'
    let mounted = true

    const load = async () => {
      try {
        setLoading(true)
        const res = await resourcesAPI.getAll()
        const data = res.data || res
        if (mounted && Array.isArray(data)) {
          setResources(data)
        } else if (mounted && data && data.items) {
          setResources(data.items)
        } else if (mounted) {
          setResources(fallbackResources)
        }
      } catch (err: any) {
        console.error('Resources fetch failed, using fallback:', err)
        setResources(fallbackResources)
        setError(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  // Helper to determine icon based on title or type
  const getResourceIcon = (item: ResourceItem) => {
    const title = item.title.toLowerCase()
    if (title.includes('sermon') || title.includes('audio')) return 'fa-headphones'
    if (title.includes('devotional') || title.includes('pdf') || title.includes('guide')) return 'fa-file-pdf'
    return 'fa-cloud-download-alt'
  }

  return (
    <div className="resources-page-wrapper">
      {/* HERO SECTION */}
      <section className="resources-hero">
        <div className="container py-5 text-center">
          <span className="badge-pill mb-3">Library & Media</span>
          <h1 className="display-4 fw-bold text-white mb-3">Spiritual <span className="text-orange">Resources</span></h1>
          <p className="lead text-white-50 mx-auto col-lg-7">
            Equipping the saints with sermons, devotionals, and study materials to foster growth in Christ.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="container py-5 mt-n6">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-teal" role="status"></div>
            <p className="text-muted mt-3">Fetching resources...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-custom d-flex align-items-center mb-5" role="alert">
            <i className="fas fa-exclamation-circle me-3"></i>
            <div>{error}</div>
          </div>
        )}

        {!loading && (
          <div className="row g-4">
            {resources.length === 0 ? (
              <div className="col-12 text-center py-5 shadow-sm bg-white rounded-4">
                <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                <p className="text-muted fw-medium">No resources are currently available. Check back later!</p>
              </div>
            ) : (
              resources.map((r) => (
                <div className="col-md-6 col-lg-4" key={r.id || r.title}>
                  <div className="resource-card h-100">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <div className="icon-box">
                          <i className={`fas ${getResourceIcon(r)}`}></i>
                        </div>
                        <h5 className="resource-title mb-0 ms-3">{r.title}</h5>
                      </div>
                      
                      {r.description && (
                        <p className="resource-desc text-muted small flex-grow-1">
                          {r.description}
                        </p>
                      )}
                      
                      <div className="mt-4">
                        {r.url ? (
                          <a 
                            className="btn btn-resource w-100 py-2 fw-bold" 
                            href={r.url} 
                            target="_blank" 
                            rel="noreferrer"
                          >
                            <i className="fas fa-download me-2"></i> Access Resource
                          </a>
                        ) : (
                          <button className="btn btn-disabled w-100 py-2" disabled>
                            Not Available
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <style>{`
        :root {
          --brand-navy: #0A1837;
          --brand-orange: #FF9800;
          --brand-teal: #36D1C4;
          --bg-light: #F8FAFC;
        }

        .resources-page-wrapper {
          background-color: var(--bg-light);
          min-height: 100vh;
        }

        .resources-hero {
          background: linear-gradient(135deg, var(--brand-navy) 0%, #152C5B 100%);
          padding: 100px 0 120px 0;
        }

        .badge-pill {
          background: rgba(54, 209, 196, 0.2);
          color: var(--brand-teal);
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          display: inline-block;
        }

        .text-orange { color: var(--brand-orange); }

        /* Card Styling */
        .resource-card {
          background: white;
          border: none;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 4px solid transparent;
        }

        .resource-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-bottom: 4px solid var(--brand-teal);
        }

        .icon-box {
          width: 50px;
          height: 50px;
          background: rgba(54, 209, 196, 0.1);
          color: var(--brand-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.2rem;
        }

        .resource-title {
          color: var(--brand-navy);
          font-weight: 700;
          line-height: 1.4;
        }

        .resource-desc {
          line-height: 1.6;
        }

        .btn-resource {
          background-color: var(--brand-navy);
          color: white;
          border-radius: 12px;
          transition: 0.3s;
        }

        .btn-resource:hover {
          background-color: var(--brand-orange);
          color: white;
          transform: scale(1.02);
        }

        .btn-disabled {
          background-color: #E2E8F0;
          color: #94A3B8;
          border: none;
          border-radius: 12px;
        }

        .alert-custom {
          background: white;
          border-left: 5px solid #F42F3F;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        /* Modern Spacing */
        .mt-n5 { margin-top: -5rem !important; }

        @media (max-width: 991.98px) {
          .display-4 { font-size: 2.5rem; }
          .mt-n5 { margin-top: -3rem !important; }
        }
      `}</style>
    </div>
  )
}

export default ResourcesPage