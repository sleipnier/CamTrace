import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { NewJobPage } from './pages/NewJobPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { TrajectoryPage } from './pages/TrajectoryPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/trajectory" element={<TrajectoryPage />} />
        <Route path="/trajectory/:jobId" element={<TrajectoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
