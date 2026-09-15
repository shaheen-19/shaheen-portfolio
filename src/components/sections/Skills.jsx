import { skills } from '../../data/skills'
import './Skills.css'

export default function Skills() {
  const frontend = skills.filter((s) => s.category === 'frontend')
  const foundation = skills.filter((s) => s.category === 'foundation')

  return (
    <section id="skills" className="section code-lab">
      <div className="section-header reveal">
        <span className="section-label">⬢ Code Lab — Location 01</span>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          The tools I use to build modern, responsive, and interactive web experiences.
        </p>
      </div>

      <div className="skills-group reveal">
        <h3 className="skills-group-label">
          <span className="skills-group-tag">Frontend Core</span>
          <span className="skills-group-hint">Primary stack</span>
        </h3>
        <div className="skills-grid skills-grid-frontend">
          {frontend.map((skill) => (
            <div key={skill.name} className="skill-card skill-card-frontend">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-group reveal">
        <h3 className="skills-group-label">
          <span className="skills-group-tag skills-group-tag-foundation">Technical Foundation</span>
          <span className="skills-group-hint">Supporting stack</span>
        </h3>
        <div className="skills-grid skills-grid-foundation">
          {foundation.map((skill) => (
            <div key={skill.name} className="skill-card skill-card-foundation">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
