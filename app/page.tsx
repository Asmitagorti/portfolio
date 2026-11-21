'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { artwork, artworkCaption, crochetPhotos, gallery, projects, resume, shop, soundtrack, veccRuns } from './content';
import s from './portfolio.module.css';
import { Hecta } from './hecta';

type Project = (typeof projects)[number];

function Plane() {
  return <svg viewBox="0 0 60 54" width="54" aria-hidden="true"><path d="M3 22 57 3 40 49 29 33 19 43 19 29 3 22Z M19 29 57 3 29 33" fill="#efd9a7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>;
}

function Video({ video: source, poster, title }: { video: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.src) video.src = source;
      } else video.pause();
    }, { rootMargin: '180px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, [source]);
  return <video ref={ref} muted playsInline controls preload={reduced ? 'none' : 'metadata'} poster={poster || undefined} aria-label={title} />;
}

function Replay({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(-1);
  const running = step >= 0 && step < project.steps.length - 1;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setStep(step + 1), reduced ? 350 : 1700);
    return () => window.clearTimeout(timer);
  }, [running, step, reduced]);
  return <div className={s.demo}>
    <div className={s.demoTop}>{project.demo}</div>
    <div className={s.demoBody} aria-live="polite">
      {project.steps.slice(0, step + 1).map(([label, detail]) => <div className={s.demoEvent} key={label}><strong>{label}</strong><p>{detail}</p></div>)}
      {step < 0 && <p>{project.steps[0][1]}</p>}
    </div>
    <div className={s.controls}><button className={s.runButton} disabled={running} onClick={() => setStep(0)}>{running ? 'Running…' : step < 0 ? 'Start' : 'Run again'}</button></div>
  </div>;
}

