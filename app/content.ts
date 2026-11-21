export const resume = '/asmita-gorti-resume.pdf';
export const soundtrack = '/work-ambient.wav';
export const artwork = '/fractal-study.webp';
export const artworkCaption = 'Visual study based on my fractal';
export const projects = [
  {
    id: 'hecta', title: 'Hecta Proptech', short: 'Hecta', role: 'Tech Intern', date: 'May–June 2026',
    summary: 'A property-search chatbot that retrieves relevant listings before it answers.',
    contribution: 'Helped introduce retrieval-augmented generation. I wrote Python retrieval logic using regex and fuzzy matching, contributed context-aware chunking and query tuning, and evaluated local and on-premises models before the move to Azure.',
    tags: ['Python', 'RAG', 'Qdrant'], video: '', poster: '', url: '',
    demo: 'Sample-data replay', steps: [
      ['Property search', 'Are there 2 BHK flats in Gachibowli under ₹80 lakh?'],
      ['Retrieve', 'Parse the budget and bedroom count, then retrieve and rerank matching listings.'],
      ['Answer', 'One sample match: a 2 BHK in Gachibowli at ₹76 lakh. The answer cites sample listing H-104.'],
    ],
  },
  {
    id: 'vecc', title: 'VECC / BARC', short: 'VECC / BARC', role: 'Research Intern', date: 'December 4–18, 2025',
    summary: 'An exploration of parallel computing through HIP benchmarks, a grid simulation, and custom Mandelbrot fractals.',
    contribution: 'I implemented CPU and GPU versions of matrix multiplication and a 1,000 × 1,000 virus-spread simulation, benchmarked floating-point formats, and presented my findings in a technical report.',
    tags: ['C++', 'HIP', 'GPU computing'], video: '', poster: artwork,
    url: 'https://drive.google.com/file/d/181M8qtFGiQ2TKXyD_oohr-i9CMC-u2OI/view?usp=sharing',
    demo: 'Grid simulation', steps: [],
  },
  {
    id: 'crochet', title: 'Campus Crochet', short: 'Campus Crochet', role: 'Independent project', date: '',
    summary: 'A campus poll that grew into a storefront for my handmade keychains and amigurumi.',
    contribution: 'I started with a poll to learn what students wanted me to make. I later launched ordering and checkout with a MongoDB catalog, stock reservations, order tracking, and server-side Razorpay payment verification.',
    tags: ['Next.js', 'MongoDB', 'Razorpay'], video: '', poster: '', url: 'https://github.com/Asmitagorti/campus-crochet',
    demo: 'Illustrative campus poll', steps: [['Campus Crochet', 'What should I crochet next?'], ['Cast a vote', 'Choose between a keychain and amigurumi.'], ['Vote recorded', 'The poll gave students a say in what I made next.']],
  },
  {
    id: 'armor', title: 'Armor Browser', short: 'Armor Browser', role: 'Team prototype', date: '',
    summary: 'A desktop browser prototype that intercepts links and surfaces an allow or block decision.',
    contribution: 'I contributed to the browser design and security workflow analysis. The team used Headless Chrome in the checking workflow and built the desktop browser with Python and PyQt6.',
    tags: ['Python', 'PyQt6', 'Qt WebEngine'], video: '', poster: '', url: 'https://github.com/Asmitagorti/Armor-Browser',
    demo: 'Simulated link check', steps: [['Shared link', 'Open example.test from the shared-link inbox.'], ['Checking link', 'The desktop client sends the URL to the local scanning service.'], ['Warning', 'This simulated URL is flagged. The prototype surfaces an allow or block choice.']],
  },
  {
    id: 'wellbeing', title: 'Student Wellbeing App', short: 'Wellbeing App', role: 'Hackathon prototype', date: '',
    summary: 'A student anxiety check-in with a 10-question assessment and follow-up suggestions.',
    contribution: 'I built the React and FastAPI prototype and integrated Gemini tips and chat with SQLite history. The prototype serves a Random Forest selected after comparing four classifiers and includes fallback suggestions.',
    tags: ['React', 'FastAPI', 'scikit-learn'], video: '', poster: '', url: 'https://github.com/Asmitagorti/Anxiety_predtion_ai_model_react',
    demo: 'Recreated assessment flow', steps: [['Check in', 'Start the 10-question assessment.'], ['Assessment result', 'A sample response set returns Moderate.'], ['Next steps', 'The prototype offers tips and a follow-up chat.']],
  },
];
export const benchmarkRuns = [
  { device: 'CPU', grid: '1,000 × 1,000', frames: 'To confirm', scope: 'To confirm', timing: 'Pending' },
  { device: 'GPU', grid: '1,000 × 1,000', frames: 'To confirm', scope: 'To confirm', timing: 'Pending' },
];
export const gallery = [
  { title: 'Crochet', image: '', caption: 'Keychains and amigurumi, made by hand.' },
  { title: 'Handmade cards', image: '', caption: 'Paper, folds, and small details.' },
  { title: 'Travel', image: '', caption: 'Photos and memories from places I’ve lived and visited.' },
  { title: 'Violin', image: '', caption: 'I play with my college music club and won its solo instrumental competition.' },
];
