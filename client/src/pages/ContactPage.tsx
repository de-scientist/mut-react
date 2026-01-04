import { FormEvent, useState } from 'react'
import '../assets/mut/css/contact.css'
import '../styles/adminForms.css'
import ConfirmationModal from '../components/ConfirmationModal'
import { contactAPI } from '../services/api'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState<React.ReactNode>(null)

  const openModal = (message: React.ReactNode) => {
    setModalMessage(message)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMessage(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !emailPattern.test(formData.email.trim()),
      subject: !formData.subject.trim(),
      message: !formData.message.trim(),
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    try {
      // Submit to backend
      await contactAPI.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })

      openModal(
        <p>
          Thank you for contacting us! We&apos;ll get back to you soon. Have a blessed time ahead.
        </p>,
      )

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setErrors({
        name: false,
        email: false,
        subject: false,
        message: false,
      })
    } catch (error: any) {
      console.error('Contact form error:', error)
      const errorMessage = error?.message || error?.data?.message || 'Sorry, there was an error submitting your message. Please try again later.'
      openModal(
        <p>
          {errorMessage}
        </p>,
      )
    }
  }

  return (
    <div className="contact-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church3.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Contact Us</h1>
          <p className="lead">We&apos;d love to hear from you!</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="section-title text-center mb-5">Get In Touch</h2>
              <div className="row mb-5">
                <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                  <div className="contact-info-card text-center p-4 rounded-3 shadow-sm h-100">
                    <i className="fas fa-map-marker-alt feature-icon mb-3" />
                    <h4>Location</h4>
                    <p>Murang&apos;a University of Technology, Murang&apos;a, Kenya</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                  <div className="contact-info-card text-center p-4 rounded-3 shadow-sm h-100">
                    <i className="fas fa-phone feature-icon mb-3" />
                    <h4>Phone</h4>
                    <p>+254 712 345 678</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                  <div className="contact-info-card text-center p-4 rounded-3 shadow-sm h-100">
                    <i className="fas fa-envelope feature-icon mb-3" />
                    <h4>Email</h4>
                    <p>info@mutcu.ac.ke</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-lg admin-form-container" data-aos="fade-up" data-aos-delay="400">
                <div className="card-header">
                  <h3 className="mb-0">Send Us a Message</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className={`form-control${errors.name ? ' is-invalid' : ''}`}
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        {errors.name && <div className="invalid-feedback">Please enter your name.</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className={`form-control${errors.email ? ' is-invalid' : ''}`}
                          id="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {errors.email && <div className="invalid-feedback">Please enter a valid email address.</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          className={`form-control${errors.subject ? ' is-invalid' : ''}`}
                          id="subject"
                          name="subject"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                        {errors.subject && <div className="invalid-feedback">Please enter a subject.</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="message" className="form-label">
                          Message
                        </label>
                        <textarea
                          className={`form-control${errors.message ? ' is-invalid' : ''}`}
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Share your message here..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        {errors.message && <div className="invalid-feedback">Please enter your message.</div>}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-4 flex-column flex-md-row">
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-paper-plane me-2" />
                        Send Message
                      </button>
                      <div className="text-center text-md-start mt-2 mt-md-0 d-flex align-items-center justify-content-center">
                        <span className="text-muted me-2">New here?</span>
                        <a href="/register" className="btn btn-link p-0">
                          Join Us
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConfirmationModal isOpen={isModalOpen} message={modalMessage ?? ''} onClose={closeModal} />
    </div>
  )
}

export default ContactPage
