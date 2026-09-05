'use client';

import { FormEvent, useMemo, useState } from 'react';

type View = 'overview' | 'projects' | 'people' | 'activity' | 'settings';
type Project = { id:number; code:string; name:string; description:string; category:string; status:'Live'|'Building'|'Paused'; access:'Private'|'Family'|'Public'; color:string };

const initialProjects: Project[] = [
  { id:1, code:'YE', name:'Your Expense Manager', description:'Track budgets, expenses and monthly goals.', category:'Finance', status:'Live', access:'Private', color:'coral' },
  { id:2, code:'YH', name:'Your Household Manager', description:'Find, organize and track everything at home.', category:'Home', status:'Live', access:'Family', color:'blue' },
  { id:3, code:'YS', name:'Your House Structure Manager', description:'Manage rooms, maintenance and property records.', category:'Property', status:'Building', access:'Private', color:'gold' },
  { id:4, code:'FT', name:'Family Tree', description:'Preserve family connections, stories and history.', category:'Family', status:'Building', access:'Family', color:'purple' },
  { id:5, code:'DR', name:'Dayaro Radio', description:'Gujarati music and community radio experience.', category:'Media', status:'Live', access:'Public', color:'green' },
  { id:6, code:'GR', name:'ST Gujarat Radio', description:'A live radio home for Gujarat listeners.', category:'Media', status:'Live', access:'Public', color:'pink' },
];

const nav = [
  { id:'overview' as View, icon:'⌂', label:'Overview' }, { id:'projects' as View, icon:'▦', label:'Projects' },
  { id:'people' as View, icon:'♙', label:'People' }, { id:'activity' as View, icon:'◷', label:'Activity' },
  { id:'settings' as View, icon:'⚙', label:'Settings' },
];

export default function Home() {
  const [view,setView]=useState<View>('overview');
  const [projects,setProjects]=useState(initialProjects);
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const [modal,setModal]=useState(false);
  const [notice,setNotice]=useState('');
  const visible=useMemo(()=>projects.filter(p=>(filter==='All'||p.status===filter)&&p.name.toLowerCase().includes(query.toLowerCase())),[projects,filter,query]);
  const openView=(next:View)=>{setView(next);setQuery('');};
  const saveProject=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const form=new FormData(e.currentTarget);const name=String(form.get('name'));const code=name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();setProjects(x=>[...x,{id:Date.now(),code,name,description:String(form.get('description')),category:String(form.get('category')),status:String(form.get('status')) as Project['status'],access:String(form.get('access')) as Project['access'],color:'mint'}]);setModal(false);setNotice(`${name} was added`);setTimeout(()=>setNotice(''),2500);};

  return <main className="app-shell">
    <aside className="sidebar">
      <button className="brand-mark" onClick={()=>openView('overview')} aria-label="YAM home">Y</button>
      <nav aria-label="Primary navigation">{nav.map(item=><button key={item.id} onClick={()=>openView(item.id)} className={`nav-button ${view===item.id?'active':''}`} aria-label={item.label} title={item.label}><span>{item.icon}</span><em>{item.label}</em></button>)}</nav>
      <button className="avatar" onClick={()=>openView('settings')} aria-label="Profile">YD</button>
    </aside>
    <section className="workspace">
      <header className="topbar">
        <div><p className="eyebrow">YAM PROTOTYPE</p><h1>{view==='overview'?'Good evening, Yagnik.':nav.find(n=>n.id===view)?.label}</h1></div>
        <div className="top-actions">{(view==='overview'||view==='projects')&&<input className="global-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects"/>}<button className="icon-button" aria-label="Notifications" onClick={()=>setNotice('You are all caught up')}>●</button><button className="primary-button" onClick={()=>setModal(true)}>+ Add project</button></div>
      </header>
      <div className="content">
        {view==='overview'&&<Overview projects={visible} setView={openView} filter={filter} setFilter={setFilter}/>} 
        {view==='projects'&&<Projects projects={visible} allCount={projects.length} filter={filter} setFilter={setFilter}/>} 
        {view==='people'&&<People/>}
        {view==='activity'&&<Activity/>}
        {view==='settings'&&<Settings setNotice={setNotice}/>} 
      </div>
    </section>
    {modal&&<div className="modal-backdrop" onMouseDown={()=>setModal(false)}><form className="modal" onSubmit={saveProject} onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">PROJECT DIRECTORY</p><h2>Add a project</h2></div><button type="button" onClick={()=>setModal(false)} aria-label="Close">×</button></div><label>Project name<input name="name" required placeholder="Your Vehicle Manager" autoFocus/></label><label>Description<textarea name="description" required placeholder="What does this project help you manage?"/></label><div className="form-grid"><label>Category<select name="category"><option>Personal</option><option>Finance</option><option>Home</option><option>Family</option><option>Media</option></select></label><label>Status<select name="status"><option>Building</option><option>Live</option><option>Paused</option></select></label></div><label>Who can access it?<select name="access"><option>Private</option><option>Family</option><option>Public</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setModal(false)}>Cancel</button><button className="primary-button" type="submit">Add to YAM</button></div></form></div>}
    {notice&&<div className="toast">✓ {notice}</div>}
  </main>;
}

