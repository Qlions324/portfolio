import { useEffect, useMemo, useState } from 'react'
import './index.css'

type Mode = 'home' | 'room'

type RoomObject = {
  id: string
  label: string
  title: string
  description: string
  x: string
  y: string
  action: () => void
}

const nav = ['01 ROOM', '02 PHOTO', '03 AI', '04 THOUGHTS', '05 ABOUT']

function Battery({ value }: { value: number }) {
  const bars = Math.max(0, Math.ceil(value / 20))
  return (
    <div className="battery" aria-label={`Social Battery ${value}%`}>
      <span>SOCIAL BATTERY</span>
      <span className="battery-bars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((bar) => (
          <i key={bar} className={bar < bars ? 'filled' : ''} />
        ))}
      </span>
      <strong>{value}%</strong>
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState<Mode>('home')
  const [battery, setBattery] = useState(82)
  const [roomWarmth, setRoomWarmth] = useState(false)
  const [thought, setThought] = useState('')
  const [computerOpen, setComputerOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [cursorLabel, setCursorLabel] = useState('')

  const thoughts = useMemo(() => [
    '有时候不是不想说话，只是不知道说什么。',
    '我更喜欢观察，而不是成为人群的中心。',
    '摄影让我可以表达那些不太容易说出来的东西。',
  ], [])

  const spend = (amount: number) => setBattery((v) => Math.max(0, Math.min(100, v + amount)))

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const enterRoom = () => {
    setMode('room')
    spend(2)
  }

  const roomObjects: RoomObject[] = [
    { id: 'camera', label: 'VIEW', title: 'CAMERA', description: 'Photography / Observation', x: '16%', y: '31%', action: () => spend(3) },
    { id: 'computer', label: 'ENTER', title: 'COMPUTER', description: 'AI / Visual Experiments', x: '57%', y: '23%', action: () => { spend(3); setComputerOpen(true) } },
    { id: 'notebook', label: 'READ', title: 'NOTEBOOK', description: 'Thoughts / Fragments', x: '42%', y: '65%', action: () => { spend(2); setThought(thoughts[Math.floor(Math.random() * thoughts.length)]) } },
    { id: 'headphones', label: 'LISTEN', title: 'HEADPHONES', description: 'Mood / Music', x: '73%', y: '64%', action: () => spend(2) },
    { id: 'folder', label: 'OPEN', title: 'FOLDER', description: 'Selected Works', x: '25%', y: '69%', action: () => spend(3) },
    { id: 'lamp', label: 'CHANGE', title: 'LAMP', description: 'Room Atmosphere', x: '80%', y: '34%', action: () => setRoomWarmth((v) => !v) },
    { id: 'door', label: 'LEAVE', title: 'DOOR', description: 'Contact / Exit', x: '91%', y: '67%', action: () => { spend(-8); setMode('home') } },
  ]

  if (mode === 'home') {
    return (
      <main className="app home" onMouseLeave={() => setCursorLabel('')}>
        <header className="system-bar">
          <span className="brand">INTROVERT OS</span>
          <span className="system-state">PRIVATE SPACE / 01</span>
          <Battery value={battery} />
        </header>
        <section className="welcome">
          <div className="welcome-copy">
            <p className="eyebrow">A DIGITAL ROOM FOR ONE PERSON</p>
            <h1>欢迎来到<br />我的世界</h1>
            <p className="lead">不擅长主动表达，<br />但很擅长观察。</p>
          </div>
          <div className="entry-list" aria-label="进入方式">
            <button onClick={() => { spend(5); enterRoom() }} onMouseEnter={() => setCursorLabel('QUIET')} onMouseLeave={() => setCursorLabel('')}>
              <span>01</span><span>安静地看看</span><small>PHOTOGRAPHY MODE</small>
            </button>
            <button onClick={enterRoom} onMouseEnter={() => setCursorLabel('EXPLORE')} onMouseLeave={() => setCursorLabel('')}>
              <span>02</span><span>随便逛逛</span><small>DIGITAL ROOM</small>
            </button>
            <button onClick={() => { spend(-3); setMode('room') }} onMouseEnter={() => setCursorLabel('ME')} onMouseLeave={() => setCursorLabel('')}>
              <span>03</span><span>我想认识你</span><small>PROFILE / I</small>
            </button>
          </div>
          <p className="hint">TAKE YOUR TIME. NOTHING HERE NEEDS TO BE CLICKED.</p>
        </section>
        <footer className="home-footer"><span>WU HAN / 2026</span><span>OBSERVING...</span></footer>
        {cursorLabel && <div className="cursor-label" style={{ left: cursor.x + 14, top: cursor.y + 14 }}>{cursorLabel}</div>}
      </main>
    )
  }

  return (
    <main className={`app room ${roomWarmth ? 'warm' : ''}`}>
      <header className="system-bar">
        <button className="brand-button" onClick={() => setMode('home')}>INTROVERT OS</button>
        <nav>{nav.map((item, index) => <button key={item} onClick={() => index === 0 ? undefined : spend(index === 1 ? 3 : -1)}>{item}</button>)}</nav>
        <Battery value={battery} />
      </header>
      <section className="room-stage" aria-label="Digital Room">
        <div className="room-title"><span>ROOM / 001</span><strong>MY PRIVATE SPACE</strong></div>
        <div className="window-light" />
        <div className="desk" />
        <div className="floor-line" />
        {roomObjects.map((object) => (
          <button
            key={object.id}
            className={`room-object object-${object.id}`}
            style={{ left: object.x, top: object.y }}
            onClick={object.action}
            onMouseEnter={() => setCursorLabel(object.label)}
            onMouseLeave={() => setCursorLabel('')}
            aria-label={`${object.title}: ${object.description}`}
          >
            <span className="object-shape" />
            <span className="object-name">{object.title}</span>
            <span className="object-description">{object.description}</span>
          </button>
        ))}
        <p className="room-note">move slowly.<br />look closer.</p>
        {thought && <div className="thought-pop" role="dialog" onClick={() => setThought('')}><span>THOUGHT / RANDOM</span><p>{thought}</p><small>CLICK TO CLOSE</small></div>}
        {computerOpen && <div className="system-panel" role="dialog"><button onClick={() => setComputerOpen(false)}>×</button><span>CREATIVE SYSTEM / HIDDEN</span><h2>SEE → THINK → MAKE</h2><p>Photography is observation.<br />AIGC is another way to transform what was observed.</p></div>}
      </section>
      {battery <= 20 && <div className="low-energy"><span>LOW SOCIAL ENERGY</span><p>今天先到这里吧。</p><button onClick={() => setBattery(82)}>进入独处模式</button></div>}
      {cursorLabel && <div className="cursor-label" style={{ left: cursor.x + 14, top: cursor.y + 14 }}>{cursorLabel}</div>}
    </main>
  )
}
