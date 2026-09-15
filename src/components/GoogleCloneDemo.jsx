import { useState, useRef } from 'react'
import './GoogleCloneDemo.css'

const SUGGESTIONS = [
  'what is dijkstra algorithm',
  'how to learn react js',
  'frontend developer roadmap 2026',
  'java data structures tutorial',
  'css flexbox vs grid',
  'javascript array methods',
]

export default function GoogleCloneDemo({ accent }) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const inputRef = useRef(null)

  const filtered = query
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleSuggestionClick = (s) => {
    setQuery(s)
    setSubmitted(true)
    setFocused(false)
    inputRef.current?.blur()
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((p) => Math.min(p + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((p) => Math.max(p - 1, -1))
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault()
      handleSuggestionClick(filtered[activeSuggestion])
    }
  }

  return (
    <div className="google-demo" style={{ '--demo-accent': accent }}>
      <div className="demo-header">
        <div className="demo-title">
          <span className="demo-icon">◇</span>
          Google Homepage Clone — Interactive Preview
        </div>
        <button className="demo-action-btn" onClick={() => { setQuery(''); setSubmitted(false); inputRef.current?.focus() }}>
          {('EXPLORE DEMO')}
        </button>
      </div>

      <div className="google-preview">
        <div className="google-bar">
          <span className="google-dot google-dot-r" />
          <span className="google-dot google-dot-y" />
          <span className="google-dot google-dot-g" />
          <span className="google-dot google-dot-b" />
          <span className="google-brand">SearchClone</span>
        </div>

        <div className="google-search-area">
          <div className="google-logo">
            <span className="google-logo-g">S</span>
            <span className="google-logo-e">e</span>
            <span className="google-logo-a">a</span>
            <span className="google-logo-r">r</span>
            <span className="google-logo-c">c</span>
            <span className="google-logo-h">h</span>
          </div>

          <form className="google-search-form" onSubmit={handleSubmit}>
            <div className={`google-search-box ${focused ? 'focused' : ''}`}>
              <svg className="google-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveSuggestion(-1); setSubmitted(false) }}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onKeyDown={handleKeyDown}
                placeholder="Search Google or type a URL"
                aria-label="Search"
              />
              <button type="button" className="google-mic" aria-label="Voice search" onClick={() => { setQuery('frontend developer'); setSubmitted(false) }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
                  <path d="M19 11a7 7 0 01-14 0M12 18v4" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            {focused && filtered.length > 0 && (
              <ul className="google-suggestions">
                {filtered.slice(0, 6).map((s, i) => (
                  <li
                    key={s}
                    className={`google-suggestion ${i === activeSuggestion ? 'active' : ''}`}
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="google-buttons">
            <button type="button" className="google-btn" onClick={handleSubmit}>
              SearchClone Search
            </button>
            <button type="button" className="google-btn" onClick={() => { setQuery("I'm feeling lucky"); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000) }}>
              I'm Feeling Lucky
            </button>
          </div>

          {submitted && (
            <div className="google-result-msg">
              <span className="google-result-icon">✓</span>
              Searching for "<strong>{query}</strong>" — This is a clone preview, not a real search.
            </div>
          )}
        </div>

        <div className="google-footer">
          <span>Personal Clone Project</span>
          <span>HTML · CSS · JavaScript</span>
        </div>
      </div>
    </div>
  )
}
