import { useEffect, useMemo, useState } from 'react'
import './index.css'

type Page = 'room' | 'photo' | 'ai' | 'thoughts' | 'about'
const thoughts = ['有时候不是不想说话，只是不知道说什么。','我更喜欢观察，而不是成为人群的中心。','摄影让我可以表达那些不太容易说出来的东西。','安静不是空白，只是把注意力留给更细小的东西。']
const photos = [
  { id:'001', place:'WUHAN', year:'2026', title:'OBSERVATION #001', src:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=85' },
  { id:'002', place:'CITY / AFTERNOON', year:'2026', title:'OBSERVATION #002', src:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=85' },
  { id:'003', place:'QUIET CORNER', year:'2026', title:'OBSERVATION #003', src:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85' },
]
const aiWorks = [
  {title:'AI PHOTOGRAPHY / 01',src:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85'},
  {title:'GENERATIVE VISUAL / 02',src:'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85'},
  {title:'VISUAL EXPERIMENT / 03',src:'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?auto=format&fit=crop&w=900&q=85'},
]

function Battery({value}:{value:number}){return <div className="battery"><span>SOCIAL BATTERY</span><span className="battery-bars">{[0,1,2,3,4].map(i=><i key={i} className={i<Math.ceil(value/20)?'filled':''}/>)}</span><b>{value}%</b></div>}

export default function App(){
 const [page,setPage]=useState<Page>('room'),[battery,setBattery]=useState(82),[warm,setWarm]=useState(false),[quiet,setQuiet]=useState(false),[thought,setThought]=useState<string|null>(null),[image,setImage]=useState<typeof photos[0]|null>(null),[computer,setComputer]=useState(false),[cursor,setCursor]=useState({x:0,y:0}),[cursorLabel,setCursorLabel]=useState('')
 const reduceMotion=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches
 const spend=(n:number)=>setBattery(v=>Math.max(0,Math.min(100,v+n)))
 const go=(p:Page,cost=0)=>{spend(cost);setPage(p)}
 useEffect(()=>{const f=(e:MouseEvent)=>setCursor({x:e.clientX,y:e.clientY});addEventListener('mousemove',f);return()=>removeEventListener('mousemove',f)},[])
 useEffect(()=>{if(battery<=20)setQuiet(true)},[battery])
 const nav=(<nav>{[['01 ROOM','room'],['02 PHOTO','photo'],['03 AI','ai'],['04 THOUGHTS','thoughts'],['05 ABOUT','about']].map(([label,p])=><button key={p} onClick={()=>go(p as Page,p==='photo'?3:0)}>{label}</button>)}</nav>)
 return <main className={`app ${page} ${warm?'warm':''} ${quiet?'quiet':''}`}>
  <header className="system-bar"><button className="brand-button" onClick={()=>setPage('room')}>INTROVERT OS</button>{nav}<Battery value={battery}/></header>
  {page==='room'&&<Room onPage={go} warm={warm} setWarm={setWarm} setThought={setThought} setComputer={setComputer} setCursorLabel={setCursorLabel} />}
  {page==='photo'&&<Photography onOpen={setImage} />}
  {page==='ai'&&<AIWorks/>}
  {page==='thoughts'&&<Thoughts onOpen={(t)=>setThought(t)} />}
  {page==='about'&&<About/>}
  {image&&<Fullscreen item={image} close={()=>setImage(null)} />}
  {thought&&<div className="modal thought-pop" onClick={()=>setThought(null)}><span>THOUGHT / FRAGMENT</span><p>{thought}</p><small>CLICK TO CLOSE</small></div>}
  {computer&&<div className="modal system-panel"><button onClick={()=>setComputer(false)}>×</button><span>CREATIVE SYSTEM / HIDDEN</span><h2>SEE → THINK → MAKE</h2><p>Photography is observation.<br/>AIGC is another way to transform what was observed.</p></div>}
  {battery<=20&&<div className="low-energy"><span>LOW SOCIAL ENERGY</span><p>今天先到这里吧。</p><button onClick={()=>{setQuiet(true);setBattery(82)}}>进入独处模式</button></div>}
  {cursorLabel&&!reduceMotion&&<div className="cursor-label" style={{left:cursor.x+14,top:cursor.y+14}}>{cursorLabel}</div>}
 </main>
}

function Room({onPage,warm,setWarm,setThought,setComputer,setCursorLabel}:{onPage:(p:Page,c?:number)=>void;warm:boolean;setWarm:(v:boolean)=>void;setThought:(v:string)=>void;setComputer:(v:boolean)=>void;setCursorLabel:(v:string)=>void}){
 const objects=[
  ['camera','VIEW','CAMERA','Photography / Observation',()=>onPage('photo',3)],['computer','ENTER','COMPUTER','AI / Visual Experiments',()=>{setComputer(true)}],['notebook','READ','NOTEBOOK','Thoughts / Fragments',()=>setThought(thoughts[Math.floor(Math.random()*thoughts.length)])],['headphones','LISTEN','HEADPHONES','Mood / Music',()=>{}],['folder','OPEN','FOLDER','Selected Works',()=>onPage('ai',3)],['lamp','CHANGE','LAMP','Room Atmosphere',()=>setWarm(!warm)],['door','LEAVE','DOOR','Contact / Exit',()=>onPage('about',-8)]]
 return <section className="room-stage"><div className="room-title"><span>ROOM / 001</span><strong>MY PRIVATE SPACE</strong></div><div className="window-light"/><div className="desk"/><div className="floor-line"/>{objects.map(([id,label,title,desc,action])=><button key={id as string} className={`room-object object-${id}`} onClick={action as ()=>void} onMouseEnter={()=>setCursorLabel(label as string)} onMouseLeave={()=>setCursorLabel('')}><span className="object-shape"/><span className="object-name">{title as string}</span><span className="object-description">{desc as string}</span></button>)}<p className="room-note">move slowly.<br/>look closer.</p></section>
}
function Photography({onOpen}:{onOpen:(v<typeof photos[0]>)=>void}){return <section className="content photo-content"><div className="section-intro"><span>02 / PHOTOGRAPHY</span><h1>I observe more<br/>than I speak.</h1><p>摄影是我最自然的表达方式。</p></div><div className="photo-grid">{photos.map((p,i)=><button key={p.id} className={`photo-item photo-${i}`} onClick={()=>onOpen(p)}><img src={p.src} alt={p.title}/><div><span>PHOTOGRAPHY / {p.id}</span><span>{p.place} · {p.year}</span></div></button>)}</div></section>}
function AIWorks(){return <section className="content ai-content"><div className="section-intro"><span>03 / AI · VISUAL EXPERIMENTS</span><h1>Things I make<br/>when reality is not enough.</h1><p>AI 是第二层能力：把观察继续向前推。</p></div><div className="ai-grid">{aiWorks.map((w,i)=><figure className={`ai-item ai-${i}`} key={w.title}><img src={w.src} alt={w.title}/><figcaption>{w.title}</figcaption></figure>)}</div></section>}
function Thoughts({onOpen}:{onOpen:(v:string)=>void}){return <section className="content thoughts-content"><div className="section-intro"><span>04 / THOUGHTS</span><h1>Fragments<br/>I don't usually say.</h1></div><div className="thought-list">{thoughts.map((t,i)=><button key={t} onClick={()=>onOpen(t)}><span>0{i+1}</span><p>{t}</p><small>READ →</small></button>)}</div></section>}
function About(){return <section className="content about-content"><div className="profile-head"><span>05 / PROFILE</span><h1>I</h1><div><strong>TYPE</strong><b>I</b><strong>STATUS</strong><b>OBSERVING...</b></div></div><div className="profile-grid"><div><span>GOOD AT</span><p>Visual Thinking<br/>Photography<br/>AI Generation<br/>Visual Storytelling</p></div><div><span>NOT GOOD AT</span><p>Small Talk<br/>Crowded Places<br/>Phone Calls<br/>Forced Social Interaction</p></div><div><span>CORE</span><p>Photography aesthetics<br/>visual expression<br/>quiet observation</p></div></div></section>}
function Fullscreen({item,close}:{item:typeof photos[0];close:()=>void}){return <div className="fullscreen" onClick={close}><img src={item.src} alt={item.title}/><div><span>PHOTOGRAPHY / {item.id}</span><b>{item.place} · {item.year}</b></div></div>}
