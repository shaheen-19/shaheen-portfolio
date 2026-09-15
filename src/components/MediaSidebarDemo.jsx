import { useState, useRef, useEffect } from 'react'
import './MediaSidebarDemo.css'

const NAV_ITEMS = [
  { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
  { id: 'shortcuts', label: 'Shortcuts', icon: 'fa-keyboard' },
  { id: 'exhibits', label: 'Exhibits', icon: 'fa-paint-brush' },
  { id: 'events', label: 'Events', icon: 'fa-calendar-days' },
  { id: 'store', label: 'Store', icon: 'fa-store' },
  { id: 'contact', label: 'Contact', icon: 'fa-envelope' },
  { id: 'feedback', label: 'Feedback', icon: 'fa-comment-dots' },
]

const SOCIAL_ICONS = [
  { label: 'Twitter', icon: 'fa-twitter' },
  { label: 'Instagram', icon: 'fa-instagram' },
  { label: 'YouTube', icon: 'fa-youtube' },
  { label: 'Facebook', icon: 'fa-facebook-f' },
]

export default function MediaSidebarDemo({ accent }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('gallery')
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const handleNavClick = (id) => {
    setActive(id)
  }

  return (
    <div className="sidebar-demo" style={{ '--demo-accent': accent }}>
      <div className="demo-header">
        <div className="demo-title">
          <span className="demo-icon">◈</span>
          Media Sidebar — Interactive Preview
        </div>
        <button className="demo-action-btn" onClick={() => setOpen(true)}>
          TRY INTERACTION
        </button>
      </div>

      <div className="sidebar-preview" ref={containerRef}>
        <div className="sidebar-topbar">
          <button
            className={`sidebar-toggle ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Open sidebar menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <span className="sidebar-app-name">MediaGallery</span>
          {!open && <span className="sidebar-hint">Click the hamburger to open the sidebar</span>}
        </div>

        <div className="sidebar-content-area">
          <div className={`sidebar-overlay ${open ? 'visible' : ''}`} />

          <aside className={`sidebar-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
            <div className="sidebar-panel-header">
              <span className="sidebar-panel-brand">MediaGallery</span>
              <button
                className="sidebar-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <nav className="sidebar-nav">
              <ul className="sidebar-nav-list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`sidebar-nav-item ${active === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <i className={`fa-solid ${item.icon} sidebar-nav-icon`} />
                      <span className="sidebar-nav-label">{item.label}</span>
                      {active === item.id && <span className="sidebar-nav-indicator" />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="sidebar-social">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="sidebar-social-icon"
                  aria-label={social.label}
                >
                  <i className={`fa-brands ${social.icon}`} />
                </a>
              ))}
            </div>
          </aside>

          <div className={`sidebar-main ${open ? 'shifted' : ''}`}>
            <div className="sidebar-demo-content">
              <h3 className="sidebar-demo-section-title">
                {NAV_ITEMS.find((n) => n.id === active)?.label}
              </h3>
              <p className="sidebar-demo-section-desc">
                {active === 'gallery' && 'Browse the gallery collection. Try the hamburger button to open the sidebar, then click outside or press Escape to close it.'}
                {active === 'shortcuts' && 'Quick access shortcuts. Click any menu item to see the active state highlight.'}
                {active === 'exhibits' && 'Explore featured exhibits. The sidebar slides in and out smoothly with a glassmorphism effect.'}
                {active === 'events' && 'Upcoming events and schedules. The sidebar supports hamburger toggle, close button, outside-click, and Escape key.'}
                {active === 'store' && 'Visit the store. All sidebar interactions are preserved from the original project.'}
                {active === 'contact' && 'Get in touch. The active menu item is highlighted with an accent indicator.'}
                {active === 'feedback' && 'Share your feedback. This demo faithfully reproduces the original Media Sidebar behavior.'}
              </p>

              <div className="sidebar-feature-grid">
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-bars sidebar-feature-icon" />
                  Hamburger opens sidebar
                </div>
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-xmark sidebar-feature-icon" />
                  Close button closes sidebar
                </div>
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-hand sidebar-feature-icon" />
                  Click outside to close
                </div>
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-keyboard sidebar-feature-icon" />
                  Escape key to close
                </div>
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-circle-check sidebar-feature-icon" />
                  Active link highlighting
                </div>
                <div className="sidebar-feature-note">
                  <i className="fa-solid fa-window-restore sidebar-feature-icon" />
                  Glassmorphism styling
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
