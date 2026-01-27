import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ministriesAPI } from "../services/api";
import "../assets/mut/css/ministries.css";

interface MinistryFromAPI {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  slug: string;
  isActive: boolean;
}

interface CommitteeCard {
  key: string; // internal key
  name: string;
  slug: string; // route slug
  description: string;
  icon: string; // fontawesome class e.g. "fa-music"
  imageUrl: string; // fallback image
  route: string; // page route
}

const COMMITTEES: CommitteeCard[] = [
  {
    key: "bible-study-training",
    name: "Bible Study & Training",
    slug: "bible-study",
    description:
      "Bible-based teaching, exposition, study sessions, and training to ground believers in Scripture.",
    icon: "fa-book-open",
    imageUrl: "/assets/images/bs1.jpg",
    route: "/ministries/bible-study",
  },
  {
    key: "discipleship",
    name: "Discipleship",
    slug: "discipleship",
    description:
      "Mentorship, accountability, and practical Christian living to nurture believers into maturity.",
    icon: "fa-user-friends",
    imageUrl: "https://picsum.photos/400/300?random=2",
    route: "/ministries/discipleship",
  },
  {
    key: "prayer",
    name: "Prayer Committee",
    slug: "prayer-ministry",
    description:
      "Intercession, prayer gatherings, prayer chains, keshas, retreats, and revival-focused programs.",
    icon: "fa-hands-praying",
    imageUrl: "/assets/images/prayer1.jpg",
    route: "/ministries/prayer-ministry",
  },
  {
    key: "missions-evangelism",
    name: "Missions & Evangelism",
    slug: "missions-evangelism",
    description:
      "Campus outreach, missions, evangelism, and hope ministry visits within and beyond the university.",
    icon: "fa-globe",
    imageUrl: "/assets/images/mission1.jpg",
    route: "/ministries/missions-evangelism",
  },
  {
    key: "music",
    name: "Music Ministry",
    slug: "music-ministry",
    description:
      "Choir, band, instrumentalists and Praise & Worship teams leading the Union in worship with excellence.",
    icon: "fa-music",
    imageUrl: "/assets/images/music1.jpg",
    route: "/ministries/music-ministry",
  },
  {
    key: "creative-arts",
    name: "Creative Arts (CREAM)",
    slug: "creative-arts",
    description:
      "Drama, dance, spoken word, modelling, film/media and creative expressions that point people to Christ.",
    icon: "fa-theater-masks",
    imageUrl: "/assets/images/dance3.jpg",
    route: "/ministries/creative-arts",
  },
  {
    key: "technical",
    name: "Technical Department",
    slug: "technical",
    description:
      "Sound, livestream, projection, photography/video, and technical support for services and events.",
    icon: "fa-sliders-h",
    imageUrl: "/assets/images/film1.jpg",
    route: "/ministries/technical-department",
  },
  {
    key: "hospitality",
    name: "Hospitality Committee",
    slug: "hospitality",
    description:
      "Welcoming guests, coordinating seating/hosting, and ensuring visitors and members feel at home.",
    icon: "fa-mug-hot",
    imageUrl: "/assets/images/guest-welcome.jfif",
    route: "/ministries/hospitality",
  },
  {
    key: "welfare",
    name: "Welfare Committee",
    slug: "welfare",
    description:
      "Member care, encouragement, support in times of need, and strengthening fellowship as a family.",
    icon: "fa-hand-holding-heart",
    imageUrl: "/assets/images/placeholder2.jpg",
    route: "/ministries/welfare",
  },
  {
    key: "rmc",
    name: "Resource Mobilization Committee (RMC)",
    slug: "rmc",
    description:
      "Stewardship and mobilization of financial/material resources to support ministry work and programs.",
    icon: "fa-donate",
    imageUrl: "/assets/images/placeholder3.jpg",
    route: "/ministries/rmc",
  },
];

// Robust extractor for different backend response shapes
function extractMinistries(payload: any): MinistryFromAPI[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as MinistryFromAPI[];
  if (Array.isArray(payload.data)) return payload.data as MinistryFromAPI[];
  if (Array.isArray(payload.items)) return payload.items as MinistryFromAPI[];
  return [];
}

