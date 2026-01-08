/**
 * Cloudinary Upload Service
 * Handles image uploads to Cloudinary using unsigned upload preset
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dwbqjzdvb'
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'blogs_images'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export interface CloudinaryUploadResponse {
  public_id: string
  secure_url: string
  url: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
}

export interface CloudinaryUploadError {
  error: {
    message: string
  }
}

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @param onProgress - Optional progress callback
 * @returns Promise with the upload response containing the image URL
 */
export const uploadImageToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResponse> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 10MB')
  }

  // Create form data
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  try {
    // Create XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest()

    const uploadPromise = new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText) as CloudinaryUploadResponse
            resolve(response)
          } catch (error) {
            reject(new Error('Failed to parse upload response'))
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText) as CloudinaryUploadError
            reject(new Error(errorResponse.error?.message || 'Upload failed'))
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was cancelled'))
      })

      xhr.open('POST', CLOUDINARY_UPLOAD_URL)
      xhr.send(formData)
    })

    return await uploadPromise
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Unknown error during upload')
  }
}

/**
 * Get the secure URL from Cloudinary response
 * @param response - Cloudinary upload response
 * @returns The secure URL of the uploaded image
 */
export const getImageUrl = (response: CloudinaryUploadResponse): string => {
  return response.secure_url || response.url
}



