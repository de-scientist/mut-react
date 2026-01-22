import type { ReactNode } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  title?: string
  message: ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
}

const ConfirmationModal = ({ 
  isOpen, 
  title = 'Confirm Action', 
  message, 
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'btn-danger'
}: ConfirmationModalProps) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    } else {
      onClose()
    }
  }

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
            <div className="modal-header bg-white border-0 rounded-top-3">
              <h5 className="modal-title fw-bold text-dark">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
            </div>
            <div className="modal-body p-4">
              <div className="text-muted">{message}</div>
            </div>
            <div className="modal-footer border-0 rounded-bottom-3">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {cancelText}
              </button>
              <button type="button" className={`btn ${confirmButtonClass}`} onClick={handleConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal
