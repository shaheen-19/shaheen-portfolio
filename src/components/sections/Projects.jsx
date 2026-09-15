import { useState } from 'react'
import { projects } from '../../data/projects'
import ProjectCard from '../ProjectCard'
import ProjectCaseStudy from '../ProjectCaseStudy'
import './Projects.css'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section project-district">
      <div className="section-header reveal">
        <span className="section-label">▣ Project District — Location 02</span>
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A collection of projects spanning frontend interfaces and algorithmic systems.
          Click any project to open a detailed case study.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      {selected && <ProjectCaseStudy project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
