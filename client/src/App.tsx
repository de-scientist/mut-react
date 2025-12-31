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
        <Route path="admin" element={<AdminDashboard />} />

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
      </Route>
    </Routes>
  )
}

export default App
