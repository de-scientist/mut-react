/**
 * API Service for connecting React frontend to backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Generic API request function
 */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem('token')

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      const err: any = new Error(data.message || data.error || 'Request failed')
      err.status = response.status
      err.data = data
      throw err
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  register: (userData: { email: string; password: string; name?: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest('/auth/profile'),
}

// Events API
export const eventsAPI = {
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/events${queryString ? `?${queryString}` : ''}`)
  },

  getById: (id: string) => apiRequest(`/events/${id}`),

  create: (eventData: {
    title: string
    description?: string
    date: string
    time?: string
    location?: string
    imageUrl?: string
  }) =>
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  update: (id: string, eventData: Partial<{
    title: string
    description: string
    date: string
    time: string
    location: string
    imageUrl: string
    isActive: boolean
  }>) =>
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),

  delete: (id: string) =>
    apiRequest(`/events/${id}`, {
      method: 'DELETE',
    }),
}

// Ministries API
export const ministriesAPI = {
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/ministries${queryString ? `?${queryString}` : ''}`)
  },

  getBySlug: (slug: string) => apiRequest(`/ministries/${slug}`),

  create: (ministryData: {
    name: string
    description?: string
    icon?: string
    imageUrl?: string
    slug: string
  }) =>
    apiRequest('/ministries', {
      method: 'POST',
      body: JSON.stringify(ministryData),
    }),

  update: (slug: string, ministryData: Partial<{
    name: string
    description: string
    icon: string
    imageUrl: string
    slug: string
    isActive: boolean
  }>) =>
    apiRequest(`/ministries/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(ministryData),
    }),

  delete: (slug: string) =>
    apiRequest(`/ministries/${slug}`, {
      method: 'DELETE',
    }),
}

// Prayer API
export const prayerAPI = {
  submit: (requestData: {
    name?: string
    request: string
    isPublic?: boolean
  }) =>
    apiRequest('/prayer', {
      method: 'POST',
      body: JSON.stringify(requestData),
    }),

  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/prayer${queryString ? `?${queryString}` : ''}`)
  },

  updateStatus: (id: string, status: string) =>
    apiRequest(`/prayer/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// Contact API
export const contactAPI = {
  submit: (contactData: {
    name: string
    email: string
    subject: string
    message: string
  }) =>
    apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),

  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/contact${queryString ? `?${queryString}` : ''}`)
  },

  updateStatus: (id: string, status: string) =>
    apiRequest(`/contact/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string) =>
    apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  unsubscribe: (email: string) =>
    apiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/newsletter${queryString ? `?${queryString}` : ''}`)
  },
}

// Admin API
export const adminAPI = {
  getDashboardStats: () => apiRequest('/admin/dashboard'),
}

// Users API (Admin only)
export const usersAPI = {
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/users${queryString ? `?${queryString}` : ''}`)
  },

  getById: (id: string) => apiRequest(`/users/${id}`),

  update: (id: string, userData: Partial<{
    name: string
    role: string
    isActive: boolean
    password: string
  }>) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  deactivate: (id: string) =>
    apiRequest(`/users/${id}/deactivate`, {
      method: 'PATCH',
    }),
}


// Members API
export const membersAPI = {
  register: (memberData: {
    name: string
    email: string
    yearOfStudy: string
    course: string
    ministry1?: string
    ministry2?: string
    message?: string
  }) =>
    apiRequest('/members/register', {
      method: 'POST',
      body: JSON.stringify(memberData),
    }),

  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/members${queryString ? `?${queryString}` : ''}`)
  },

  updateStatus: (id: string, status: string) =>
    apiRequest(`/members/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

// Resources API
export const resourcesAPI = {
  // Public resources (client-facing)
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/resources${queryString ? `?${queryString}` : ''}`)
  },

  // Admin: get all resources
  adminGetAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/resources/admin${queryString ? `?${queryString}` : ''}`)
  },

  // Admin: create resource
  create: (resourceData: {
    title: string
    description?: string
    url?: string
    type?: string
    imageUrl?: string
    isActive?: boolean
  }) =>
    apiRequest('/resources/admin', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    }),

  // Admin: update resource
  update: (
    id: string,
    resourceData: {
      title?: string
      description?: string
      url?: string
      type?: string
      imageUrl?: string
      isActive?: boolean
    }
  ) =>
    apiRequest(`/resources/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(resourceData),
    }),

  // Admin: toggle visibility
  toggle: (id: string) =>
    apiRequest(`/resources/admin/${id}/toggle`, {
      method: 'PATCH',
    }),

  // Admin: delete resource
  delete: (id: string) =>
    apiRequest(`/resources/admin/${id}`, {
      method: 'DELETE',
    }),
}

// Media API
export const mediaAPI = {
  getAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/media/admin${queryString ? `?${queryString}` : ''}`)
  },

  adminGetAll: (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/media/admin${queryString ? `?${queryString}` : ''}`)
  },

  create: (mediaData: {
    title: string
    description?: string
    category?: string
    imageUrl: string
    isActive: boolean
  }) =>
    apiRequest('/media/admin', {
      method: 'POST',
      body: JSON.stringify(mediaData),
    }),

  update: (id: string, mediaData: any) =>
    apiRequest(`/media/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mediaData),
    }),

  toggle: (id: string) =>
    apiRequest(`/media/admin/${id}/toggle`, {
      method: 'PATCH',
    }),

  delete: (id: string) =>
    apiRequest(`/media/admin/${id}`, {
      method: 'DELETE',
    }),
}



export default {
  auth: authAPI,
  events: eventsAPI,
  ministries: ministriesAPI,
  prayer: prayerAPI,
  contact: contactAPI,
  newsletter: newsletterAPI,
  admin: adminAPI,
  users: usersAPI,
  resources: resourcesAPI,
  members: membersAPI,
}


