import type { ReactNode } from "react";
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
  autoCloseTime?: number; // milliseconds, 0 = no auto close
}

const SuccessModal = ({
  isOpen,
  title = "Success!",
  message,
  onClose,
  autoCloseTime = 7000,
}: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseTime > 0) {
      const timer = setTimeout(onClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseTime, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
          <div className="modal-content rounded-3 shadow-lg border-0">
            <div
              className="modal-header border-0 rounded-top-3 d-flex align-items-start"
              style={{
                backgroundColor: "#e6f9f0",
                borderBottom: "2px solid #b3e5db",
                padding: "1.5rem",
              }}
            >
              <div className="d-flex align-items-start gap-3 flex-grow-1">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#c8f0e6",
                    marginTop: "2px",
                  }}
                >
                  <i
                    className="fas fa-check-circle"
                    style={{ fontSize: "24px", color: "#28a745" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <h5 className="modal-title fw-bold text-dark mb-0">{title}</h5>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                style={{ marginTop: "-2px" }}
              />
            </div>

            <div className="modal-body p-4" style={{ minHeight: "100px", display: "flex", alignItems: "center" }}>
              <div className="text-muted w-100" style={{ lineHeight: "1.6", fontSize: "15px" }}>
                {message}
              </div>
            </div>

            <div
              className="modal-footer border-0 rounded-bottom-3"
              style={{
                backgroundColor: "#f9f9f9",
                padding: "1.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={onClose}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  fontWeight: "500",
                  padding: "0.625rem 2rem",
                  minWidth: "140px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#218838";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#28a745";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <i className="fas fa-check me-2"></i>
                Got It
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
