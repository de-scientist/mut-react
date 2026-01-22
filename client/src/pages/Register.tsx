import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { membersAPI, ministriesAPI } from "../services/api";
import ConfirmationModal from "../components/ConfirmationModal";
import "../assets/mut/css/about.css";
import "../styles/adminForms.css";

interface Ministry {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [course, setCourse] = useState("");
  const [ministry1, setMinistry1] = useState("");
  const [ministry2, setMinistry2] = useState("");
  const [message, setMessage] = useState("");
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMinistries, setLoadingMinistries] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    yearOfStudy: false,
    course: false,
    ministry1: false,
    ministry2: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>(null);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const yearOptions = [
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5",
    "Postgraduate",
  ];

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      setLoadingMinistries(true);
      const response = await ministriesAPI.getAll({ active: "true" });
      setMinistries(response.data || response.items || []);
    } catch (err: any) {
      console.error("Failed to load ministries:", err);
    } finally {
      setLoadingMinistries(false);
    }
  };

  const openModal = (message: React.ReactNode) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage(null);
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "yearOfStudy") setYearOfStudy(value);
    if (field === "course") setCourse(value);
    if (field === "ministry1") setMinistry1(value);
    if (field === "ministry2") setMinistry2(value);
    if (field === "message") setMessage(value);

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !emailPattern.test(email.trim()),
      yearOfStudy: !yearOfStudy.trim(),
      course: !course.trim(),
      ministry1: false,
      // Fix: Force the result to be a boolean using !!
      ministry2: !!(ministry2 && ministry2 === ministry1),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      if (newErrors.ministry2) {
        setError("Please select different ministries");
      } else {
        setError("Please fill in all required fields correctly");
      }
      return;
    }

    try {
      setLoading(true);
      await membersAPI.register({
        name: name.trim(),
        email: email.trim(),
        yearOfStudy: yearOfStudy.trim(),
        course: course.trim(),
        ministry1: ministry1 || undefined,
        ministry2: ministry2 || undefined,
        message: message.trim() || undefined,
      });

      openModal(
        <div>
          <p className="mb-3">
            <strong>Member Registration Submitted!</strong>
          </p>
          <p>
            Thank you for registering as a member of MUTCU! Your registration
            has been received and is pending review. We will contact you soon
            via email.
          </p>
        </div>,
      );

      // Reset form
      setName("");
      setEmail("");
      setYearOfStudy("");
      setCourse("");
      setMinistry1("");
      setMinistry2("");
      setMessage("");
      setErrors({
        name: false,
        email: false,
        yearOfStudy: false,
        course: false,
        ministry1: false,
        ministry2: false,
      });
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      openModal(
        <div>
          <p className="text-danger mb-0">{errorMessage}</p>
        </div>,
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter out selected ministry1 from ministry2 options
  const availableMinistries2 = ministries.filter((m) => m.slug !== ministry1);

  return (
    <div
      className="register-page min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card border-0 shadow-lg admin-form-container">
              <div className="card-header text-center">
                <h2 className="mb-0">
                  <i className="fas fa-user-check me-2"></i>
                  Member Registration
                </h2>
                <p className="text-muted mb-0 mt-2 small">
                  Join MUTCU as a Member
                </p>
              </div>
              <div className="card-body p-4">
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                    <button
                      type="button"
                      title="btn"
                      className="btn-close"
                      onClick={() => setError(null)}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control${errors.name ? " is-invalid" : ""}`}
                        value={name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          Please enter your name.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control${errors.email ? " is-invalid" : ""}`}
                        value={email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          Please enter a valid email address.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Year of Study <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select${errors.yearOfStudy ? " is-invalid" : ""}`}
                        value={yearOfStudy}
                        title="yearOfStudy"
                        onChange={(e) =>
                          handleChange("yearOfStudy", e.target.value)
                        }
                        required
                      >
                        <option value="">Select Year of Study</option>
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.yearOfStudy && (
                        <div className="invalid-feedback">
                          Please select your year of study.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Course <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control${errors.course ? " is-invalid" : ""}`}
                        value={course}
                        onChange={(e) => handleChange("course", e.target.value)}
                        placeholder="e.g., Computer Science, Engineering"
                        required
                      />
                      {errors.course && (
                        <div className="invalid-feedback">
                          Please enter your course.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Ministry (First Choice){" "}
                        <span className="text-muted small">(Optional)</span>
                      </label>
                      <select
                        className="form-select"
                        value={ministry1}
                        title="min1"
                        onChange={(e) =>
                          handleChange("ministry1", e.target.value)
                        }
                        disabled={loadingMinistries}
                      >
                        <option value="">Select a ministry (optional)</option>
                        {ministries.map((ministry) => (
                          <option key={ministry.id} value={ministry.slug}>
                            {ministry.name}
                          </option>
                        ))}
                      </select>
                      {loadingMinistries && (
                        <small className="form-text text-muted">
                          Loading ministries...
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Ministry (Second Choice){" "}
                        <span className="text-muted small">(Optional)</span>
                      </label>
                      <select
                        className={`form-select${errors.ministry2 ? " is-invalid" : ""}`}
                        value={ministry2}
                        title="min2"
                        onChange={(e) =>
                          handleChange("ministry2", e.target.value)
                        }
                        disabled={loadingMinistries || !ministry1}
                      >
                        <option value="">
                          Select a second ministry (optional)
                        </option>
                        {availableMinistries2.map((ministry) => (
                          <option key={ministry.id} value={ministry.slug}>
                            {ministry.name}
                          </option>
                        ))}
                      </select>
                      {errors.ministry2 && (
                        <div className="invalid-feedback">
                          Please select a different ministry.
                        </div>
                      )}
                      {!ministry1 && (
                        <small className="form-text text-muted">
                          Select a first ministry to enable this field
                        </small>
                      )}
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">
                        Additional Message{" "}
                        <span className="text-muted small">(Optional)</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Share any additional information you'd like us to know..."
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading || loadingMinistries}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting Registration...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Submit Registration
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <p className="text-muted mb-0 small">
                      This is a member registration form. For admin access,
                      please{" "}
                      <Link
                        to="/admin/login"
                        className="text-primary text-decoration-none"
                      >
                        contact an administrator
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage ?? ""}
        onClose={closeModal}
      />
    </div>
  );
};

export default Register;