function Overview({projects,setView,filter,setFilter}:{projects:Project[];setView:(v:View)=>void;filter:string;setFilter:(v:string)=>void}) {return <>
  <section className="hero-panel"><div><span className="hero-label">YOUR DIGITAL ECOSYSTEM</span><h2>Everything you manage.<br/>One place to begin.</h2><p>Access every Y(A–Z)M project, monitor its status, and keep your digital life beautifully organized.</p><button className="hero-button" onClick={()=>setView('projects')}>Explore all projects <span>→</span></button></div><div className="hero-orbit"><i className="dot d1">$</i><i className="dot d2">⌂</i><i className="dot d3">♫</i><div className="orbit one"/><div className="orbit two"/><div className="orbit-center">YAM</div></div></section>
  <section className="stat-strip"><div><strong>06</strong><span>Total projects</span></div><div><strong>04</strong><span>Live and ready</span></div><div><strong>03</strong><span>Shared with family</span></div><p><b>System status</b><span><i/> Everything is running smoothly</span></p></section>
  <SectionHead title="Projects" label="YOUR WORKSPACE"><Filters filter={filter} setFilter={setFilter}/></SectionHead>
  <ProjectGrid projects={projects}/>
</>}

function Projects({projects,allCount,filter,setFilter}:{projects:Project[];allCount:number;filter:string;setFilter:(v:string)=>void}) {return <>
  <section className="page-intro"><div><p className="eyebrow">PROJECT DIRECTORY</p><h2>Your Y(A–Z)M ecosystem</h2><p>Every tool in your personal management suite, organized in one place.</p></div><div className="big-count"><strong>{String(allCount).padStart(2,'0')}</strong><span>Projects</span></div></section>
  <SectionHead title="All projects" label="BROWSE & MANAGE"><Filters filter={filter} setFilter={setFilter}/></SectionHead><ProjectGrid projects={projects}/>
</>}

function ProjectGrid({projects}:{projects:Project[]}) {return <section className="project-grid">{projects.length?projects.map(project=><article className="project-card" key={project.id}><div className={`project-icon ${project.color}`}>{project.code}</div><span className={`status ${project.status.toLowerCase()}`}>{project.status}</span><h4>{project.name}</h4><p>{project.description}</p><div className="project-meta"><span>{project.category}</span><span>{project.access}</span></div><button className="open-project">Open project <span>↗</span></button></article>):<div className="empty-state">No projects match this view.</div>}</section>}
function Filters({filter,setFilter}:{filter:string;setFilter:(v:string)=>void}) {return <div className="view-actions">{['All','Live','Building','Paused'].map(x=><button key={x} onClick={()=>setFilter(x)} className={`filter ${filter===x?'active':''}`}>{x}</button>)}</div>}
function SectionHead({title,label,children}:{title:string;label:string;children:React.ReactNode}) {return <div className="section-heading"><div><p className="eyebrow">{label}</p><h3>{title}</h3></div>{children}</div>}

function People(){const people=[['YD','Yagnik Donda','Owner','All projects'],['JD','Jinal Donda','Family','3 projects'],['KD','Kavya Donda','Family','2 projects']];return <><section className="page-intro"><div><p className="eyebrow">PEOPLE & PERMISSIONS</p><h2>Your trusted circle</h2><p>Control who can see and use each part of your YAM ecosystem.</p></div><button className="outline-button">+ Invite person</button></section><div className="people-list"><div className="list-head"><span>Person</span><span>Role</span><span>Access</span><span></span></div>{people.map((p,i)=><div className="person-row" key={p[1]}><div className={`person-avatar p${i}`}>{p[0]}</div><div><b>{p[1]}</b><small>{i?'Family member':'yam.owner@example.com'}</small></div><span className="role-badge">{p[2]}</span><span>{p[3]}</span><button>•••</button></div>)}</div></>}
function Activity(){const events=[['Project added','ST Gujarat Radio was added to your workspace.','Today · 8:42 PM','GR'],['Access changed','Jinal can now access Your Household Manager.','Today · 6:15 PM','YH'],['Project updated','Your Expense Manager status changed to Live.','Yesterday · 9:20 AM','YE'],['New person invited','Kavya joined your YAM family workspace.','Aug 27 · 3:10 PM','KD']];return <><section className="page-intro"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>What’s happening</h2><p>A clear history of important changes across your workspace.</p></div></section><div className="timeline">{events.map((e,i)=><article key={e[0]}><div className={`timeline-icon c${i}`}>{e[3]}</div><div><b>{e[0]}</b><p>{e[1]}</p><small>{e[2]}</small></div></article>)}</div></>}
function Settings({setNotice}:{setNotice:(v:string)=>void}){return <><section className="page-intro"><div><p className="eyebrow">CENTRAL SETTINGS</p><h2>Make YAM yours</h2><p>Update your workspace identity, preferences and privacy.</p></div></section><div className="settings-grid"><section><h3>Workspace profile</h3><p>The name and description shown throughout your central portal.</p><label>Workspace name<input defaultValue="YAM Prototype"/></label><label>Description<textarea defaultValue="One central place for every Y(A–Z)M project."/></label></section><section><h3>Preferences</h3><p>Choose how your project portal behaves.</p><Toggle title="Weekly summary" text="Receive a simple activity summary every Sunday."/><Toggle title="Project status alerts" text="Notify me when a project becomes unavailable."/><Toggle title="Compact project cards" text="Display more projects in each row."/></section><section className="security"><h3>Privacy & security</h3><p>Your central workspace is currently configured as private.</p><div className="security-row"><span>Workspace visibility<small>Only invited people can enter</small></span><b>Private</b></div></section></div><button className="primary-button save-settings" onClick={()=>{setNotice('Settings saved');setTimeout(()=>setNotice(''),2500)}}>Save changes</button></>}
function Toggle({title,text}:{title:string;text:string}){const [on,setOn]=useState(true);return <div className="toggle-row"><span><b>{title}</b><small>{text}</small></span><button className={`toggle ${on?'on':''}`} onClick={()=>setOn(!on)} aria-pressed={on}><i/></button></div>}
