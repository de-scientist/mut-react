import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import "../assets/mut/css/index.css";
import ConfirmationModal from "../components/ConfirmationModal";
import { prayerAPI, newsletterAPI } from "../services/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PreviewCard = {
  title: string;
  description: string;
  image: string;
  icon: string; // fontawesome class
  link: string;
  meta?: { label: string; value: string; icon: string }[];
};

const HomePage = () => {
  const [prayerName, setPrayerName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [prayerError, setPrayerError] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<ReactNode>(null);
  const [pendingPrayerSubmission, setPendingPrayerSubmission] = useState(false);

  const openModal = (message: ReactNode) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage(null);
    setPendingPrayerSubmission(false);
  };

  const handlePrayerSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!prayerRequest.trim()) {
      setPrayerError(true);
      return;
    }

    setPrayerError(false);
    setPendingPrayerSubmission(true);

    openModal(<p>Are you sure you want to submit this prayer request?</p>);
  };

  const confirmPrayerSubmit = async () => {
    try {
      await prayerAPI.submit({
        name: prayerName || undefined,
        request: prayerRequest,
        isPublic: false,
      });

      openModal(
        <p>
          Thank you for your prayer request! Our Prayer Ministry will intercede
          for you.
        </p>,
      );

      setPrayerName("");
      setPrayerRequest("");
      setPendingPrayerSubmission(false);
    } catch (error) {
      openModal(
        <p>
          Sorry, there was an error submitting your prayer request. Please try
          again later.
        </p>,
      );
      setPendingPrayerSubmission(false);
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailPattern.test(newsletterEmail.trim())) {
      setNewsletterError(true);
      return;
    }

    setNewsletterError(false);

    try {
      await newsletterAPI.subscribe(newsletterEmail.trim());

      openModal(
        <p>
          Thank you for subscribing to our newsletter! You&apos;ll receive our
          latest updates directly in your inbox.
        </p>,
      );

      setNewsletterEmail("");
    } catch (error) {
      openModal(<p>Sorry, there was an error subscribing. Please try again later.</p>);
    }
  };

  // ===== Updated content aligned to Constitution 2025 + Leadership Manual 2025 =====
  const coreValues = useMemo(
    () => [
      {
        title: "Faith",
        icon: "fas fa-cross",
        text:
          "Rooted in the Bible and a personal relationship with Jesus Christ, expressed through prayer, worship, and in-depth Bible study.",
      },
      {
        title: "Love",
        icon: "fas fa-heart",
        text:
          "Demonstrating God’s unconditional love through genuine fellowship and a welcoming heart for all.",
      },
      {
        title: "Hope",
        icon: "fas fa-lightbulb",
        text:
          "Being a source of hope through positive words, encouraging actions, and unwavering faith in uncertain times.",
      },
      {
        title: "Godliness",
        icon: "fas fa-church",
        text:
          "Striving for lives that honour and glorify God in all we do—personally and together as a Union.",
      },
      {
        title: "Accountability",
        icon: "fas fa-user-check",
        text:
          "Walking together in fellowship, support, and solidarity—being answerable to one another in our actions and decisions.",
      },
      {
        title: "Service",
        icon: "fas fa-hand-holding-heart",
        text:
          "Putting our faith into action by serving practical and spiritual needs within the university and beyond.",
      },
    ],
    [],
  );

  const ministriesPreview: PreviewCard[] = useMemo(
    () => [
      {
        title: "Prayer Ministry",
        icon: "fas fa-praying-hands",
        image: "/assets/images/prayer1.jpg",
        description:
          "Leading the Union into a deep culture of prayer—personal devotion, corporate intercession, and spiritual revival.",
        link: "/ministries",
      },
      {
        title: "Music Ministry",
        icon: "fas fa-music",
        image: "/assets/images/music1.jpg",
        description:
          "Ministering worship with excellence through Praise & Worship, Choir, Instrumentalists and the Band.",
        link: "/ministries",
      },
      {
        title: "Missions & Evangelism",
        icon: "fas fa-globe",
        image: "/assets/images/mission1.jpg",
        description:
          "Mobilizing members to proclaim the Gospel in word and deed—on campus and beyond—through evangelism and outreach.",
        link: "/ministries",
      },
      {
        title: "Bible Study & Training",
        icon: "fas fa-book-open",
        image: "/assets/images/bs1.jpg",
        description:
          "Deepening spiritual growth through Bible study, doctrine, trainings, and equipping programs for all members.",
        link: "/ministries",
      },
      {
        title: "Discipleship",
        icon: "fas fa-user-friends",
        image: "/assets/images/church2.jpg",
        description:
          "Nurturing Christ-like maturity through mentorship, follow-up, small groups, and intentional spiritual formation.",
        link: "/ministries",
      },
      {
        title: "Technical & Media",
        icon: "fas fa-photo-video",
        image: "/assets/images/church3.jpg",
        description:
          "Supporting worship and communication through sound, visuals, coverage, design, and digital publicity platforms.",
        link: "/ministries",
      },
      {
        title: "Creative Arts Ministry",
        icon: "fas fa-paint-brush",
        image: "/assets/images/film1.jpg",
        description:
          "Communicating the Gospel creatively through drama, dance, spoken word, and other Christ-centred expressions.",
        link: "/ministries",
      },
    ],
    [],
  );

  // ===== Updated Upcoming Highlights from your attached Sunday + Friday programmes (2026) =====
  const upcomingHighlights: PreviewCard[] = useMemo(
    () => [
      {
        title: "Sunday Service: Defending our Faith",
        icon: "fas fa-shield-alt",
        image: "/assets/images/church1.jpg",
        description:
          "Join us for a powerful Sunday service focused on standing firm and answering for the hope we have in Christ.",
        link: "/events",
        meta: [
          { label: "Date", value: "25 Jan 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Sunday Service", icon: "fas fa-church" },
        ],
      },
      {
        title: "Friday Fellowship: Prayer Kesha",
        icon: "fas fa-moon",
        image: "/assets/images/prayer1.jpg",
        description:
          "A night of prayer, intercession, and spiritual renewal—come labour with us before the Lord.",
        link: "/events",
        meta: [
          { label: "Date", value: "30 Jan 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Friday Fellowship", icon: "fas fa-fire" },
        ],
      },
      {
        title: "Sunday Service: Bible Study Sunday",
        icon: "fas fa-bible",
        image: "/assets/images/bs1.jpg",
        description:
          "A Sunday dedicated to the Word—learning, growing, and being equipped through Scripture.",
        link: "/events",
        meta: [
          { label: "Date", value: "01 Feb 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Sunday Service", icon: "fas fa-church" },
        ],
      },
      {
        title: "Friday Fellowship: Book of Timothy Exposition",
        icon: "fas fa-scroll",
        image: "/assets/images/church2.jpg",
        description:
          "Dig deeper into Scripture through an exposition session on the Book of Timothy.",
        link: "/events",
        meta: [
          { label: "Date", value: "06 Feb 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Friday Fellowship", icon: "fas fa-fire" },
        ],
      },
      {
        title: "Sunday Service: Charity & Compassion",
        icon: "fas fa-hands-helping",
        image: "/assets/images/mission1.jpg",
        description:
          "A Sunday focused on Christ-like compassion—living the Gospel through love, mercy, and practical care.",
        link: "/events",
        meta: [
          { label: "Date", value: "08 Feb 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Sunday Service", icon: "fas fa-church" },
        ],
      },
      {
        title: "Friday Fellowship: Creative Experience",
        icon: "fas fa-theater-masks",
        image: "/assets/images/film1.jpg",
        description:
          "A creativity-filled fellowship night—ministering the Gospel through arts and expression.",
        link: "/events",
        meta: [
          { label: "Date", value: "13 Feb 2026", icon: "far fa-calendar-alt" },
          { label: "Service", value: "Friday Fellowship", icon: "fas fa-fire" },
        ],
      },
    ],
    [],
  );

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="hero-section">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="hero-bg" style={{ backgroundImage: "url('/assets/images/exec.jpg')" }} />
              <div className="hero-overlay" />
              <div className="hero-content text-center text-white" data-aos="fade-up">
                <h1 className="display-3 mb-4">Raising a Christ-like Family</h1>
                <p className="lead mb-5">
                  Equipped in all aspects of life — united as one body, and reaching out to non-believers
                  within our community and beyond.
                </p>
                <div>
                  <Link to="/about" className="btn btn-primary btn-lg me-3">
                    Our Mission <i className="fas fa-bullseye ms-2" />
                  </Link>
                  <Link to="/events" className="btn btn-secondary btn-lg">
                    View Programs <i className="fas fa-calendar-alt ms-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div
                className="hero-bg"
                style={{ backgroundImage: "url('/assets/images/Lumii_20241023_192938507.jpg')" }}
              />
              <div className="hero-overlay" />
              <div className="hero-content text-center text-white" data-aos="fade-up">
                <h1 className="display-3 mb-4">Inspire Love, Hope &amp; Godliness</h1>
                <p className="lead mb-5">
                  Murang&apos;a University of Technology Christian Union — a Christ-centred family for
                  discipleship, evangelism, mission work, and leadership development.
                </p>
                <div>
                  <Link to="/contact" className="btn btn-primary btn-lg me-3">
                    Join Us <i className="fas fa-hand-point-right ms-2" />
                  </Link>
                  <Link to="/resources" className="btn btn-secondary btn-lg">
                    Watch / Listen <i className="fas fa-play-circle ms-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="hero-bg" style={{ backgroundImage: "url('/assets/images/church2.jpg')" }} />
              <div className="hero-overlay" />
              <div className="hero-content text-center text-white" data-aos="fade-up">
                <h1 className="display-3 mb-4">Growing in the Word &amp; Prayer</h1>
                <p className="lead mb-5">
                  Join us for Bible study, prayer meetings, worship services, fellowships, and trainings that
                  build a grounded and fruitful walk with Christ.
                </p>
                <div>
                  <Link to="/resources" className="btn btn-primary btn-lg me-3">
                    Resources <i className="fas fa-book ms-2" />
                  </Link>
                  <Link to="/ministries" className="btn btn-secondary btn-lg">
                    Serve With Us <i className="fas fa-hands-helping ms-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="hero-bg" style={{ backgroundImage: "url('/assets/images/church3.jpg')" }} />
              <div className="hero-overlay" />
              <div className="hero-content text-center text-white" data-aos="fade-up">
                <h1 className="display-3 mb-4">A Model Christian Union</h1>
                <p className="lead mb-5">
                  Cultivating Christ-centeredness among members to positively impact the society.
                </p>
                <div>
                  <Link to="/about" className="btn btn-primary btn-lg me-3">
                    Our Vision <i className="fas fa-eye ms-2" />
                  </Link>
                  <Link to="/gallery" className="btn btn-secondary btn-lg">
                    View Gallery <i className="fas fa-images ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="join-us-cta-section py-5" style={{ backgroundColor: '#ff9700', color: 'white' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8 text-center" data-aos="zoom-in">
              <div className="mb-4">
                <i className="fas fa-user-plus" style={{ fontSize: '4rem', marginBottom: '1rem' }} />
              </div>
              <h2 className="display-5 mb-3" style={{ color: 'white' }}>Ready to Join Us?</h2>
              <p className="lead mb-5" style={{ color: 'rgba(255,255,255,0.95)' }}>
                Become part of the MUTCU family and experience discipleship, fellowship, and spiritual growth.
              </p>
              <Link to="/register" className="btn btn-light btn-lg" style={{ fontWeight: '600', color: '#ff9700' }}>
                Register Now <i className="fas fa-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">About MUTCU</h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            Murang&apos;a University of Technology Christian Union (MUTCU) is a Christ-centred, student-led
            fellowship at MUT, affiliated with FOCUS Kenya. We exist to inspire love, hope, and godliness
            through discipleship, evangelism, mission work, and leadership development.
          </p>

          <div className="row align-items-center">
            <div
              className="col-lg-6 mb-4 mb-lg-0 order-lg-1 order-2"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <h3 className="section-subtitle">Our Mission</h3>
              <p>
                Raising a Christ-like family, equipped in all aspects of life, by encouraging unity as one body
                and reaching out to non-believers within our community and beyond.
              </p>

              <h3 className="section-subtitle mt-4">Our Vision</h3>
              <p>
                To be a model Christian union that cultivates Christ-centeredness among members to positively
                impact the society.
              </p>

              <Link to="/about" className="btn btn-primary mt-3">
                Learn More About Us <i className="fas fa-info-circle ms-2" />
              </Link>
            </div>

            <div
              className="col-lg-6 order-lg-2 order-1 text-center"
              data-aos="fade-left"
              data-aos-delay="150"
            >
              <img
                src="/assets/images/prayer1.jpg"
                alt="MUTCU Community"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center" data-aos="fade-up" data-aos-delay="200">
              <h3 className="section-subtitle">Doctrinal Basis</h3>
              <p className="text-muted">
                MUTCU is founded on the fundamental truths of Christianity: the unity of the Father, Son, and
                Holy Spirit; the sovereignty of God in creation and redemption; the divine inspiration and
                supreme authority of Scripture; the universal sinfulness of humanity; salvation through the
                sacrificial death of Jesus Christ; His bodily resurrection and ascension; and the work of the
                Holy Spirit in every believer. This doctrinal foundation unites our fellowship and guides our
                ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section py-5">
        <div className="container">
          <h2 className="section-title text-center text-white" data-aos="fade-up">Our Core Values</h2>
          <p className="text-center lead mb-5 text-white-50" data-aos="fade-up" data-aos-delay="100">
            Our values shape our culture, our leadership, and how we serve in MUT and beyond.
          </p>

          <div className="row justify-content-center">
            {coreValues.map((v, idx) => (
              <div key={v.title} className="col-md-6 col-lg-4 mb-4" data-aos="zoom-in" data-aos-delay={100 + idx * 80}>
                <div className="value-card text-center p-4 rounded-3 shadow-sm">
                  <i className={`${v.icon} feature-icon mb-3`} />
                  <h4 className="value-title">{v.title}</h4>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="ministries-section py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Our Ministries</h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            Find your place to grow and to serve — each ministry exists to build believers and reach others.
          </p>

          <div className="row justify-content-center">
            {ministriesPreview.map((m, idx) => (
              <div key={m.title} className="col-md-6 col-lg-4 mb-4" data-aos="zoom-in" data-aos-delay={100 + idx * 80}>
                <div className="card ministry-card h-100 shadow-sm">
                  <img src={m.image} className="card-img-top" alt={m.title} />
                  <div className="card-body text-center">
                    <i className={`${m.icon} feature-icon mb-2`} />
                    <h4 className="card-title">{m.title}</h4>
                    <p className="card-text">{m.description}</p>
                    <Link to={m.link} className="btn btn-primary btn-sm mt-2">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="300">
            <Link to="/ministries" className="btn btn-secondary btn-lg">
              View All Ministries <i className="fas fa-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Updated Programs / Highlights */}
      <section className="events-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Upcoming Service Highlights</h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            From our Sunday services and Friday fellowships — plan ahead and invite a friend.
          </p>

          <div className="row justify-content-center">
            {upcomingHighlights.map((ev, idx) => (
              <div key={ev.title} className="col-md-6 col-lg-4 mb-4" data-aos="zoom-in" data-aos-delay={100 + idx * 80}>
                <div className="card event-card h-100 shadow-sm">
                  <img src={ev.image} className="card-img-top" alt={ev.title} />
                  <div className="card-body">
                    <h4 className="card-title">
                      <i className={`${ev.icon} me-2`} />
                      {ev.title}
                    </h4>

                    {ev.meta?.map((m) => (
                      <p className="card-text mb-1" key={`${ev.title}-${m.label}`}>
                        <i className={`${m.icon} me-2`} />
                        <strong>{m.label}:</strong> {m.value}
                      </p>
                    ))}

                    <p className="card-text mt-2">{ev.description}</p>

                    <Link to={ev.link} className="btn btn-primary btn-sm mt-2">
                      Details &amp; Program
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="300">
            <Link to="/events" className="btn btn-secondary btn-lg">
              View Full Program <i className="fas fa-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section className="prayer-section py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title text-center">Need Prayers?</h2>
          <p className="text-center lead mb-5">
            Our Prayer Ministry is here to support you in faith and intercession.
            Submit your request confidentially.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <form className="p-4 rounded-3 shadow-lg" onSubmit={handlePrayerSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="prayerName" className="form-label">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="prayerName"
                    placeholder="Enter your name"
                    value={prayerName}
                    onChange={(e) => setPrayerName(e.target.value)}
                  />
                  <div id="prayerNameHelp" className="form-text">
                    You may submit anonymously if preferred.
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="prayerRequest" className="form-label">
                    Prayer Request <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control${prayerError ? " is-invalid" : ""}`}
                    id="prayerRequest"
                    rows={6}
                    placeholder="Share your prayer request here..."
                    required
                    value={prayerRequest}
                    onChange={(e) => setPrayerRequest(e.target.value)}
                  />
                  {prayerError && (
                    <div id="prayerRequestError" className="invalid-feedback">
                      Please enter your prayer request.
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit Request <i className="fas fa-paper-plane ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (kept as-is; you can replace later with real quotes/API) */}
      <section className="testimonials-section py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title text-center">What Our Members Say</h2>
          <p className="text-center lead mb-5 text-50">
            Hear from our Members about their MUTCU experience.
          </p>

          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="7000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="testimonial-card mx-auto text-center p-4 rounded-3 shadow-sm" data-aos="zoom-in">
                  <i className="fas fa-quote-left fa-2x mb-3 text-orange" />
                  <p className="lead">
                    “MUTCU has been my family away from home. The fellowship and discipleship have deepened my
                    faith and helped me navigate university life.”
                  </p>
                  <p className="mt-4">
                    <strong>– MUTCU Member</strong>
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <div className="testimonial-card mx-auto text-center p-4 rounded-3 shadow-sm" data-aos="zoom-in">
                  <i className="fas fa-quote-left fa-2x mb-3 text-orange" />
                  <p className="lead">
                    “Serving in ministry helped me grow in discipline, accountability, and boldness for Christ.”
                  </p>
                  <p className="mt-4">
                    <strong>– MUTCU Member</strong>
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <div className="testimonial-card mx-auto text-center p-4 rounded-3 shadow-sm" data-aos="zoom-in">
                  <i className="fas fa-quote-left fa-2x mb-3 text-orange" />
                  <p className="lead">
                    “The Word, prayer meetings, and mentorship shaped me spiritually and gave me purpose in campus.”
                  </p>
                  <p className="mt-4">
                    <strong>– MUTCU Member</strong>
                  </p>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
              aria-label="Previous testimonial"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
              aria-label="Next testimonial"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-section py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title text-center">Our Gallery</h2>
          <p className="text-center lead mb-5">
            Moments from our fellowship, services, events, and outreach activities.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <Link to="/gallery" className="gallery-item d-block rounded shadow-sm overflow-hidden">
                <img src="/assets/images/music1.jpg" className="img-fluid" alt="Worship Service" />
                <div className="gallery-overlay">
                  <span className="gallery-text">
                    <i className="fas fa-search-plus" /> Worship
                  </span>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <Link to="/gallery" className="gallery-item d-block rounded shadow-sm overflow-hidden">
                <img src="/assets/images/mission1.jpg" className="img-fluid" alt="Outreach" />
                <div className="gallery-overlay">
                  <span className="gallery-text">
                    <i className="fas fa-search-plus" /> Outreach
                  </span>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="300">
              <Link to="/gallery" className="gallery-item d-block rounded shadow-sm overflow-hidden">
                <img src="/assets/images/film1.jpg" className="img-fluid" alt="Creative Ministry" />
                <div className="gallery-overlay">
                  <span className="gallery-text">
                    <i className="fas fa-search-plus" /> Creative Arts
                  </span>
                </div>
              </Link>
            </div>

            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <Link to="/gallery" className="gallery-item d-block rounded shadow-sm overflow-hidden">
                <img src="/assets/images/bs1.jpg" className="img-fluid" alt="Bible Study" />
                <div className="gallery-overlay">
                  <span className="gallery-text">
                    <i className="fas fa-search-plus" /> Bible Study
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center mt-4" data-aos="zoom-in" data-aos-delay="500">
            <Link to="/gallery" className="btn btn-secondary btn-lg">
              View Full Gallery <i className="fas fa-images ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section py-5 bg-gradient" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title text-center text">Stay Connected</h2>
          <p className="text-center lead mb-5 text-50">
            Subscribe for updates on services, programs, devotionals, and ministry opportunities.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <form className="p-4 rounded-3 shadow-lg" onSubmit={handleNewsletterSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="newsletterEmail" className="form-label text">
                    Email Address <span className="text-warning">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control${newsletterError ? " is-invalid" : ""}`}
                    id="newsletterEmail"
                    placeholder="your.email@example.com"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  {newsletterError && (
                    <div id="newsletterEmailError" className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Subscribe <i className="fas fa-envelope-open-text ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage ?? ""}
        onClose={closeModal}
        onConfirm={pendingPrayerSubmission ? confirmPrayerSubmit : undefined}
      />
    </div>
  );
};

export default HomePage;
