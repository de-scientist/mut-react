import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MinistriesPage from './pages/MinistriesPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import ResourcesPage from './pages/ResourcesPage'
import GalleryPage from './pages/GalleryPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Register from './pages/Register'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'

// Admin management pages
import EventsManagement from './pages/admin/EventsManagement'
import MinistriesManagement from './pages/admin/MinistriesManagement'
import PrayerRequestsManagement from './pages/admin/PrayerRequestsManagement'
import ContactSubmissionsManagement from './pages/admin/ContactSubmissionsManagement'
import NewsletterSubscriptionsManagement from './pages/admin/NewsletterSubscriptionsManagement'
import UsersManagement from './pages/admin/UsersManagement'
import AdminMembersPage from './pages/admin/AdminMembersPage'
import AdminResourcesManagement from './pages/admin/AdminResourcesManagement'
import MediaManagement from './pages/admin/MediaManagement'
import BlogsManagement from './pages/admin/BlogsManagement'

// Ministry detail pages
import MusicMinistryPage from './pages/ministries/MusicMinistryPage'
import BibleStudyMinistryPage from './pages/ministries/BibleStudyMinistryPage'
import MissionsEvangelismMinistryPage from './pages/ministries/MissionsEvangelismMinistryPage'
import CreativeArtsMinistryPage from './pages/ministries/CreativeArtsMinistryPage'
import PrayerMinistryPage from './pages/ministries/PrayerMinistryPage'
import HospitalityMinistryPage from './pages/ministries/HospitalityMinistryPage'
import TechnicalDepartmentPage from './pages/ministries/TechnicalDepartmentPage'
import WelfareCommitteePage from './pages/ministries/WelfareCommitteePage'
import RMCPage from './pages/ministries/RMCPage'

// Committee pages
import ChairmanPage from './pages/committees/ChairmanPage'
import BibleStudyCoordinatorPage from './pages/committees/BibleStudyCoordinatorPage'
import CreativeCoordinatorPage from './pages/committees/CreativeCoordinatorPage'
import MissionsCoordinatorPage from './pages/committees/MissionsCoordinatorPage'
import MusicCoordinatorPage from './pages/committees/MusicCoordinatorPage'
import PrayerCoordinatorPage from './pages/committees/PrayerCoordinatorPage'
import SecretaryPage from './pages/committees/SecretaryPage'
import TechnicalCoordinatorPage from './pages/committees/TechnicalCoordinatorPage'
import TreasurerPage from './pages/committees/TreasurerPage'
import ViceChair1Page from './pages/committees/ViceChair1Page'
import ViceChair2Page from './pages/committees/ViceChair2Page'
import ViceSecretaryPage from './pages/committees/ViceSecretaryPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ministries" element={<MinistriesPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blogs/:slug" element={<BlogDetailPage />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/events" element={<EventsManagement />} />
        <Route path="admin/ministries" element={<MinistriesManagement />} />
        <Route path="admin/prayer-requests" element={<PrayerRequestsManagement />} />
        <Route path="admin/contacts" element={<ContactSubmissionsManagement />} />
        <Route path="admin/newsletter" element={<NewsletterSubscriptionsManagement />} />
        <Route path="admin/users" element={<UsersManagement />} />
        <Route path="admin/members" element={<AdminMembersPage />} />
        <Route path="admin/resources" element={<AdminResourcesManagement />} />
        <Route path="admin/media" element={<MediaManagement />} />
        <Route path="admin/blogs" element={<BlogsManagement />} />
        <Route path="register" element={<Register />} />

        {/* Ministry detail routes */}
        <Route path="ministries/music-ministry" element={<MusicMinistryPage />} />
        <Route path="ministries/bible-study-discipleship" element={<BibleStudyMinistryPage />} />
        <Route path="ministries/missions-evangelism" element={<MissionsEvangelismMinistryPage />} />
        <Route path="ministries/creative-arts" element={<CreativeArtsMinistryPage />} />
        <Route path="ministries/prayer-ministry" element={<PrayerMinistryPage />} />
        <Route path="ministries/hospitality-ministry" element={<HospitalityMinistryPage />} />
        <Route path="ministries/technical-department" element={<TechnicalDepartmentPage />} />
        <Route path="ministries/welfare-committee" element={<WelfareCommitteePage />} />
        <Route path="ministries/RMC" element={<RMCPage />} />

        {/* Committee routes */}
        <Route path="committees/chairman" element={<ChairmanPage />} />
        <Route path="committees/bible-study" element={<BibleStudyCoordinatorPage />} />
        <Route path="committees/creative" element={<CreativeCoordinatorPage />} />
        <Route path="committees/missions" element={<MissionsCoordinatorPage />} />
        <Route path="committees/music" element={<MusicCoordinatorPage />} />
        <Route path="committees/prayer" element={<PrayerCoordinatorPage />} />
        <Route path="committees/secretary" element={<SecretaryPage />} />
        <Route path="committees/technical" element={<TechnicalCoordinatorPage />} />
        <Route path="committees/treasurer" element={<TreasurerPage />} />
        <Route path="committees/vice-chair-1" element={<ViceChair1Page />} />
        <Route path="committees/vice-chair-2" element={<ViceChair2Page />} />
        <Route path="committees/vice-secretary" element={<ViceSecretaryPage />} />
      </Route>
    </Routes>
  )
}

export default App
