export const resume = '/asmita-gorti-resume.pdf';
export const soundtrack = '/work-ambient.wav';
export const artwork = '/vecc-fractal.png';
export const artworkCaption = 'My original fractal';
export const projects = [
  {
    id: 'hecta', title: 'Hecta Proptech Private Limited', short: 'Hecta', role: 'Tech Intern', date: 'May–June 2026', location: 'Hyderabad',
    summary: 'At Hecta Proptech, I worked on a property-search chatbot. I introduced retrieval-augmented generation (RAG) and wrote Python search logic using regex and fuzzy matching.',
    contribution: 'I built Python retrieval pipelines with Qdrant, regex, and fuzzy matching, then tuned and tested the production RAG chatbot.',
    tags: ['Python', 'RAG', 'Qdrant'], video: '', poster: '', url: '',
    demo: 'Sample-data demo', steps: [],
  },
  {
    id: 'vecc', title: 'VECC / BARC', short: 'VECC / BARC', role: 'Research Intern', date: 'December 4–18, 2025', location: 'Kolkata, India',
    summary: 'During my internship at VECC, I created my own fractal and ran the same grid simulation on a CPU and a GPU to see how the timings compared.',
    contribution: 'I implemented matrix multiplication and the 1,000 × 1,000 grid simulation on CPU and GPU. My technical report received an Excellent rating.',
    detail: 'I benchmarked FP64, FP32, and FP16 on a 500-million-element vector using HIP.',
    tags: ['C++', 'HIP', 'GPU computing'], video: '', poster: '',
    url: 'https://drive.google.com/file/d/181M8qtFGiQ2TKXyD_oohr-i9CMC-u2OI/view?usp=sharing',
    demo: 'Grid simulation', steps: [],
  },
  {
    id: 'crochet', title: 'Campus Crochet', short: 'Campus Crochet', role: 'Independent project', date: '',
    summary: 'I crochet by hand, and I wanted to know what students on my campus would actually want me to make. So I built and launched a site where they could vote on their favorites.',
    contribution: 'I built a campus voting site and a storefront for my handmade crochet.',
    detail: 'Next.js 16 storefront with a MongoDB catalog, stock reservations, order tracking, and verified Razorpay payments.',
    operations: 'Admin dashboard with email OTP and automated Resend order updates.',
    tags: ['Next.js 16', 'MongoDB', 'Razorpay', 'Resend'], video: '', poster: '', url: 'https://github.com/Asmitagorti/campus-crochet',
    demo: 'Campus Crochet', steps: [],
  },
  {
    id: 'armor', title: 'Armor Browser', short: 'Armor Browser', role: 'Team prototype', date: '',
    summary: 'A desktop browser prototype that intercepts links and surfaces an allow or block decision.',
    contribution: 'I helped design the link-checking flow and integrated local scan and sharing APIs with a shared-link inbox.',
    tags: ['Python', 'PyQt6', 'Qt WebEngine'], video: '', poster: '', url: 'https://github.com/Asmitagorti/Armor-Browser',
    demo: 'Simulated link check', steps: [['Shared link', 'Open example.test from the shared-link inbox.'], ['Checking link', 'The desktop client sends the URL to the local scanning service.'], ['Warning', 'This simulated URL is flagged. The prototype surfaces an allow or block choice.']],
  },
  {
    id: 'wellbeing', title: 'Student Well-being App', short: 'Wellbeing App', role: 'Hackathon prototype', date: '',
    summary: 'A student anxiety check-in with a 10-question assessment and follow-up suggestions.',
    contribution: 'I compared four classifiers, served a Random Forest with FastAPI, and added Gemini tips and chat with SQLite history.',
    tags: ['Python', 'React', 'FastAPI', 'scikit-learn', 'Gemini', 'SQLite'], video: '', poster: '', url: 'https://github.com/Asmitagorti/Anxiety_predtion_ai_model_react',
    demo: 'Recreated assessment flow', steps: [['Check in', 'Start the 10-question assessment.'], ['Assessment result', 'A sample response set returns Moderate.'], ['Next steps', 'The prototype offers tips and a follow-up chat.']],
  },
];
export const shop = 'https://campus-crochet.tech';
export const crochetPhotos = [
  { title: 'Crochet plush', image: '/crochet-plush.webp', caption: 'Handmade plush from Campus Crochet.' },
];
export const gallery = [
  ...crochetPhotos,
  { title: 'Handmade cards', image: '/studio-card.webp', alt: 'Handmade congratulations card with cut-paper lettering and crocheted flowers', caption: 'A congratulations card with paper lettering and crocheted flowers.' },
  { title: 'Travel', image: '/studio-travel.webp', alt: 'City lights below a narrow strip of orange sunset', caption: 'City lights at dusk.' },
  { title: 'Violin', image: '/studio-violin.webp', alt: 'Asmita playing violin onstage at a college concert', caption: 'Playing violin at a college concert.' },
];

export const veccRuns = [
  { device: 'CPU', milliseconds: 2892, scope: '' },
  { device: 'GPU', milliseconds: 783, scope: 'The HIP timer included saving grid snapshots. Video rendering was outside that timed code.' },
];
export const crochetVote = { video: '/crochet-vote.mp4', poster: '/crochet-vote-poster.webp' };

export const hectaCase = {
  retrieval: 'I built the Qdrant retrieval pipeline, added context-aware chunking, and tuned production queries.',
  input: '2bhk flat in Gachibowlii',
  challenge: 'Shorthand and a misspelled neighborhood.',
  change: 'Regex extracted the bedroom count. Fuzzy matching resolved the location.',
  result: 'The chatbot could retrieve listings for the intended neighborhood.',
  models: 'I evaluated local LLMs and embedding models for on-premises use and supported the move to Azure.',
};
