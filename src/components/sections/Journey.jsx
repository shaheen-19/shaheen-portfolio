import { journey, certifications } from '../../data/journey'
import './Journey.css'

export default function Journey() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-header reveal">
        <span className="section-label">⏱ Experience / Journey — Location 04</span>
        <h2 className="section-title">Education + Experience + Certifications</h2>
        <p className="section-subtitle">
          My developer journey so far — from engineering education to hands-on internship experience.
        </p>
      </div>

      <div className="journey-timeline">
        {journey.map((item, i) => (
          <div key={i} className="timeline-item reveal" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="timeline-marker">
              <span className="timeline-dot" />
              {i < journey.length - 1 && <span className="timeline-line" />}
            </div>
            <div className="timeline-content glass">
              <div className="timeline-type-badge" data-type={item.type}>
                {item.type === 'experience' ? 'Experience' : 'Education'}
              </div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-org">{item.org}</div>
              <div className="timeline-meta">
                <span className="timeline-period">{item.period}</span>
                <span className="timeline-sep">•</span>
                <span className="timeline-location">{item.location}</span>
              </div>
              <ul className="timeline-points">
                {item.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="certifications reveal">
        <h3 className="cert-heading">Certifications</h3>
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card glass">
              <div className="cert-icon">✓</div>
              <div className="cert-info">
                <div className="cert-name">{cert.name}</div>
                <div className="cert-org">{cert.org}</div>
                <div className="cert-desc">{cert.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
