import { useState, useCallback, useEffect } from 'react'
import '../assets/mut/css/about.css'

type Img = { src: string; alt?: string }

const images: Img[] = [
  { src: '/assets/images/church1.jpg', alt: 'Worship' },
  { src: '/assets/images/church2.jpg', alt: 'Congregation' },
  { src: '/assets/images/church3.jpg', alt: 'Choir' },
  { src: '/assets/images/music1.jpg', alt: 'Music Ministry' },
  { src: '/assets/images/Dance1.jpg', alt: 'Praise Fest' },
  { src: '/assets/images/dance3.jpg', alt: 'Creative Arts' },
  { src: '/assets/images/drama2.JPG', alt: 'Drama' },
  { src: '/assets/images/film1.jpg', alt: 'Film' },
  { src: '/assets/images/models1.JPG', alt: 'Models' },
  { src: '/assets/images/play.jpg', alt: 'Play' },
  { src: '/assets/images/mbbc1.jpg', alt: 'Technical' },
  { src: '/assets/images/prayer1.jpg', alt: 'Prayer' },
]

const GalleryPage = () => {
  const [index, setIndex] = useState<number | null>(null)

  const openAt = (i: number) => setIndex(i)
  const close = () => setIndex(null)

  const showNext = useCallback(() => {
    setIndex((cur) => (cur === null ? 0 : (cur + 1) % images.length))
  }, [])

  const showPrev = useCallback(() => {
    setIndex((cur) => (cur === null ? images.length - 1 : (cur - 1 + images.length) % images.length))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, showNext, showPrev])

  return (
    <div className="gallery-page container py-5">
      <h1 className="mb-4">Gallery</h1>
      <p className="lead mb-4">Images from MUTCU fellowships, events, and outreach activities.</p>

      <div className="row">
        {images.map((img, i) => (
          <div className="col-6 col-sm-4 col-md-3 mb-4" key={img.src}>
            <button
              className="card p-0 border-0 shadow-sm"
              style={{ cursor: 'pointer' }}
              onClick={() => openAt(i)}
              aria-label={`Open image ${i + 1}`}
            >
              <img src={img.src} alt={img.alt || `Image ${i + 1}`} className="img-fluid rounded" />
            </button>
          </div>
        ))}
      </div>

      {index !== null && (
        <div
          className="gallery-lightbox"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: 20,
          }}
          onClick={close}
        >
          <div style={{ maxWidth: '95%', maxHeight: '95%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={images[index].src}
              alt={images[index].alt}
              style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto', borderRadius: 6 }}
            />

            <button
              onClick={close}
              aria-label="Close"
              style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: '#fff', fontSize: 28 }}
            >
              ×
            </button>

            <button
              onClick={showPrev}
              aria-label="Previous"
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 32 }}
            >
              ‹
            </button>

            <button
              onClick={showNext}
              aria-label="Next"
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#fff', fontSize: 32 }}
            >
              ›
            </button>

            <div style={{ color: '#fff', marginTop: 8, textAlign: 'center' }}>{images[index].alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
