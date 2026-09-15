import { useState, useEffect } from 'react'
import { navLinks, profile } from '../data/profile'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map((l) => document.getElementById(l.id))
      const mid = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]
        if (s && s.offsetTop <= mid) {
          setActive(navLinks[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => handleClick('home')}>
          <span className="brand-mark">⟡</span>
          <span className="brand-text">{profile.name.split(' ')[0]}</span>
          <span className="brand-dot">.</span>
        </button>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-link ${active === link.id ? 'active' : ''}`}
                onClick={() => handleClick(link.id)}
              >
                {link.label}
                <span className="nav-underline" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
