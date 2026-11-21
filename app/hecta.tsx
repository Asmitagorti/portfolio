'use client';

import { useState, type FormEvent } from 'react';
import { hectaCase, projects } from './content';
import s from './portfolio.module.css';

const opening = 'Show me flats in Hyderabad under ₹50 lakh.';
const listing = { id: 'H-104', area: 'Miyapur', city: 'Hyderabad', rooms: 2, price: 46 };
const answer = `I found a ${listing.rooms} BHK flat in ${listing.area}, ${listing.city}, for ₹${listing.price} lakh. [${listing.id}]`;
const stages = ['Question', 'Filters', 'Retrieved listing', 'Answer'];

const profile = [
  ...projects.map(project => ({
    title: project.title, href: '#' + project.id,
    keywords: [project.title, ...project.tags, project.id === 'vecc' ? 'gpu cpu internship research' : '', project.id === 'hecta' ? 'internship chatbot qdrant sql search' : ''],
    answer: project.contribution,
  })),
  { title: 'Education', href: '#about', keywords: ['study studying degree education college university student'], answer: 'Asmita is pursuing a B.Tech in Computer Science & Engineering at Aditya College of Engineering and Technology in Kakinada (2024–2028).' },
  { title: 'Art, travel & music', href: '#studio', keywords: ['art craft hobbies hobby crochet yarn violin music travel cards'], answer: 'Asmita crochets, makes cards by hand, and plays violin with her college music club.' },
  { title: 'Contact', href: '#contact', keywords: ['email contact linkedin github resume résumé'], answer: 'You can find Asmita’s email, LinkedIn, GitHub, and résumé in the contact section.' },
];

function tokens(value: string) {
  return value.toLowerCase().match(/[\p{L}\d]+/gu) ?? [];
}

export function Hecta({ project }: { project: (typeof projects)[number] }) {
  const [mode, setMode] = useState<'listings' | 'profile'>('listings');
  const [stage, setStage] = useState(-1);
  const [query, setQuery] = useState('');
  const [asked, setAsked] = useState('');
  const words = new Set(tokens(asked));
  const sources = profile.map(entry => ({
    entry,
    score: [...new Set(tokens([entry.title, ...entry.keywords].join(' ')))].filter(word => words.has(word)).length,
  })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);

  function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) setAsked(query.trim());
  }

  return <article id="hecta" className={s.hectaRoom} aria-labelledby="hecta-title">
    <div className={s.hectaEntrance}>
      <header>
        <p className={s.eyebrow}>{[project.role, project.date, project.location].filter(Boolean).join(' · ')}</p>
        <h3 id="hecta-title">{project.title}</h3>
        <p>{project.summary}</p>
        <ul className={s.tags}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </header>
      <div className={s.demo}>
    <div className={s.controls} role="group" aria-label="Demo mode">
      <button aria-pressed={mode === 'listings'} onClick={() => setMode('listings')}>Property chatbot</button>
      <button aria-pressed={mode === 'profile'} onClick={() => setMode('profile')}>Ask about Asmita</button>
    </div>
    {mode === 'listings' ? <>
      <div className={s.chat} aria-live="polite">
        <span className={s.demoLabel}>Sample-data replay</span>
        {stage >= 0 && <strong>Step {stage + 1} of {stages.length} · {stages[stage]}</strong>}
        <p className={s.question}>{opening}</p>
        {stage === 1 && <dl className={s.hectaFilters}>
          <div><dt>Property type</dt><dd>Flat</dd></div>
          <div><dt>City</dt><dd>Hyderabad</dd></div>
          <div><dt>Price</dt><dd>Below ₹50 lakh</dd></div>
        </dl>}
        {stage === 2 && <div className={s.hectaRecord}>
          <p>Qdrant similarity search surfaces relevant records. The SQL lookup checks property type, city, and price against the extracted filters.</p>
          <strong>{listing.rooms} BHK flat · {listing.area}, {listing.city}</strong>
          <span>₹{listing.price} lakh · Sample listing {listing.id}</span>
        </div>}
        {(stage === -1 || stage === 3) && <p className={s.chatReply}>{answer}</p>}
      </div>
      <div className={s.controls}>
        {stage === -1 ? <button className={s.runButton} onClick={() => setStage(0)}>See how one query works</button> : <>
          <button disabled={stage === 0} onClick={() => setStage(stage - 1)}>Back</button>
          <button className={s.runButton} onClick={() => setStage(stage === 3 ? -1 : stage + 1)}>{stage === 3 ? 'Finish replay' : 'Next: ' + stages[stage + 1]}</button>
        </>}
      </div>
    </> : <div className={s.demoBody}>
      <p className={s.demoLabel}>Searches portfolio facts in your browser.</p>
      <form className={s.ask} onSubmit={ask}>
        <label htmlFor="profile-question">Ask about Asmita’s work or interests</label>
        <input id="profile-question" value={query} onChange={event => setQuery(event.target.value)} maxLength={240} placeholder="What did you build at Hecta?" required/>
        <button type="submit">Ask</button>
      </form>
      <div className={s.controls} aria-label="Example questions">
        {['What did you build at Hecta?', 'What was your GPU research?', 'Do you play violin?'].map(question => <button key={question} onClick={() => { setQuery(question); setAsked(question); }}>{question}</button>)}
      </div>
      <div aria-live="polite">
        {asked && (sources.length ? sources.map(({entry}) => <div className={s.answer} key={entry.href}>{entry.answer} <a href={entry.href}>{entry.title}</a></div>) : <p>I couldn’t find a matching portfolio entry. Try a project name, skill, or hobby.</p>)}
      </div>
    </div>}
      </div>
    </div>
    <section className={s.hectaCase} aria-labelledby="hecta-case-title">
      <h4 id="hecta-case-title">Making search handle typos and shorthand</h4>
      <dl>
        <div><dt>Illustrative input</dt><dd><code>{hectaCase.input}</code><p>{hectaCase.challenge}</p></dd></div>
        <div><dt>What I changed in Python</dt><dd>{hectaCase.change}</dd></div>
        <div><dt>What it helped the chatbot do</dt><dd>{hectaCase.result}</dd></div>
      </dl>
      <p>{hectaCase.retrieval}</p>
      <h5 className={s.localModels}>Researching local models</h5>
      <p>{hectaCase.models}</p>
    </section>
  </article>;
}
