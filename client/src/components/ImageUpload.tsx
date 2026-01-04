import { useState, useRef, ChangeEvent } from 'react'
import { uploadImageToCloudinary, getImageUrl, type CloudinaryUploadResponse } from '../services/cloudinary'

interface ImageUploadProps {
  value?: string
  onChange: (imageUrl: string) => void
  label?: string
  required?: boolean
  className?: string
  previewClassName?: string
  maxSizeMB?: number
  acceptedFormats?: string[]
}

const ImageUpload = ({
  value,
  onChange,
  label = 'Image',
  required = false,
  className = '',
  previewClassName = '',
  maxSizeMB = 10,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update preview when value changes externally
  useState(() => {
    if (value) {
      setPreview(value)
    }
  })

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      setError(`Invalid file type. Accepted formats: ${acceptedFormats.join(', ')}`)
      return
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Clear previous error
    setError(null)
    setUploading(true)
    setUploadProgress(0)

    // Create local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const response = await uploadImageToCloudinary(file, (progress) => {
        setUploadProgress(progress)
      })

      const imageUrl = getImageUrl(response)
      onChange(imageUrl)
      setPreview(imageUrl)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
      setPreview(null)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemove = () => {
    onChange('')
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`image-upload-container ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="image-upload-wrapper">
        {preview ? (
          <div className="image-preview-container">
            <div className="image-preview-wrapper">
              <img
                src={preview}
                alt="Preview"
                className={`image-preview ${previewClassName}`}
                onError={() => {
                  setError('Failed to load image preview')
                  setPreview(null)
                }}
              />
              {uploading && (
                <div className="upload-overlay">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Uploading...</span>
                  </div>
                  <div className="mt-2 text-light">{uploadProgress}%</div>
                </div>
              )}
            </div>
            <div className="image-actions">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={handleClick}
                disabled={uploading}
              >
                <i className="fas fa-edit me-1" />
                Change Image
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={handleRemove}
                disabled={uploading}
              >
                <i className="fas fa-trash me-1" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="image-upload-placeholder" onClick={handleClick}>
            <div className="upload-icon">
              <i className="fas fa-cloud-upload-alt fa-3x text-muted" />
            </div>
            <p className="text-muted mb-2">
              {uploading ? `Uploading... ${uploadProgress}%` : 'Click to upload image'}
            </p>
            <p className="text-muted small">
              Accepted: JPEG, PNG, WebP, GIF (Max {maxSizeMB}MB)
            </p>
            {uploading && (
              <div className="progress mt-2" style={{ width: '100%' }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {uploadProgress}%
                </div>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="d-none"
          disabled={uploading}
        />
      </div>

      {error && (
        <div className="alert alert-danger mt-2 py-2" role="alert">
          <i className="fas fa-exclamation-circle me-2" />
          {error}
        </div>
      )}

      {value && !preview && (
        <div className="mt-2">
          <input
            type="url"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or enter image URL manually"
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload

