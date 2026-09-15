import './ProjectCard.css'

export default function ProjectCard({ project, index, onClick }) {
  return (
    <button
      className="project-card reveal"
      style={{ '--card-accent': project.accent, animationDelay: `${index * 0.08}s` }}
      onClick={onClick}
      aria-label={`Open case study for ${project.name}`}
    >
      <div className="project-card-glow" />
      <div className="project-card-top">
        <div className="project-card-number">P0{index + 1}</div>
        <div className="project-card-icon" style={{ '--card-accent': project.accent }}>
          {project.hasDemo ? '◆' : '◇'}
        </div>
      </div>
      <h3 className="project-card-name">{project.name}</h3>
      <p className="project-card-tagline">{project.tagline}</p>
      <div className="project-card-techs">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="project-card-tech">{tech}</span>
        ))}
        {project.technologies.length > 3 && (
          <span className="project-card-tech project-card-tech-more">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>
      <div className="project-card-footer">
        <span className="project-card-cta">
          View Case Study
          <span className="project-card-arrow">→</span>
        </span>
        {project.hasDemo && (
          <span className="project-card-demo-badge">
            <span className="demo-dot" /> {project.demoLabel || 'Interactive Demo'}
          </span>
        )}
      </div>
    </button>
  )
}
