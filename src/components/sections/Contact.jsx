import { useState } from 'react'
import { profile } from '../../data/profile'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', msg: 'Please fill in all fields.' })
      return
    }
    setStatus({
      type: 'info',
      msg: 'This contact form is a demo. Please reach out via email or LinkedIn directly.',
    })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header reveal">
        <span className="section-label">◈ Connection Hub — Location 05</span>
        <h2 className="section-title">Contact & Professional Links</h2>
        <p className="section-subtitle">
          Let's connect. Whether it's an opportunity, collaboration, or a conversation about
          frontend development — I'd love to hear from you.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info reveal">
          <a href={`mailto:${profile.email}`} className="contact-link-card glass">
            <div className="contact-link-icon">✉</div>
            <div className="contact-link-info">
              <span className="contact-link-label">Email</span>
              <span className="contact-link-value">{profile.email}</span>
            </div>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-card glass"
          >
            <div className="contact-link-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="contact-link-info">
              <span className="contact-link-label">GitHub</span>
              <span className="contact-link-value">{profile.githubDisplay}</span>
            </div>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-card glass"
          >
            <div className="contact-link-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div className="contact-link-info">
              <span className="contact-link-label">LinkedIn</span>
              <span className="contact-link-value">{profile.linkedinDisplay}</span>
            </div>
          </a>

          <div className="contact-link-card glass contact-link-card-static">
            <div className="contact-link-icon">⌖</div>
            <div className="contact-link-info">
              <span className="contact-link-label">Location</span>
              <span className="contact-link-value">{profile.location}</span>
            </div>
          </div>

          <a
            className="btn btn-primary contact-resume-btn"
            href="/resume/Shaheen-Resume.pdf"
            download="Shaheen-Resume.pdf"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>

        <form className="contact-form glass reveal" onSubmit={handleSubmit}>
          <h3 className="contact-form-title">Send a Message</h3>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="5"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary contact-submit">
            Send Message
          </button>
          {status && (
            <div className={`contact-status contact-status-${status.type}`}>
              {status.msg}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
