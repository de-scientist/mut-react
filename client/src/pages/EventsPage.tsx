import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { eventsAPI } from "../services/api";
import "../assets/mut/css/events.css";

interface EventItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  isActive: boolean;
}

type ProgramItem = {
  id: string;
  serviceType: "SUNDAY" | "FRIDAY";
  date: string; // YYYY-MM-DD (recommended)
  topic: string;
  speakers?: string[];
  notes?: string[];
};

const normalizeDate = (raw: string) => {
  // accepts: 9/01/2026, 11/01/26
  const parts = raw.trim().split("/");
  if (parts.length !== 3) return raw;

  const dd = parts[0].padStart(2, "0");
  const mm = parts[1].padStart(2, "0");
  let yy = parts[2];

  // if year is 2-digit
  if (yy.length === 2) yy = `20${yy}`;
  return `${yy}-${mm}-${dd}`;
};

const prettyDate = (iso: string) => {
  // iso expected YYYY-MM-DD
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

/**
 * Semester program extracted from your uploaded:
 * - Friday Service Programme.docx
 * - SUNDAY_PROGRAM_SERVICES[2].docx
 *
 * You can update/edit these items later, but best approach is:
 * Admin -> Import Semester Program -> then manage from DB.
 */
const programSchedule: ProgramItem[] = [
  // ===== SUNDAY SERVICES (from doc) =====
  {
    id: "sun-2026-01-11",
    serviceType: "SUNDAY",
    date: normalizeDate("11/01/26"),
    topic: "Theme Launch",
    speakers: ["Chairperson Purdri Kihika"],
  },
  {
    id: "sun-2026-01-18",
    serviceType: "SUNDAY",
    date: normalizeDate("18/01/26"),
    topic: "Bible Study Sunday",
    speakers: ["Bible Study Committee"],
  },
  {
    id: "sun-2026-01-25",
    serviceType: "SUNDAY",
    date: normalizeDate("25/01/26"),
    topic: "Defending our Faith",
    speakers: ["Mr. Mwangi Chege"],
    notes: ["Back-up: Stem"],
  },
  {
    id: "sun-2026-02-01",
    serviceType: "SUNDAY",
    date: normalizeDate("01/02/26"),
    topic: "Bible Study Sunday",
    speakers: ["FOCUS"],
    notes: ["Back-ups: Mr. Joel Michiri, Daniel Njumbi"],
  },
  {
    id: "sun-2026-02-08",
    serviceType: "SUNDAY",
    date: normalizeDate("08/02/26"),
    topic: "Charity and Compassion (Welfare Sunday)",
    speakers: ["Dr. Tabitha (Assistant Patron)"],
    notes: ["Back-up: Natasha Amani"],
  },
  {
    id: "sun-2026-02-15",
    serviceType: "SUNDAY",
    date: normalizeDate("15/02/26"),
    topic: "The Journey of Love",
    speakers: ["Kevin Chege"],
    notes: ["Back-up: Esther Karemeri"],
  },

  // ===== FRIDAY FELLOWSHIPS (from doc) =====
  {
    id: "fri-2026-01-09",
    serviceType: "FRIDAY",
    date: normalizeDate("9/01/2026"),
    topic: "True Worship",
    speakers: ["Dr. Ndia"],
    notes: ["Back-up: Martha Thuuku"],
  },
  {
    id: "fri-2026-01-16",
    serviceType: "FRIDAY",
    date: normalizeDate("16/01/2026"),
    topic: "Bible Study Guide Exposition",
  },
  {
    id: "fri-2026-01-23",
    serviceType: "FRIDAY",
    date: normalizeDate("23/01/2026"),
    topic: "Worship Experience",
  },
  {
    id: "fri-2026-01-30",
    serviceType: "FRIDAY",
    date: normalizeDate("30/01/2026"),
    topic: "Prayer Kesha",
  },
  {
    id: "fri-2026-02-06",
    serviceType: "FRIDAY",
    date: normalizeDate("6/02/2026"),
    topic: "Book of Timothy Exposition",
    speakers: ["Caroline Kasaya"],
    notes: ["Back-up: Mércy Mutuku"],
  },
  {
    id: "fri-2026-02-13",
    serviceType: "FRIDAY",
    date: normalizeDate("13/02/2026"),
    topic: "Creative Experience",
  },
];

const EventsPage = () => {
  // Special Events (API)
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Program UI state
  const [tab, setTab] = useState<"PROGRAM" | "SPECIAL">("PROGRAM");
  const [programFilter, setProgramFilter] = useState<"ALL" | "SUNDAY" | "FRIDAY">(
    "ALL",
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        setLoading(true);
        const res = await eventsAPI.getAll({ active: "true" });
        const items = res.data || res.items || [];
        setEvents(items);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load special events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveEvents();
  }, []);

  const filteredProgram = useMemo(() => {
    const q = search.trim().toLowerCase();

    return programSchedule
      .filter((p) => (programFilter === "ALL" ? true : p.serviceType === programFilter))
      .filter((p) => {
        if (!q) return true;
        const hay = [
          p.topic,
          p.date,
          ...(p.speakers || []),
          ...(p.notes || []),
          p.serviceType,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [programFilter, search]);

  const sunday = filteredProgram.filter((p) => p.serviceType === "SUNDAY");
  const friday = filteredProgram.filter((p) => p.serviceType === "FRIDAY");

  return (
    <div className="events-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Programs & Events</h1>
          <p className="lead">
            View our Sunday Services, Friday Fellowships, and special events.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            <button
              className={`btn btn-lg ${tab === "PROGRAM" ? "btn-primary" : "btn-outline-light"}`}
              onClick={() => setTab("PROGRAM")}
              type="button"
            >
              Service Program
            </button>
            <button
              className={`btn btn-lg ${tab === "SPECIAL" ? "btn-primary" : "btn-outline-light"}`}
              onClick={() => setTab("SPECIAL")}
              type="button"
            >
              Special Events
            </button>
          </div>
        </div>
      </section>

      {/* PROGRAM TAB */}
      {tab === "PROGRAM" && (
        <section className="py-5 events-section bg-light">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
              <div>
                <h2 className="section-title mb-1">Semester Service Program</h2>
                <p className="text-muted mb-0">
                  Official schedule for Sunday Services and Friday Fellowships.
                </p>
              </div>

              <div className="d-flex gap-2 flex-wrap align-items-center">
                <div className="btn-group" role="group" aria-label="Program filter">
                  <button
                    type="button"
                    className={`btn ${programFilter === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setProgramFilter("ALL")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`btn ${programFilter === "SUNDAY" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setProgramFilter("SUNDAY")}
                  >
                    Sunday
                  </button>
                  <button
                    type="button"
                    className={`btn ${programFilter === "FRIDAY" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setProgramFilter("FRIDAY")}
                  >
                    Friday
                  </button>
                </div>

                <input
                  className="form-control"
                  style={{ minWidth: 240 }}
                  placeholder="Search topic / speaker / date..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredProgram.length === 0 ? (
              <div className="text-center py-5">
                <div className="opacity-50 mb-2">📅</div>
                <p className="text-muted">No program entries match your filters.</p>
              </div>
            ) : (
              <div className="row g-4">
                {/* Sunday Column */}
                {(programFilter === "ALL" || programFilter === "SUNDAY") && (
                  <div className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                      <div className="card-header bg-white py-3 border-bottom">
                        <h5 className="mb-0 fw-bold">
                          <i className="fas fa-church me-2 text-primary" />
                          Sunday Services
                        </h5>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table mb-0 align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th className="px-3 py-3">Date</th>
                                <th className="py-3">Topic</th>
                                <th className="py-3">Speaker(s)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sunday.length === 0 ? (
                                <tr>
                                  <td colSpan={3} className="text-center py-4 text-muted">
                                    No Sunday entries.
                                  </td>
                                </tr>
                              ) : (
                                sunday.map((p) => (
                                  <tr key={p.id}>
                                    <td className="px-3 fw-bold">{prettyDate(p.date)}</td>
                                    <td>
                                      <div className="fw-bold">{p.topic}</div>
                                      {p.notes?.length ? (
                                        <div className="small text-muted mt-1">
                                          {p.notes.join(" • ")}
                                        </div>
                                      ) : null}
                                    </td>
                                    <td className="small">
                                      {p.speakers?.length ? p.speakers.join(", ") : "—"}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top d-flex justify-content-end">
                        <Link to="/contact" className="btn btn-outline-primary btn-sm">
                          Need more info? Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Friday Column */}
                {(programFilter === "ALL" || programFilter === "FRIDAY") && (
                  <div className="col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                      <div className="card-header bg-white py-3 border-bottom">
                        <h5 className="mb-0 fw-bold">
                          <i className="fas fa-fire me-2 text-primary" />
                          Friday Fellowships
                        </h5>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table mb-0 align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th className="px-3 py-3">Date</th>
                                <th className="py-3">Topic</th>
                                <th className="py-3">Speaker(s)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {friday.length === 0 ? (
                                <tr>
                                  <td colSpan={3} className="text-center py-4 text-muted">
                                    No Friday entries.
                                  </td>
                                </tr>
                              ) : (
                                friday.map((p) => (
                                  <tr key={p.id}>
                                    <td className="px-3 fw-bold">{prettyDate(p.date)}</td>
                                    <td>
                                      <div className="fw-bold">{p.topic}</div>
                                      {p.notes?.length ? (
                                        <div className="small text-muted mt-1">
                                          {p.notes.join(" • ")}
                                        </div>
                                      ) : null}
                                    </td>
                                    <td className="small">
                                      {p.speakers?.length ? p.speakers.join(", ") : "—"}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top d-flex justify-content-end">
                        <Link to="/contact" className="btn btn-outline-primary btn-sm">
                          Need more info? Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-4" data-aos="zoom-in">
              <Link to="/ministries" className="btn btn-primary btn-lg me-2">
                Serve in a Ministry <i className="fas fa-hands-helping ms-2" />
              </Link>
              <Link to="/resources" className="btn btn-secondary btn-lg">
                Watch / Listen <i className="fas fa-play-circle ms-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL EVENTS TAB */}
      {tab === "SPECIAL" && (
        <section className="py-5 events-section bg-light">
          <div className="container">
            <h2 className="section-title text-center">Special Events</h2>
            <p className="text-center lead mb-5">
              Announcements for special services, missions, conferences, and union-wide activities.
            </p>

            <div className="row justify-content-center">
              {loading && (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status"></div>
                  <p className="text-muted">Loading special events...</p>
                </div>
              )}

              {!loading && error && (
                <div className="col-12">
                  <div className="alert alert-warning" role="alert">
                    {error}
                  </div>
                </div>
              )}

              {!loading && events.length === 0 && (
                <div className="col-12 text-center py-5">
                  <div className="opacity-50 mb-2">✨</div>
                  <p className="text-muted">
                    No special events at the moment. Check back soon!
                  </p>
                </div>
              )}

              {!loading &&
                events.length > 0 &&
                events.map((event, index) => (
                  <div
                    key={event.id}
                    className="col-md-6 col-lg-4 mb-4"
                    data-aos="zoom-in"
                    data-aos-delay={(index + 1) * 100}
                  >
                    <div className="card event-card h-100 shadow-sm">
                      {event.imageUrl ? (
                        <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                      ) : (
                        <div
                          className="card-img-top bg-light d-flex align-items-center justify-content-center"
                          style={{ height: "200px" }}
                        >
                          ✨
                        </div>
                      )}

                      <div className="card-body">
                        <h4 className="card-title">{event.title}</h4>
                        <p className="card-text mb-1">
                          <i className="far fa-calendar-alt me-2" />
                          <strong>Date:</strong> {event.date}
                        </p>
                        {event.time && (
                          <p className="card-text mb-1">
                            <i className="far fa-clock me-2" />
                            <strong>Time:</strong> {event.time}
                          </p>
                        )}
                        {event.location && (
                          <p className="card-text mb-2">
                            <i className="fas fa-map-marker-alt me-2" />
                            <strong>Location:</strong> {event.location}
                          </p>
                        )}
                        {event.description && <p className="card-text">{event.description}</p>}

                        <Link to="/contact" className="btn btn-primary btn-sm mt-2">
                          Ask / RSVP
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Stay Connected</h2>
          <p className="lead mb-4 text-white-50">
            Want to be notified about updates? Contact us or subscribe to our newsletter.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Contact Us <i className="fas fa-envelope ms-2" />
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Subscribe to Newsletter <i className="fas fa-envelope-open-text ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