export default function MinistriesPage() {
  const [apiMinistries, setApiMinistries] = useState<MinistryFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        setLoading(true);

        const res = await ministriesAPI.getAll();
        const items = extractMinistries(res);

        // Only keep active ones (if field exists)
        const activeItems = items.filter((m) => m.isActive !== false);

        setApiMinistries(activeItems);
        // Silently use fallback data if needed - no notices
      } catch (err: any) {
        console.error("Ministries fetch failed:", err);
        // Silently fail - don't show any notice, just use the fallback committees
        setNotice(null);
        setApiMinistries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  // Merge API data onto our official committee list (never remove committees)
  const mergedCommittees = useMemo(() => {
    const map = new Map<string, MinistryFromAPI>();
    apiMinistries.forEach((m) => map.set((m.slug || "").toLowerCase(), m));

    return COMMITTEES.map((c) => {
      const api = map.get(c.slug.toLowerCase());
      return {
        ...c,
        // Prefer API content if present (lets admin updates reflect), otherwise keep manual content
        name: api?.name?.trim() || c.name,
        description: api?.description?.trim() || c.description,
        imageUrl: api?.imageUrl?.trim() || c.imageUrl,
        icon: api?.icon?.trim() || c.icon,
      };
    });
  }, [apiMinistries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mergedCommittees;
    return mergedCommittees.filter((c) => {
      const n = (c.name || "").toLowerCase();
      const d = (c.description || "").toLowerCase();
      return n.includes(q) || d.includes(q);
    });
  }, [mergedCommittees, query]);

  const renderIcon = (icon: string) => {
    // supports "fa-music" or "fas fa-music"
    const cls =
      icon.includes("fa-") && !icon.includes("fa ")
        ? `fas ${icon}`
        : icon || "fas fa-star";
    return <i className={`${cls} feature-icon mb-3`} />;
  };

  return (
    <div className="ministries-page">
      {/* Page Hero */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/mbbc1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">Our Committees</h1>
          <p className="lead">
            Explore the 10 core committees of MUTCU — then view sub-ministries inside each one.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-5 ministries-overview-section">
        <div className="container">
          <h2 className="section-title text-center">
            MUTCU’s 10 Core Committees
          </h2>
          {/* This page highlights the official committees (as structured in the Leadership Manual).
            Each committee page contains its sub-ministries and how to get involved. */}

          {/* Search */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-10 col-lg-8">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white">
                  <i className="fas fa-search" />
                </span>
                <input
                  className="form-control"
                  placeholder="Search committees (e.g., Prayer, Technical, Discipleship...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {/* <div className="form-text">
                Tip: Even if the API is down, these 10 committees will still display.
              </div> */}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading committees...</p>
            </div>
          ) : (
            <>
              {notice && (
                <div className="alert alert-warning" role="alert">
                  {notice}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-5">
                  <div className="opacity-50 mb-2">🔎</div>
                  <p className="text-muted">
                    No committees match your search. Try a different keyword.
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setQuery("")}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="row justify-content-center">
                  {filtered.map((c, index) => (
                    <div
                      key={c.key}
                      className="col-md-6 col-lg-4 mb-4"
                      data-aos="zoom-in"
                      data-aos-delay={index * 70}
                    >
                      <Link
                        to={c.route}
                        className="ministry-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100"
                      >
                        {c.imageUrl ? (
                          <img
                            src={c.imageUrl}
                            alt={c.name}
                            className="img-fluid rounded-top-3"
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center bg-light rounded-top-3"
                            style={{ height: 220 }}
                          >
                            <div className="opacity-50">✨</div>
                          </div>
                        )}

                        <div className="card-body">
                          {renderIcon(c.icon)}
                          <h4 className="card-title">{c.name}</h4>
                          <p className="card-text">{c.description}</p>
                          <span className="btn btn-sm btn-learn-more mt-3">
                            Learn More <i className="fas fa-arrow-right ms-2" />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional link to special committees page */}
              <div className="text-center mt-4">
                <Link to="/ministries/special-committees" className="btn btn-secondary btn-lg">
                  View Special Committees <i className="fas fa-users ms-2" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Find Your Place to Serve!</h2>
          <p className="lead mb-4 text-white-50">
            There’s a committee for every passion and gift. Join us in making a difference.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Get Involved
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            Learn About Leadership
          </Link>
        </div>
      </section>
    </div>
  );
}
