import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Star,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

// Inlined simple AOS-like hook to ensure the file is self-contained and resolves the build error
const useAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const HomePage: React.FC = () => {
  useAnimation();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Vibrant Fellowship",
      description: "Join a community of believers dedicated to walking the Christian journey together, as outlined in our 2025 Constitution."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Bible Study",
      description: "Deepen your understanding of God's Word through our structured discipleship programs every Sunday morning."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Passionate Worship",
      description: "Experience God's presence through our Friday Worship Experiences and Sunday services."
    }
  ];

  // Updated with exact Jan/Feb 2026 Program Events from uploaded docs
  const upcomingEvents = [
    {
      title: "Theme Launch",
      date: "Jan 11, 2026",
      time: "8:00 AM - 11:30 AM",
      location: "Main Hall (Sunday Service)",
      speaker: "Chairperson Padri Kihika"
    },
    {
      title: "Worship Experience",
      date: "Jan 23, 2026",
      time: "6:30 PM - 9:00 PM",
      location: "Multipurpose Hall (Friday Service)",
      speaker: "Music Ministry"
    },
    {
      title: "Defending our Faith",
      date: "Jan 25, 2026",
      time: "8:00 AM - 11:30 AM",
      location: "Main Hall (Sunday Service)",
      speaker: "Mr. Mwangi Chege"
    }
  ];

  return (
    <div className="overflow-x-hidden font-sans">
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
          style={{ 
            backgroundImage: "url('/assets/images/church1.jpg')",
            filter: "brightness(0.35)"
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl" data-animate>
          <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-400/30 mb-6 text-blue-200 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            2026 Semester Theme Launch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Murang'a University <br /> 
            <span className="text-blue-400">Christian Union</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light italic text-gray-200">
            "Inspire Love, Hope & Godliness"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              Join the Union <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </section>

      {/* Identity Banner (Constitution 2025 Values) */}
      <section className="py-12 bg-blue-900 text-white shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around items-center gap-8 text-center">
            <div data-animate>
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-blue-300" />
              <span className="block text-2xl font-bold tracking-wide">HOLINESS</span>
              <p className="text-xs text-blue-200 uppercase tracking-widest opacity-70">Life for Christ</p>
            </div>
            <div data-animate>
              <Star className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
              <span className="block text-2xl font-bold tracking-wide">EXCELLENCE</span>
              <p className="text-xs text-blue-200 uppercase tracking-widest opacity-70">Service with Honor</p>
            </div>
            <div data-animate>
              <Heart className="w-10 h-10 mx-auto mb-2 text-red-400" />
              <span className="block text-2xl font-bold tracking-wide">UNITY</span>
              <p className="text-xs text-blue-200 uppercase tracking-widest opacity-70">One Body, One Spirit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-animate>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Pillars</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Rooted in the 2025 MUTCU Constitution, our mission is to witness for Christ and grow in godliness.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
                data-animate
              >
                <div className="mb-6 inline-block p-5 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events (2026 Program Highlights) */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16" data-animate>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Jan–April 2026 Highlights</h2>
              <p className="text-gray-600 text-lg">Theme: <span className="text-blue-600 font-semibold italic">"Inspire Love, Hope & Godliness"</span></p>
            </div>
            <Link to="/events" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all mt-6 md:mt-0 group">
              View Full Semester Program <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index}
                className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-blue-500 transition-all shadow-sm hover:shadow-xl p-8"
                data-animate
              >
                <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 text-sm uppercase tracking-wider">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  {event.date}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-base">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-base">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-4">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-base font-medium text-gray-900">Speaker: {event.speaker}</span>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times Quick Access */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-animate>
              <h2 className="text-4xl font-bold mb-6">Join Our Weekly Services</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether you are a first-year student or a finishing student, there is a place for you to serve and grow in MUTCU.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Sunday Main Service</h4>
                    <p className="text-gray-400">8:00 AM – 11:30 AM | Main Hall</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-2xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Friday Fellowship</h4>
                    <p className="text-gray-400">6:30 PM – 9:00 PM | Multipurpose Hall</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative" data-animate>
              <img 
                src="/assets/images/church3.jpg" 
                alt="Worship at MUTCU" 
                className="rounded-3xl shadow-2xl relative z-10 brightness-75"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-blue-600 rounded-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10" data-animate>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to grow with us?</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-light">
            Register today to receive updates on Bible Study groups, missions, and special events during the Jan-April 2026 semester.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-5 rounded-full font-bold shadow-2xl transition-all hover:scale-105"
            >
              Register as a Member
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-5 rounded-full font-bold transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;