import { useState, useRef } from 'react'
import './NetflixCloneDemo.css'

const MOVIES = [
  { id: 1, title: 'Crimson Horizon', category: 'Trending', desc: 'A thrilling journey across a dystopian frontier.', color: '#e50914', year: '2025', rating: '16+' },
  { id: 2, title: 'Silent Protocol', category: 'Trending', desc: 'A hacker uncovers a dangerous conspiracy.', color: '#221', year: '2025', rating: '18+' },
  { id: 3, title: 'The Last Algorithm', category: 'Trending', desc: 'An AI scientist races against time to save humanity.', color: '#1a1a3e', year: '2024', rating: '13+' },
  { id: 4, title: 'Neon Shadows', category: 'Popular', desc: 'A neon-lit chase through a futuristic city.', color: '#0a3', year: '2025', rating: '16+' },
  { id: 5, title: 'Echo Valley', category: 'Popular', desc: 'A mysterious signal changes a small town forever.', color: '#3a0a3a', year: '2024', rating: '13+' },
  { id: 6, title: 'Quantum Drive', category: 'Popular', desc: 'A space mission goes terribly wrong.', color: '#003a5a', year: '2025', rating: '12+' },
  { id: 7, title: 'Midnight Code', category: 'New Releases', desc: 'A programmer discovers a hidden world inside code.', color: '#1e1e1e', year: '2026', rating: '16+' },
  { id: 8, title: 'Final Circuit', category: 'New Releases', desc: 'The last robot on Earth searches for meaning.', color: '#3a1a00', year: '2026', rating: '12+' },
]

const FAQ_ITEMS = [
  {
    q: 'What is Netflix?',
    a: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.',
  },
  {
    q: 'How much does Netflix cost?',
    a: 'Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from basic to premium — this is a clone preview, not real pricing.',
  },
  {
    q: 'Where can I watch?',
    a: 'Watch anywhere, anytime, on an unlimited number of devices. Sign in with your account to watch instantly on the web from your personal computer or on any internet-connected device.',
  },
  {
    q: 'What can I watch on Netflix?',
    a: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, and more. Watch as much as you want, anytime you want — this clone preview demonstrates the browsing UI.',
  },
]

export default function NetflixCloneDemo({ accent }) {
  const [selected, setSelected] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Trending')
  const [openFaq, setOpenFaq] = useState(0)
  const rowRefs = useRef({})

  const categories = ['Trending', 'Popular', 'New Releases']

  const scrollRow = (cat, dir) => {
    const el = rowRefs.current[cat]
    if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <div className="netflix-demo" style={{ '--demo-accent': accent }}>
      <div className="demo-header">
        <div className="demo-title">
          <span className="demo-icon">◆</span>
          Netflix Clone — Interactive Preview
        </div>
        <button className="demo-action-btn" onClick={() => setSelected(null)}>
          OPEN PREVIEW
        </button>
      </div>

      <div className="netflix-preview">
        <div className="netflix-nav">
          <span className="netflix-logo">NETFLIX<span className="netflix-logo-dot">.</span></span>
          <div className="netflix-nav-links">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`netflix-nav-link ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="netflix-hero" style={{ background: `linear-gradient(135deg, ${MOVIES[0].color}, #000)` }}>
          <div className="netflix-hero-content">
            <span className="netflix-hero-tag">Featured</span>
            <h3 className="netflix-hero-title">{MOVIES[0].title}</h3>
            <p className="netflix-hero-desc">{MOVIES[0].desc}</p>
            <div className="netflix-hero-actions">
              <button className="netflix-play-btn" onClick={() => setSelected(MOVIES[0])}>
                <span>▶</span> Play
              </button>
              <button className="netflix-info-btn" onClick={() => setSelected(MOVIES[0])}>
                <span>ⓘ</span> More Info
              </button>
            </div>
          </div>
        </div>

        <div className="netflix-rows">
          {categories.map((cat) => {
            const movies = MOVIES.filter((m) => m.category === cat)
            return (
              <div key={cat} className="netflix-row">
                <div className="netflix-row-header">
                  <h4 className="netflix-row-title">{cat}</h4>
                  <div className="netflix-row-arrows">
                    <button onClick={() => scrollRow(cat, -1)} aria-label="Scroll left">‹</button>
                    <button onClick={() => scrollRow(cat, 1)} aria-label="Scroll right">›</button>
                  </div>
                </div>
                <div className="netflix-row-track" ref={(el) => (rowRefs.current[cat] = el)}>
                  {movies.map((movie) => (
                    <button
                      key={movie.id}
                      className="netflix-card"
                      style={{ background: `linear-gradient(135deg, ${movie.color}, #111)` }}
                      onClick={() => setSelected(movie)}
                    >
                      <div className="netflix-card-overlay">
                        <span className="netflix-card-title">{movie.title}</span>
                        <span className="netflix-card-meta">{movie.year} · {movie.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="netflix-faq">
          <h3 className="netflix-faq-title">Frequently Asked Questions</h3>
          <div className="netflix-faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`netflix-faq-item ${openFaq === i ? 'open' : ''}`}>
                <button
                  className="netflix-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className="netflix-faq-toggle">{openFaq === i ? '✕' : '+'}</span>
                </button>
                <div className="netflix-faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="netflix-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}>
          <div className="netflix-modal" style={{ background: `linear-gradient(180deg, ${selected.color}, #111 60%)` }}>
            <button className="netflix-modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            <div className="netflix-modal-content">
              <span className="netflix-modal-tag">{selected.category}</span>
              <h3 className="netflix-modal-title">{selected.title}</h3>
              <div className="netflix-modal-meta">
                <span>{selected.year}</span>
                <span className="netflix-modal-rating">{selected.rating}</span>
              </div>
              <p className="netflix-modal-desc">{selected.desc}</p>
              <div className="netflix-modal-actions">
                <button className="netflix-play-btn"><span>▶</span> Play</button>
                <button className="netflix-info-btn"><span>+</span> My List</button>
              </div>
            </div>
            <div className="netflix-modal-note">
              Personal clone project — not affiliated with Netflix
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
