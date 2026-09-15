import { worldLocations } from '../data/profile'
import './DeveloperWorld.css'

export default function DeveloperWorld() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="world" className="section dev-world">
      <div className="section-header reveal">
        <span className="section-label">⟡ Developer World</span>
        <h2 className="section-title">Welcome to My Developer World</h2>
        <p className="section-subtitle">
          Each location represents a part of my profile. Explore the world to discover my skills,
          projects, DSA foundation, journey, and how to connect.
        </p>
      </div>

      <div className="world-grid">
        {worldLocations.map((loc, i) => (
          <button
            key={loc.id}
            className="world-location-card reveal"
            style={{ animationDelay: `${i * 0.1}s`, '--loc-accent': loc.accent }}
            onClick={() => scrollTo(loc.id)}
          >
            <div className="world-location-glow" style={{ '--loc-accent': loc.accent }} />
            <div className="world-location-number">0{i + 1}</div>
            <div className="world-location-icon" style={{ '--loc-accent': loc.accent }}>
              {loc.icon}
            </div>
            <h3 className="world-location-label">{loc.label}</h3>
            <p className="world-location-desc">{loc.desc}</p>
            <div className="world-location-enter">
              <span>Enter</span>
              <span className="enter-arrow">→</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
