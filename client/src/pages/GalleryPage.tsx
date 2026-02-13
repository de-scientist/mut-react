import { useState, useCallback, useEffect } from "react";

type Img = { src: string; alt?: string };

type PhotoAlbum = {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
};

const photoAlbums: PhotoAlbum[] = [
  {
    id: "1",
    title: "BEST-P SUNDAY",
    description: "Photos from BEST-P Sunday services",
    url: "https://photos.app.goo.gl/RRzuYzqtNNggSyM39",
    icon: "fa-images",
  },
  {
    id: "2",
    title: "Crusade Photos",
    description: "Moments from our crusade events",
    url: "https://photos.app.goo.gl/u2vJUfogQxHdhjJ5A",
    icon: "fa-images",
  },
  {
    id: "3",
    title: "Sunday Service",
    description: "Weekly Sunday worship celebrations",
    url: "https://photos.app.goo.gl/8ME7ggMzPEkoo4qDA",
    icon: "fa-images",
  },
  {
    id: "4",
    title: "Bible Study Sunday Photos",
    description: "Photos from our Bible study sessions",
    url: "https://photos.app.goo.gl/yXfUm1pKUNXrdAT66",
    icon: "fa-images",
  },
  {
    id: "5",
    title: "Chastity Walk",
    description: "Moments from our chastity awareness walk",
    url: "https://photos.google.com/share/AF1QipMneYFrl9yQJ5cPPamn1sRx4_6sVxQkpB-jxTz-K6P0wWPfVbNks7TIZThgaJ3jjw?key=MWdRNzlGbEdIWUZxUF9LZjdMWWJfZ0toZVV2SHRR",
    icon: "fa-images",
  },
];

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

      {/* PHOTO ALBUMS SECTION */}
      <section className="container mb-5">
        <h2 className="display-5 fw-bold text-navy mb-4">
          Photo <span className="text-teal">Albums</span>
        </h2>
        <div className="row g-4 mb-5">
          {photoAlbums.map((album) => (
            <div className="col-md-6 col-lg-4" key={album.id}>
              <a
                href={album.url}
                target="_blank"
                rel="noreferrer noopener"
                className="album-card-link text-decoration-none"
              >
                <div className="album-card h-100">
                  <div className="album-icon-container">
                    <i className={`fas ${album.icon || "fa-folder"} fa-3x`}></i>
                  </div>
                  <div className="album-info p-4">
                    <h5 className="album-title mb-2">{album.title}</h5>
                    {album.description && (
                      <p className="album-desc text-muted small mb-0">
                        {album.description}
                      </p>
                    )}
                    <div className="mt-3 pt-3 border-top">
                      <small className="text-teal fw-600">
                        <i className="fas fa-external-link-alt me-2"></i>
                        View on Google Photos
                      </small>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="divider mb-5"></div>

        <h2 className="display-5 fw-bold text-navy mb-4">
          Photo <span className="text-teal">Gallery</span>
        </h2>
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
        
        /* Photo Album Card Styles */
        .album-card-link {
          display: block;
        }

        .album-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          border-bottom: 4px solid transparent;
          display: flex;
          flex-direction: column;
        }

        .album-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(54, 209, 196, 0.2);
          border-bottom: 4px solid var(--brand-teal);
        }

        .album-icon-container {
          background: linear-gradient(135deg, #0A1837 0%, #152C5B 100%);
          padding: 3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-teal);
          transition: all 0.3s ease;
        }

        .album-card:hover .album-icon-container {
          background: linear-gradient(135deg, var(--brand-teal) 0%, #36D1C4 100%);
          color: white;
          transform: scale(1.05);
        }

        .album-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .album-title {
          color: var(--brand-navy);
          font-weight: 700;
          line-height: 1.4;
        }

        .album-desc {
          line-height: 1.5;
        }
        
        .divider {
          height: 2px;
          background: linear-gradient(to right, transparent, #ddd, transparent);
          margin-top: 3rem;
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
