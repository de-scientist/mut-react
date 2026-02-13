import { useEffect, useState } from "react";
import { resourcesAPI } from "../services/api";

type ResourceItem = {
  id?: string;
  title: string;
  description?: string;
  url?: string;
  type?: "audio" | "pdf" | "video" | "link"; // Added for better UX icons
};

const fallbackResources: ResourceItem[] = [
  {
    id: "1",
    title: "Weekly Sermon 2025-01-01",
    description: "Audio download of last Sunday sermon regarding stewardship.",
    url: "#",
    type: "audio",
  },
  {
    id: "2",
    title: "Daily Devotional - January",
    description: "A month of devotionals to keep you grounded in the Word.",
    url: "#",
    type: "pdf",
  },
];

type VideoItem = {
  id: string;
  title: string;
  description: string;
  url: string;
};

const featuredVideos: VideoItem[] = [
  {
    id: "1",
    title: "Unlocking the Secrets to Academic Excellence",
    description: "Learn the proven strategies and spiritual foundations for achieving academic success.",
    url: "https://youtube.com/watch?v=brvyKkNHIps",
  },
  {
    id: "2",
    title: "Purpose",
    description: "A creative experience exploring God's divine purpose for your life and ministry.",
    url: "https://youtu.be/qqTkS5KQDyA",
  },
  {
    id: "3",
    title: "Pastor John Ng'ang'a on Purposeful Life",
    description: "Inspiring insights on living a life aligned with God's plan and calling.",
    url: "https://youtu.be/fbstJHBDGrc",
  },
  {
    id: "4",
    title: "Best-P Class on Homiletics",
    description: "Master the art of preaching and Biblical communication through this comprehensive guide.",
    url: "https://youtu.be/uSIp_D1Vpcs",
  },
];

const ResourcesPage = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Resources | MUTCU";
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const res = await resourcesAPI.getAll();
        const data = res.data || res;
        if (mounted && Array.isArray(data)) {
          setResources(data);
        } else if (mounted && data && data.items) {
          setResources(data.items);
        } else if (mounted) {
          setResources(fallbackResources);
        }
      } catch (err: any) {
        console.error("Resources fetch failed, using fallback:", err);
        setResources(fallbackResources);
        setError(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Video preview state and helpers
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    // common YouTube URL patterns: watch?v=ID, youtu.be/ID, /embed/ID
    const idMatch = url.match(/(?:youtube\.com\/(?:.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (idMatch && idMatch[1]) return idMatch[1];
    try {
      const u = new URL(url);
      return u.searchParams.get("v");
    } catch (e) {
      return null;
    }
  };

  const getYouTubeThumb = (url?: string) => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  };

  // Helper to determine icon based on title or type
  const getResourceIcon = (item: ResourceItem) => {
    const title = item.title.toLowerCase();
    if (title.includes("sermon") || title.includes("audio"))
      return "fa-headphones";
    if (
      title.includes("devotional") ||
      title.includes("pdf") ||
      title.includes("guide")
    )
      return "fa-file-pdf";
    return "fa-cloud-download-alt";
  };

  return (
    <div className="resources-page-wrapper">
      {/* HERO SECTION */}
      <section className="resources-hero">
        <div className="container py-5 text-center">
          <span className="badge-pill mb-3">Library & Media</span>
          <h1 className="display-4 fw-bold text-white mb-3">
            Spiritual <span className="text-orange">Resources</span>
          </h1>
          <p className="lead text-white-50 mx-auto col-lg-7">
            Equipping the saints with sermons, devotionals, and study materials
            to foster growth in Christ.
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
          <div
            className="alert alert-custom d-flex align-items-center mb-5"
            role="alert"
          >
            <i className="fas fa-exclamation-circle me-3"></i>
            <div>{error}</div>
          </div>
        )}

        {!loading && (
          <>
            {/* FEATURED VIDEOS SECTION */}
            <div className="mb-5 pb-4">
              <h2 className="display-5 fw-bold text-navy mb-4">
                Featured <span className="text-orange">Videos</span>
              </h2>
              <div className="row g-4">
                {featuredVideos.map((video) => (
                  <div className="col-md-6 col-lg-3" key={video.id}>
                    <div
                      className="video-card h-100"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        const id = getYouTubeId(video.url);
                        if (id) setPreviewVideoId(id);
                        else window.open(video.url, "_blank");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          const id = getYouTubeId(video.url);
                          if (id) setPreviewVideoId(id);
                          else window.open(video.url, "_blank");
                        }
                      }}
                    >
                      <div className="video-thumbnail">
                        {getYouTubeThumb(video.url) ? (
                          <img
                            src={getYouTubeThumb(video.url)!}
                            alt={video.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <i className="fas fa-play-circle"></i>
                        )}
                      </div>
                      <div className="card-body p-3">
                        <h6 className="video-title mb-2">{video.title}</h6>
                        <p className="video-desc text-muted small mb-0">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESOURCES SECTION */}
            <div className="border-top pt-5 mt-5">
              <h2 className="display-5 fw-bold text-navy mb-4">
                Additional <span className="text-orange">Resources</span>
              </h2>
            </div>

            <div className="row g-4">
              {resources.length === 0 ? (
              <div className="col-12 text-center py-5 shadow-sm bg-white rounded-4">
                <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                <p className="text-muted fw-medium">
                  No resources are currently available. Check back later!
                </p>
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
                            <i className="fas fa-download me-2"></i> Access
                            Resource
                          </a>
                        ) : (
                          <button
                            className="btn btn-disabled w-100 py-2"
                            disabled
                          >
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
          </>
        )}
      </section>

      {/* Video preview modal */}
      {previewVideoId && (
        <div className="video-modal-overlay" onClick={() => setPreviewVideoId(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={() => setPreviewVideoId(null)}>×</button>
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${previewVideoId}?autoplay=1&rel=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video preview"
            />
          </div>
        </div>
      )}

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
          background: none;
          color: var(--brand-teal);
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 400;
          font-size: 0.7rem;
          text-transform: uppercase;
          display: inline-block;
          border-left: 3px solid var(--brand-teal);
          border-right: 3px solid var(--brand-teal);
          letter-spacing: 2px;
          opacity: 0.7;
        }

        .text-orange { color: var(--brand-orange); }

        .text-navy { color: var(--brand-navy); }

        /* Video Card Styling */
        .video-card-link {
          display: block;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 3px solid transparent;
        }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          border-bottom: 3px solid var(--brand-orange);
        }

        .video-thumbnail {
          width: 100%;
          height: 140px;
          background: linear-gradient(135deg, var(--brand-navy) 0%, #152C5B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .video-thumbnail:hover {
          background: linear-gradient(135deg, var(--brand-orange) 0%, #FF7C38 100%);
        }

        .video-thumbnail i {
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .video-thumbnail i {
          opacity: 1;
        }

        .video-title {
          color: var(--brand-navy);
          font-weight: 700;
          line-height: 1.3;
          min-height: 2.6rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .video-desc {
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.5rem;
        }

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
        /* Modal preview styles */
        .video-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index: 1100;
        }
        .video-modal {
          width: min(1000px, 95%);
          background: #000;
          border-radius: 12px;
          padding: 12px;
          position: relative;
        }
        .video-modal .btn-close {
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 1.6rem;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        .video-thumbnail img { display:block; }
      `}</style>
    </div>
  );
};

export default ResourcesPage;
