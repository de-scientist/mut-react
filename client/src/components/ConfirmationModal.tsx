import type { ReactNode } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  title?: string
  message: ReactNode
  onClose: () => void
}

const ConfirmationModal = ({ isOpen, title = 'Thank You!', message, onClose }: ConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3 shadow-lg">
            <div className="modal-header bg-primary-dark text-white border-0 rounded-top-3">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose} />
            </div>
            <div className="modal-body p-4 text-center">
              <i className="fas fa-check-circle text-success fa-4x mb-3 animate-pop-in" />
              <div className="lead">{message}</div>
            </div>
            <div className="modal-footer border-0 rounded-bottom-3">
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal
