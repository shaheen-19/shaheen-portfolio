import { profile } from '../data/profile'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-mark">⟡</span>
          <span className="footer-name">{profile.name}</span>
        </div>
        <p className="footer-role">{profile.role}</p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
