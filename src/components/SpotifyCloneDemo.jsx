import { useState, useEffect } from 'react'
import './SpotifyCloneDemo.css'

const TRACKS = [
  { id: 1, title: 'Midnight Drive', artist: 'The Synthwave Collective', duration: '3:42', color: '#1db954' },
  { id: 2, title: 'Echoes in Code', artist: 'Binary Sunset', duration: '4:15', color: '#535353' },
  { id: 3, title: 'Algorithm Blues', artist: 'The Java Beans', duration: '3:28', color: '#1ed760' },
  { id: 4, title: 'React State of Mind', artist: 'Use Effect', duration: '3:55', color: '#1db954' },
  { id: 5, title: 'Recursive Dreams', artist: 'Stack Overflow', duration: '5:10', color: '#535353' },
  { id: 6, title: 'Async Lullaby', artist: 'Promise.all', duration: '4:02', color: '#1ed760' },
]

export default function SpotifyCloneDemo({ accent }) {
  const [selected, setSelected] = useState(TRACKS[0])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval
    if (playing) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false)
            return 0
          }
          return p + 0.5
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [playing])

  const selectTrack = (track) => {
    setSelected(track)
    setProgress(0)
    setPlaying(true)
  }

  const togglePlay = () => {
    if (progress >= 100) setProgress(0)
    setPlaying(!playing)
  }

  return (
    <div className="spotify-demo" style={{ '--demo-accent': accent }}>
      <div className="demo-header">
        <div className="demo-title">
          <span className="demo-icon">♪</span>
          Spotify Clone — Interactive Preview
        </div>
        <button className="demo-action-btn" onClick={() => { setProgress(0); setPlaying(false) }}>
          VIEW STUDY
        </button>
      </div>

      <div className="spotify-preview">
        <div className="spotify-sidebar">
          <div className="spotify-logo">
            <span className="spotify-logo-icon">♪</span>
            <span className="spotify-logo-text">SpotifyClone</span>
          </div>
          <ul className="spotify-nav">
            <li className="spotify-nav-item active">
              <span>⌂</span> Home
            </li>
            <li className="spotify-nav-item">
              <span>🔍</span> Search
            </li>
            <li className="spotify-nav-item">
              <span>▤</span> Your Library
            </li>
          </ul>
          <div className="spotify-playlists">
            <span className="spotify-playlists-title">Playlists</span>
            <ul>
              <li>Liked Songs</li>
              <li>Coding Beats</li>
              <li>Focus Flow</li>
              <li>Chill Dev</li>
            </ul>
          </div>
        </div>

        <div className="spotify-main">
          <div className="spotify-main-header">
            <h3 className="spotify-main-title">Good Evening</h3>
            <p className="spotify-main-subtitle">Select a track to start playing</p>
          </div>

          <div className="spotify-track-grid">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                className={`spotify-track-card ${selected.id === track.id ? 'selected' : ''}`}
                onClick={() => selectTrack(track)}
              >
                <div className="spotify-track-art" style={{ background: `linear-gradient(135deg, ${track.color}, #181818)` }}>
                  {selected.id === track.id && playing && (
                    <div className="spotify-playing-bars">
                      <span /><span /><span /><span />
                    </div>
                  )}
                </div>
                <div className="spotify-track-info">
                  <span className="spotify-track-title">{track.title}</span>
                  <span className="spotify-track-artist">{track.artist}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="spotify-player">
          <div className="spotify-player-info">
            <div className="spotify-player-art" style={{ background: `linear-gradient(135deg, ${selected.color}, #181818)` }} />
            <div className="spotify-player-track">
              <span className="spotify-player-title">{selected.title}</span>
              <span className="spotify-player-artist">{selected.artist}</span>
            </div>
          </div>

          <div className="spotify-player-controls">
            <button className="spotify-ctrl-btn" onClick={() => {
              const idx = TRACKS.findIndex((t) => t.id === selected.id)
              selectTrack(TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length])
            }} aria-label="Previous">
              ⏮
            </button>
            <button className="spotify-play-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className="spotify-ctrl-btn" onClick={() => {
              const idx = TRACKS.findIndex((t) => t.id === selected.id)
              selectTrack(TRACKS[(idx + 1) % TRACKS.length])
            }} aria-label="Next">
              ⏭
            </button>
          </div>

          <div className="spotify-player-progress">
            <span className="spotify-time">{formatTime(progress, selected.duration)}</span>
            <div className="spotify-progress-bar">
              <div className="spotify-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="spotify-time">{selected.duration}</span>
          </div>
        </div>
      </div>

      <div className="spotify-demo-note">
        Personal clone project — not connected to Spotify's API
      </div>
    </div>
  )
}

function formatTime(progress, duration) {
  const [min, sec] = duration.split(':').map(Number)
  const totalSec = min * 60 + sec
  const currentSec = Math.floor((progress / 100) * totalSec)
  const m = Math.floor(currentSec / 60)
  const s = currentSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