function Research({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const [view, setView] = useState<'fractal' | 'comparison'>('fractal');
  return <article id="vecc" className={s.vecc} aria-labelledby="vecc-title">
    <header className={s.veccEntrance}>
      <img src={artwork} alt="" loading="lazy" className={s.veccBackdrop}/>
      <motion.div className={s.veccIntro} initial={false} whileInView={{ y: 0 }}
        viewport={{ once: true }} transition={{ duration: reduced ? 0 : .45 }}
        style={{ y: reduced ? 0 : 12 }}>
        <p className={s.eyebrow}>{project.role} · {project.date}</p>
        <h3 id="vecc-title">{project.title}</h3>
        <p>{project.summary}</p>
      </motion.div>
    </header>
    <div className={s.veccInterior}>
      <div className={s.veccChoices} role="group" aria-label="VECC project views">
        <button aria-pressed={view === 'fractal'} aria-controls="vecc-preview" onClick={() => setView('fractal')}>Fractal</button>
        <button aria-pressed={view === 'comparison'} aria-controls="vecc-preview" onClick={() => setView('comparison')}>CPU vs GPU</button>
      </div>
      <div id="vecc-preview">
        {view === 'fractal' ? <figure className={s.veccFigure}>
          <a href={artwork} target="_blank" rel="noreferrer" aria-label="Open full-size fractal">
            <img className={s.fractalView} src={artwork} width={800} height={800} loading="lazy" alt="Crimson curves and fine diagonal lines on a dark field"/>
          </a>
          <figcaption>{artworkCaption}</figcaption>
        </figure> : <div>
          <p className={s.veccGridLabel}>1,000 × 1,000 grid · Final timings shown in the recordings</p>
          <div className={s.veccRuns}>{veccRuns.map(run => <section key={run.device} aria-label={run.device + ' recording'}>
            <div className={s.veccRunHead}><h4>{run.device}</h4><strong>{run.time}</strong></div>
            <Video {...run} title={run.device + ' grid simulation'}/>
            {run.scope && <p>{run.scope}</p>}
          </section>)}</div>
        </div>}
      </div>
      <details className={s.veccTechnical}>
        <summary>Technical details</summary>
        <p>{project.contribution}</p>
        {project.url && <a href={project.url} target="_blank" rel="noreferrer">Internship certificate</a>}
      </details>
    </div>
  </article>;
}

function Crochet() {
  return <div className={s.demo}>
    <div className={s.demoTop}>Campus Crochet · Collection preview</div>
    <div className={s.shopPhotos}>{crochetPhotos.map(piece => <figure key={piece.title}><img src={piece.image} alt={piece.title} loading="lazy"/><figcaption>{piece.title}</figcaption></figure>)}</div>
    <div className={s.controls}><a href={shop} target="_blank" rel="noreferrer">Visit the live site</a></div>
  </div>;
}

export default function Home() {
  const reduced = useReducedMotion();
  const audio = useRef<HTMLAudioElement>(null);
  const work = useRef<HTMLElement>(null);
  const [sound, setSound] = useState(false);
  const [inWork, setInWork] = useState(false);
  useEffect(() => {
    if (!work.current) return;
    const observer = new IntersectionObserver(([entry]) => setInWork(entry.isIntersecting));
    observer.observe(work.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const track = audio.current;
    if (!track) return;
    if (!sound || !inWork) { track.pause(); return; }
    track.volume = 0;
    void track.play().catch(() => setSound(false));
    const fade = window.setInterval(() => {
      track.volume = Math.min(0.3, track.volume + 0.025);
      if (track.volume >= 0.3) window.clearInterval(fade);
    }, 70);
    return () => window.clearInterval(fade);
  }, [sound, inWork]);

  return <div className={s.site}>
    <a className={s.skip} href="#main">Skip to content</a>
    <header className={s.header}>
      <div className={s.headerInner}>
        <a href="#home" className={s.brand}><span>✳</span> Asmita Gorti</a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#studio">Studio</a><a href="#contact">Contact</a></nav>
        <button className={s.sound} aria-pressed={sound} onClick={() => setSound(!sound)}><span aria-hidden="true">♫</span> Sound <span>{sound ? 'on' : 'off'}</span></button>
      </div>
    </header>
    <main id="main">
      <section className={s.hero} id="home">
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>SOFTWARE ENGINEERING & CREATIVE WORK</p>
          <h1>Asmita<br/><em>Gorti<span>.</span></em></h1>
          <p className={s.intro}>I’m a computer science student who builds software from scratch, from search systems to tools for my campus. Away from the keyboard, I crochet and make things by hand.</p>
          <div className={s.actions}><a className={s.primary} href="#work">View work</a><a className={s.secondary} href={resume} target="_blank" rel="noreferrer">Résumé</a></div>
        </div>
        <motion.div aria-hidden="true" className={s.plane} initial={reduced ? false : { x: -150, y: 65, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 1.4, ease: 'easeOut' }}><Plane/></motion.div>
      </section>

      <section ref={work} id="work" className={s.work}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}><h2>Selected work<span>.</span></h2><p>Internships & independent projects</p></div>
          <nav className={s.projectNav} aria-label="Jump to a project">{projects.map(project => <a key={project.id} href={'#' + project.id}>{project.short}</a>)}</nav>
          <div className={s.rooms}>{projects.map(project => project.id === 'hecta' ? <Hecta key={project.id} project={project}/> : project.id === 'vecc' ? <Research key={project.id} project={project}/> : <article key={project.id} id={project.id} className={s.room} data-project={project.id} style={project.poster ? { backgroundImage: 'linear-gradient(90deg, #151016f5, #15101655), url(' + project.poster + ')' } : undefined}>
            <div className={s.projectCopy}>
              <p className={s.eyebrow}>{project.role}{project.date && ' · ' + project.date}</p>
              <h3>{project.title}</h3>
              <p className={s.summary}>{project.summary}</p>
              <p>{project.contribution}</p>
              <ul className={s.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className={s.projectLinks}><a href={'#' + project.id} aria-label={'Permalink to ' + project.title}>Project link</a>{project.url && <a href={project.url} target="_blank" rel="noreferrer">{'GitHub repository'}</a>}</div>
            </div>
            <div className={s.projectMedia}>{project.video && <Video {...project}/>} {project.id === 'crochet' ? <Crochet/> : <Replay project={project}/>}</div>
          </article>)}</div>
        </div>
        <audio ref={audio} preload="none" loop src={soundtrack}/>
      </section>

      <section className={s.about} id="about">
        <div className={s.sectionInner}>
          <div className={s.sectionHead}><h2>About me<span>.</span></h2><Plane/></div>
          <ol className={s.postcards}>
            <li><span>United States</span><h3>Growing up abroad</h3><p>I spent roughly a decade studying in the U.S.</p></li>
            <li><span>India</span><h3>Moving back</h3><p>I returned to India and continued my education here.</p></li>
            <li><span>Kakinada · 2024–2028</span><h3>Studying computer science</h3><p>I’m pursuing a B.Tech in Computer Science & Engineering at Aditya College of Engineering and Technology.</p></li>
          </ol>
        </div>
      </section>

      <section className={s.studio} id="studio">
        <div className={s.sectionInner}>
          <div className={s.sectionHead}><h2>Art, travel & music<span>.</span></h2><motion.div className={s.yarn} aria-hidden="true" initial={reduced ? false : { x: -65, rotate: -220 }} whileInView={{ x: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.2 }}>🧶</motion.div></div>
          <div className={s.gallery}>{gallery.map(piece => <figure key={piece.title}>
            {piece.image && <img src={piece.image} alt={'alt' in piece ? piece.alt : piece.title} loading="lazy" className={'alt' in piece ? s.studioPhoto : undefined}/>}
            <figcaption><h3>{piece.title}</h3><p>{piece.caption}</p></figcaption>
          </figure>)}</div>
        </div>
      </section>

      <footer id="contact" className={s.contact}><div className={s.sectionInner}>
        <h2>Let’s build together<span>.</span></h2><p>I’d like to join a team where I can learn, contribute ideas, and help turn a rough sketch into something people can use.</p>
        <nav aria-label="Contact links"><a href="mailto:asmileis4evr@gmail.com">Email</a><a href="https://www.linkedin.com/in/asmita-gorti-b43908279/">LinkedIn</a><a href="https://github.com/Asmitagorti">GitHub</a><a href={resume}>Résumé</a></nav>
      </div></footer>
    </main>
  </div>;
}
