import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="text-center py-5">
      <h1 className="display-5 fw-bold">Move together. Get stronger.</h1>
      <p className="lead text-secondary mb-4">
        Track activity, cheer on your team, and find your next workout.
      </p>
      <NavLink className="btn btn-primary" to="/activities">
        Explore activities
      </NavLink>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img
              className="brand-logo"
              src="/octofitapp-small.png"
              alt=""
              width="36"
              height="36"
            />
            <span>Octofit Tracker</span>
          </NavLink>
          <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2 px-lg-3${isActive ? ' active' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Overview />} path="*" />
        </Routes>
      </main>
      <footer className="border-top py-3 text-center text-secondary small">
        Octofit Tracker
      </footer>
    </div>
  )
}

export default App
