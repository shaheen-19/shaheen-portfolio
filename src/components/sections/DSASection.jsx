import DSATicker from '../DSATicker'
import { dsaTopicCards } from '../../data/dsaTopics'
import './DSASection.css'

export default function DSASection() {
  return (
    <section id="dsa" className="section dsa-arena">
      <div className="section-header reveal">
        <span className="section-label">⬡ DSA Arena — Location 03</span>
        <h2 className="section-title">Java + DSA — Problem Solving Foundation</h2>
        <p className="section-subtitle">
          A strong algorithmic foundation supporting my frontend development with structured
          problem-solving and computational thinking.
        </p>
      </div>

      <DSATicker />

      <div className="dsa-cards">
        {dsaTopicCards.map((card, i) => (
          <div key={card.title} className="dsa-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <h3 className="dsa-card-title">{card.title}</h3>
            <p className="dsa-card-desc">{card.desc}</p>
            <div className="dsa-card-topics">
              {card.topics.map((topic) => (
                <span key={topic} className="dsa-card-topic">{topic}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
