import type { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger"; // default = blue theme, danger = red theme
  icon?: string; // FontAwesome icon class
}

const ConfirmationModal = ({
  isOpen,
  title = "Confirm Action",
  message,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
  icon,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const isDanger = type === "danger";
  const headerBgColor = isDanger ? "#fee" : "#f0f5ff";
  const headerBorderColor = isDanger ? "#fcc" : "#cce0ff";
  const iconBgColor = isDanger ? "#ffe6e6" : "#e6f0ff";
  const iconColor = isDanger ? "#dc3545" : "#0A1837";
  const confirmBtnClass = isDanger
    ? "btn btn-danger"
    : "btn btn-primary";
  const confirmBtnColor = isDanger ? "#dc3545" : "#0A1837";

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
                backgroundColor: headerBgColor,
                borderBottom: `2px solid ${headerBorderColor}`,
                padding: "1.5rem",
              }}
            >
              <div className="d-flex align-items-start gap-3 flex-grow-1">
                {icon && (
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: iconBgColor,
                      marginTop: "2px",
                    }}
                  >
                    <i
                      className={icon}
                      style={{ fontSize: "24px", color: iconColor }}
                    ></i>
                  </div>
                )}
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
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="btn"
                onClick={onClose}
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  fontWeight: "500",
                  padding: "0.625rem 1.5rem",
                  minWidth: "120px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0e0e0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={confirmBtnClass}
                onClick={handleConfirm}
                style={{
                  backgroundColor: confirmBtnColor,
                  color: "white",
                  border: "none",
                  fontWeight: "500",
                  padding: "0.625rem 1.5rem",
                  minWidth: "120px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
