'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { artwork, artworkCaption, crochetPhotos, gallery, precisionRuns, projects, resume, shop, simulations, soundtrack } from './content';
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
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === project.steps.length - 1) setPlaying(false);
      else setStep(step + 1);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [playing, step, project.steps.length]);
  return <div className={s.demo} ref={panel}>
    <div className={s.demoTop}><span className={s.lights} aria-hidden="true">● ● ●</span><span>{project.demo}</span></div>
    <div className={s.demoBody} aria-live="polite">
      <span className={s.demoLabel}>{project.steps[step][0]}</span>
      <p>{project.steps[step][1]}</p>
    </div>
    <div className={s.controls}>
      <button onClick={() => { if (playing) setPlaying(false); else { setStep(0); setPlaying(true); } }}>{playing ? 'Pause' : 'Replay'}</button>
      {project.steps.map(([label], index) => <button key={label} aria-pressed={index === step} onClick={() => { setPlaying(false); setStep(index); }}>{label}</button>)}
    </div>
  </div>;
}

function Research() {
  const [view, setView] = useState<'Fractal' | keyof typeof simulations>('Fractal');
  const clip = view === 'Fractal' ? null : simulations[view];
  return <div className={s.research}>
    <div className={s.controls} aria-label="VECC media">
      {(['Fractal', 'CPU', 'GPU'] as const).map(option => <button key={option} aria-pressed={view === option} onClick={() => setView(option)}>{option === 'Fractal' ? option : option + ' simulation'}</button>)}
    </div>
    {clip ? <Video key={view} {...clip} title={view + ' grid simulation'} /> : <img className={s.fractalView} src={artwork} loading="lazy" alt={artworkCaption}/>}
    <div className={s.benchmarks} tabIndex={0}>
      <table><caption>1,000 × 1,000 grid · recorded timing overlays</caption><thead><tr><th scope="col">Run</th><th scope="col">Shown</th><th scope="col">Timing scope</th></tr></thead>
      <tbody>{Object.entries(simulations).map(([device, run]) => <tr key={device}><th scope="row">{device}</th><td className={s.timing}>{run.time}</td><td>{run.scope}</td></tr>)}</tbody></table>
    </div>
    <details className={s.precision}>
      <summary>Separate HIP precision benchmark</summary>
      <p>500-million-element vector. Original reported values. The FP64 host-to-device time exceeds the reported total, so the total needs verification.</p>
      <div className={s.benchmarks} tabIndex={0} aria-label="Precision benchmark results">
        <table><thead><tr>{['Precision', 'hipMalloc (µs)', 'H→D (µs)', 'Kernel launch (µs)', 'D→H (µs)', 'Memory (MiB)', 'Reported total (µs)'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>{precisionRuns.map(([precision, ...values]) => <tr key={precision}><th scope="row">{precision}</th>{values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table>
      </div>
    </details>
  </div>;
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
        <figure className={s.print}><img src={artwork} alt="Crimson curves and fine diagonal lines on a dark field" width={900} height={900}/><figcaption><span>{artworkCaption}</span><span>Digital study</span></figcaption></figure>
        <motion.div aria-hidden="true" className={s.plane} initial={reduced ? false : { x: -150, y: 65, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 1.4, ease: 'easeOut' }}><Plane/></motion.div>
      </section>

      <section ref={work} id="work" className={s.work}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}><h2>Selected work<span>.</span></h2><p>Internships & independent projects</p></div>
          <nav className={s.projectNav} aria-label="Jump to a project">{projects.map(project => <a key={project.id} href={'#' + project.id}>{project.short}</a>)}</nav>
          <div className={s.rooms}>{projects.map(project => <article key={project.id} id={project.id} className={s.room} data-project={project.id} style={project.poster ? { backgroundImage: 'linear-gradient(90deg, #151016f5, #15101655), url(' + project.poster + ')' } : undefined}>
            <div className={s.projectCopy}>
              <p className={s.eyebrow}>{project.role}{project.date && ' · ' + project.date}</p>
              <h3>{project.title}</h3>
              <p className={s.summary}>{project.summary}</p>
              <p>{project.contribution}</p>
              <ul className={s.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className={s.projectLinks}><a href={'#' + project.id} aria-label={'Permalink to ' + project.title}>Project link</a>{project.url && <a href={project.url} target="_blank" rel="noreferrer">{project.id === 'vecc' ? 'Internship certificate' : 'GitHub repository'}</a>}</div>
            </div>
            <div className={s.projectMedia}>{project.video && <Video {...project}/>} {project.id === 'vecc' ? <Research/> : project.id === 'hecta' ? <Hecta/> : project.id === 'crochet' ? <Crochet/> : <Replay project={project}/>}</div>
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
            {piece.image && <img src={piece.image} alt={piece.title} loading="lazy"/>}
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
