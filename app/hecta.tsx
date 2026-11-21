'use client';

import { useState, type FormEvent } from 'react';
import { projects } from './content';
import s from './portfolio.module.css';

const opening = 'Are there 2 BHK flats in Gachibowli under ₹80 lakh?';
const followUp = 'Does it have parking?';
const listings = [
  { id: 'H-104', area: 'Gachibowli', rooms: 2, price: 76, parking: true },
  { id: 'H-218', area: 'Gachibowli', rooms: 2, price: 88, parking: false },
  { id: 'H-306', area: 'Kondapur', rooms: 2, price: 73, parking: true },
];

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

export function Hecta() {
  const [mode, setMode] = useState<'listings' | 'profile'>('listings');
  const [stage, setStage] = useState(0);
  const [follow, setFollow] = useState(false);
  const [query, setQuery] = useState('');
  const [asked, setAsked] = useState('');
  const ranked = listings.toSorted((a, b) => Number(b.area === 'Gachibowli') - Number(a.area === 'Gachibowli'));
  const match = ranked.find(item => item.area === 'Gachibowli' && item.rooms === 2 && item.price < 80)!;
  const words = new Set(tokens(asked));
  const sources = profile.map(entry => ({
    entry,
    score: [...new Set(tokens([entry.title, ...entry.keywords].join(' ')))].filter(word => words.has(word)).length,
  })).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);

  function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) setAsked(query.trim());
  }

  return <div className={s.demo}>
    <div className={s.controls} aria-label="Demo mode">
      <button aria-pressed={mode === 'listings'} onClick={() => setMode('listings')}>Property chatbot</button>
      <button aria-pressed={mode === 'profile'} onClick={() => setMode('profile')}>Ask about Asmita</button>
    </div>
    {mode === 'listings' ? <>
      <div className={s.demoBody} aria-live="polite">
        <span className={s.demoLabel}>Sample property data · {follow ? 'Follow-up' : 'First question'}</span>
        <p>{follow ? followUp : opening}</p>
        {stage >= 1 && <ol className={s.trace}>
          <li><strong>Qdrant similarity search.</strong> {follow ? 'The current listing stays in context.' : 'Rank the example listings by relevance to the question.'}</li>
          <li><strong>SQL lookup.</strong> {follow ? 'Look up the parking field for listing ' + match.id + '.' : 'Check location, bedroom count, and price against the listing records.'}</li>
        </ol>}
        {stage === 2 && <div className={s.answer}>{follow ? (match.parking ? 'Yes, this listing includes parking.' : 'This listing has no parking.') : `I found a ${match.rooms} BHK in ${match.area} at ₹${match.price} lakh.`} <strong>[{match.id}]</strong></div>}
      </div>
      <div className={s.controls}>
        {stage < 2 && <button onClick={() => setStage(stage + 1)}>{stage === 0 ? 'Find matching listings' : 'Show answer'}</button>}
        {stage === 2 && !follow && <button onClick={() => { setFollow(true); setStage(0); }}>{followUp}</button>}
        {(stage > 0 || follow) && <button onClick={() => { setFollow(false); setStage(0); }}>Start over</button>}
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
  </div>;
}
