import { dsaTopics } from '../data/dsaTopics'
import './DSATicker.css'

export default function DSATicker() {
  const items = [...dsaTopics, ...dsaTopics]

  return (
    <div className="dsa-ticker" aria-hidden="true">
      <div className="dsa-ticker-track">
        {items.map((topic, i) => (
          <span key={i} className="dsa-ticker-item">
            <span className="dsa-ticker-dot" />
            {topic}
          </span>
        ))}
      </div>
      <div className="dsa-ticker-fade dsa-ticker-fade-left" />
      <div className="dsa-ticker-fade dsa-ticker-fade-right" />
    </div>
  )
}
