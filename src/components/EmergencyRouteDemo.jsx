import { useState, useEffect, useRef, useCallback } from 'react'
import './EmergencyRouteDemo.css'

const NODES = [
  { id: 'A', x: 60, y: 80, label: 'Start' },
  { id: 'B', x: 180, y: 50, label: 'B' },
  { id: 'C', x: 180, y: 160, label: 'C' },
  { id: 'D', x: 320, y: 100, label: 'D' },
  { id: 'E', x: 320, y: 200, label: 'E' },
  { id: 'F', x: 440, y: 150, label: 'Destination' },
]

const EDGES = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'D', weight: 3 },
  { from: 'C', to: 'D', weight: 1 },
  { from: 'C', to: 'E', weight: 5 },
  { from: 'D', to: 'F', weight: 2 },
  { from: 'E', to: 'F', weight: 3 },
]

const STEPS = [
  'Initialize: Set Start distance = 0, all others = ∞',
  'Visit A (dist=0) → Relax neighbors: B=4, C=2',
  'Visit C (dist=2) → Relax neighbors: D=3, E=7',
  'Visit D (dist=3) → Relax neighbor: F=5',
  'Shortest path found: A → C → D → F (total = 5)',
]

export default function EmergencyRouteDemo({ accent = '#22d3ee' }) {
  const [phase, setPhase] = useState(0)
  const [visited, setVisited] = useState(new Set())
  const [currentNode, setCurrentNode] = useState(null)
  const [pathEdges, setPathEdges] = useState([])
  const [running, setRunning] = useState(false)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const run = useCallback(() => {
    clearTimers()
    setPhase(0)
    setVisited(new Set())
    setCurrentNode(null)
    setPathEdges([])
    setRunning(true)

    const sequence = [
      { delay: 400, action: () => setPhase(1) },
      { delay: 1000, action: () => {
        setCurrentNode('A')
        setVisited(new Set(['A']))
      }},
      { delay: 1800, action: () => {
        setPhase(2)
        setCurrentNode('C')
        setVisited(new Set(['A', 'C']))
      }},
      { delay: 2800, action: () => {
        setPhase(3)
        setCurrentNode('D')
        setVisited(new Set(['A', 'C', 'D']))
      }},
      { delay: 3800, action: () => {
        setPhase(4)
        setCurrentNode('F')
        setVisited(new Set(['A', 'C', 'D', 'F']))
        setPathEdges([
          { from: 'A', to: 'C' },
          { from: 'C', to: 'D' },
          { from: 'D', to: 'F' },
        ])
      }},
      { delay: 4600, action: () => setRunning(false) },
    ]

    let cumulative = 0
    sequence.forEach((step) => {
      cumulative = step.delay
      timersRef.current.push(setTimeout(step.action, cumulative))
    })
  }, [])

  useEffect(() => {
    return () => clearTimers()
  }, [])

  const isPathEdge = (from, to) =>
    pathEdges.some((e) => (e.from === from && e.to === to) || (e.from === to && e.to === from))

  return (
    <div className="route-demo">
      <div className="route-demo-header">
        <div className="route-demo-title">
          <span className="route-demo-icon">⬡</span>
          Emergency Route Simulation
        </div>
        <button
          className="route-demo-run"
          onClick={run}
          disabled={running}
          style={{ '--demo-accent': accent }}
          aria-label="Run simulation again"
        >
          {running ? (
            <>
              <span className="run-spinner" /> Running...
            </>
          ) : (
            <>
              <span className="run-icon">▶</span> RUN AGAIN
            </>
          )}
        </button>
      </div>

      <div className="route-demo-canvas">
        <svg className="route-svg" viewBox="0 0 500 260" preserveAspectRatio="xMidYMid meet">
          {EDGES.map((edge, i) => {
            const from = NODES.find((n) => n.id === edge.from)
            const to = NODES.find((n) => n.id === edge.to)
            const isPath = isPathEdge(edge.from, edge.to)
            return (
              <g key={i}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`route-edge ${isPath ? 'route-edge-path' : ''}`}
                  style={{ '--demo-accent': accent }}
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 4}
                  className="route-edge-weight"
                  textAnchor="middle"
                >
                  {edge.weight}
                </text>
              </g>
            )
          })}
          {NODES.map((node) => {
            const isVisited = visited.has(node.id)
            const isCurrent = currentNode === node.id
            const isStart = node.id === 'A'
            const isEnd = node.id === 'F'
            return (
              <g key={node.id}>
                {(isCurrent || (isVisited && isPathEdges(node.id, pathEdges))) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    className="route-node-pulse"
                    style={{ '--demo-accent': accent }}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="14"
                  className={`route-node ${isVisited ? 'route-node-visited' : ''} ${isCurrent ? 'route-node-current' : ''}`}
                  style={{ '--demo-accent': accent }}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  className="route-node-label"
                  textAnchor="middle"
                >
                  {node.id}
                </text>
                <text
                  x={node.x}
                  y={node.y - 22}
                  className={`route-node-tag ${isStart ? 'route-node-tag-start' : ''} ${isEnd ? 'route-node-tag-end' : ''}`}
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="route-demo-steps">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`route-step ${phase >= i + 1 ? 'route-step-active' : ''} ${phase === i + 1 && running ? 'route-step-current' : ''}`}
            style={{ '--demo-accent': accent }}
          >
            <span className="route-step-num">{i + 1}</span>
            <span className="route-step-text">{step}</span>
          </div>
        ))}
      </div>

      <div className="route-demo-legend">
        <div className="route-legend-item">
          <span className="route-legend-dot route-legend-visited" style={{ '--demo-accent': accent }} />
          Visited
        </div>
        <div className="route-legend-item">
          <span className="route-legend-dot route-legend-current" style={{ '--demo-accent': accent }} />
          Current Node
        </div>
        <div className="route-legend-item">
          <span className="route-legend-line" style={{ '--demo-accent': accent }} />
          Shortest Path
        </div>
      </div>
    </div>
  )
}

function isPathEdges(nodeId, pathEdges) {
  return pathEdges.some((e) => e.from === nodeId || e.to === nodeId)
}
