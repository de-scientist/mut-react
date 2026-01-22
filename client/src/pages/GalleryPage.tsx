import { useState, useCallback, useEffect } from "react";

type Img = { src: string; alt?: string };

const images: Img[] = [
  { src: "/assets/images/church1.jpg", alt: "Worship" },
  { src: "/assets/images/church2.jpg", alt: "Congregation" },
  { src: "/assets/images/church3.jpg", alt: "Choir" },
  { src: "/assets/images/music1.jpg", alt: "Music Ministry" },
  { src: "/assets/images/Dance1.jpg", alt: "Praise Fest" },
  { src: "/assets/images/dance3.jpg", alt: "Creative Arts" },
  { src: "/assets/images/drama2.JPG", alt: "Drama" },
  { src: "/assets/images/film1.jpg", alt: "Film" },
  { src: "/assets/images/models1.JPG", alt: "Models" },
  { src: "/assets/images/play.jpg", alt: "Play" },
  { src: "/assets/images/mbbc1.jpg", alt: "Technical" },
  { src: "/assets/images/prayer1.jpg", alt: "Prayer" },
];

const GalleryPage = () => {
  const [index, setIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const openAt = (i: number) => setIndex(i);
  const close = () => setIndex(null);

  const showNext = useCallback(() => {
    setIndex((cur) => (cur === null ? 0 : (cur + 1) % images.length));
  }, []);

  const showPrev = useCallback(() => {
    setIndex((cur) =>
      cur === null
        ? images.length - 1
        : (cur - 1 + images.length) % images.length,
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, showNext, showPrev]);

  const downloadAll = async () => {
    setDownloading(true);
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const a = document.createElement("a");
      a.href = img.src;
      a.download = img.src.split("/").pop() || `image-${i + 1}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await new Promise((r) => setTimeout(r, 400));
    }
    setDownloading(false);
  };

  return (
    <div className="gallery-wrapper">
      {/* HEADER SECTION */}
      <section className="gallery-header py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <span className="badge-pill mb-2">Moments of Grace</span>
              <h1 className="display-4 fw-bold text-navy">
                MUTCU <span className="text-teal">Gallery</span>
              </h1>
              <p className="lead text-muted">
                A visual journey of our fellowships, outreach, and ministry
                activities.
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                className={`btn btn-download-all btn-lg px-4 py-3 rounded-pill shadow-sm ${downloading ? "disabled" : ""}`}
                onClick={downloadAll}
              >
                {downloading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Downloading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-download-alt me-2"></i>Download
                    All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <div className="container mb-5">
        <div className="row g-4">
          {images.map((img, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={img.src}>
              <div className="gallery-item" onClick={() => openAt(i)}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <span className="overlay-title">{img.alt}</span>
                    <a
                      href={img.src}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="btn-item-download"
                    >
                      <i className="fas fa-arrow-down"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {index !== null && (
        <div className="lightbox-container" onClick={close}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="lightbox-image"
            />

            <div className="lightbox-controls">
              <button className="ctrl-btn" onClick={showPrev}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="ctrl-btn" onClick={showNext}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="lightbox-info">
              <h5 className="mb-0 text-white">{images[index].alt}</h5>
              <p className="text-white-50 small mb-0">
                Image {index + 1} of {images.length}
              </p>
            </div>

            <div className="lightbox-top-actions">
              <a href={images[index].src} download className="action-btn me-3">
                <i className="fas fa-download"></i>
              </a>
              <button className="action-btn" onClick={close}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --brand-navy: #0A1837;
          --brand-teal: #36D1C4;
          --brand-orange: #FF9800;
        }

        .gallery-wrapper { background-color: #fcfcfc; min-height: 100vh; }
        
        .gallery-header { 
          background: linear-gradient(to bottom, #eff6ff 0%, #ffffff 100%);
          border-bottom: 1px solid #eef2f7;
        }

        .text-navy { color: var(--brand-navy); }
        .text-teal { color: var(--brand-teal); }
        
        .badge-pill {
          background: rgba(54, 209, 196, 0.1);
          color: var(--brand-teal);
          padding: 6px 14px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          display: inline-block;
        }

        .btn-download-all {
          background-color: var(--brand-navy);
          color: white;
          border: none;
          transition: all 0.3s ease;
        }
        .btn-download-all:hover {
          background-color: var(--brand-teal);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(54, 209, 196, 0.3) !important;
        }

        /* Gallery Item Card */
        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1/1;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .gallery-item:hover .gallery-img {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,24,55,0.8) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .overlay-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .overlay-title {
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .btn-item-download {
          width: 35px;
          height: 35px;
          background: var(--brand-teal);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .btn-item-download:hover { transform: scale(1.1); color: white; }

        /* Lightbox Styles */
        .lightbox-container {
          position: fixed;
          inset: 0;
          background: rgba(10, 24, 55, 0.96);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .lightbox-content {
          position: relative;
          width: 90%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .lightbox-controls {
          position: absolute;
          width: 110%;
          display: flex;
          justify-content: space-between;
          top: 50%;
          transform: translateY(-50%);
        }

        .ctrl-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .ctrl-btn:hover { background: var(--brand-teal); }

        .lightbox-info {
          margin-top: 1.5rem;
          text-align: center;
        }

        .lightbox-top-actions {
          position: absolute;
          top: -50px;
          right: 0;
        }

        .action-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
          transition: 0.3s;
          text-decoration: none;
        }
        .action-btn:hover { opacity: 1; color: var(--brand-teal); }

        @media (max-width: 768px) {
          .lightbox-controls { width: 100%; position: static; transform: none; margin-top: 1rem; }
          .lightbox-top-actions { top: -40px; }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
