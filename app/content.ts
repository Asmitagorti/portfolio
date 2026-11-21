export const resume = '/asmita-gorti-resume.pdf';
export const soundtrack = '/work-ambient.wav';
export const artwork = '/vecc-fractal.png';
export const artworkCaption = 'My original fractal';
export const projects = [
  {
    id: 'hecta', title: 'Hecta Proptech Private Limited', short: 'Hecta', role: 'Tech Intern', date: 'May–June 2026', location: 'Hyderabad',
    summary: 'At Hecta Proptech, I worked on a property-search chatbot. I introduced retrieval-augmented generation (RAG) and wrote Python search logic using regex and fuzzy matching.',
    contribution: 'Helped introduce retrieval-augmented generation. I wrote Python retrieval logic using regex and fuzzy matching, contributed context-aware chunking and query tuning, and evaluated local and on-premises models before the move to Azure. The chatbot used Qdrant similarity search and SQL lookups to find listings and answer follow-up questions.',
    tags: ['Python', 'RAG', 'Qdrant'], video: '', poster: '', url: '',
    demo: 'Sample-data demo', steps: [],
  },
  {
    id: 'vecc', title: 'VECC / BARC', short: 'VECC / BARC', role: 'Research Intern', date: 'December 4–18, 2025', location: 'Kolkata, India',
    summary: 'During my internship at VECC, I created my own fractal and ran the same grid simulation on a CPU and a GPU to see how the timings compared.',
    contribution: 'I implemented matrix multiplication and a 1,000 × 1,000 virus-spread grid simulation on CPU and GPU, scaling input sizes to compare timings. I also generated custom Mandelbrot fractals and presented a technical report that received an Excellent rating.',
    detail: 'I benchmarked time and memory for FP64, FP32, and FP16 on a 500-million-element vector using HIP kernels. I used hipMalloc and hipMemcpy and studied the thread–block–grid hierarchy and CUDA–HIP portability.',
    tags: ['C++', 'HIP', 'GPU computing'], video: '', poster: '',
    url: 'https://drive.google.com/file/d/181M8qtFGiQ2TKXyD_oohr-i9CMC-u2OI/view?usp=sharing',
    demo: 'Grid simulation', steps: [],
  },
  {
    id: 'crochet', title: 'Campus Crochet', short: 'Campus Crochet', role: 'Independent project', date: '',
    summary: 'I crochet by hand, and I wanted to know what students on my campus would actually want me to make. So I built and launched a site where they could vote on their favorites.',
    contribution: 'I started with a poll to learn what students wanted me to make. I built a full storefront with a MongoDB catalog, stock reservations, order tracking, and server-side Razorpay payment verification. The live site currently shows the poll, with orders and payments paused.',
    detail: 'I built the Next.js 16 storefront on campus-crochet.tech with a MongoDB catalog, account-synced carts, order tracking, and stock reservations. I verified the Razorpay signature, amount, and currency server-side, and used idempotent order references and webhooks to prevent duplicate or tampered payments.',
    operations: 'I built an admin dashboard to create orders, manage products, and mark orders completed in first-come-first-served order. I protected admin access with email OTP and rate limiting and queued customer updates in Resend with retry backoff.',
    tags: ['Next.js 16', 'MongoDB', 'Razorpay', 'Resend'], video: '', poster: '', url: 'https://github.com/Asmitagorti/campus-crochet',
    demo: 'Campus Crochet', steps: [],
  },
  {
    id: 'armor', title: 'Armor Browser', short: 'Armor Browser', role: 'Team prototype', date: '',
    summary: 'A desktop browser prototype that intercepts links and surfaces an allow or block decision.',
    contribution: 'I contributed to design and security workflow analysis for a team browser built with Python, PyQt6, and Qt WebEngine, with tabbed navigation, URL interception, and allow/block controls. I connected the prototype to local scan and sharing APIs and added a shared-link inbox that polled every five seconds.',
    tags: ['Python', 'PyQt6', 'Qt WebEngine'], video: '', poster: '', url: 'https://github.com/Asmitagorti/Armor-Browser',
    demo: 'Simulated link check', steps: [['Shared link', 'Open example.test from the shared-link inbox.'], ['Checking link', 'The desktop client sends the URL to the local scanning service.'], ['Warning', 'This simulated URL is flagged. The prototype surfaces an allow or block choice.']],
  },
  {
    id: 'wellbeing', title: 'Student Well-being App', short: 'Wellbeing App', role: 'Hackathon prototype', date: '',
    summary: 'A student anxiety check-in with a 10-question assessment and follow-up suggestions.',
    contribution: 'I built a React and FastAPI prototype that classifies anxiety as Low, Moderate, or High from a 10-question assessment. I compared four classifiers with an 80/20 split and served the selected Random Forest via Joblib. I integrated Gemini 2.5 Flash for tips and chat, stored conversation history in SQLite, and added fallback suggestions for generation failures.',
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
  retrieval: 'I built Python retrieval pipelines with embeddings, rerankers, Qdrant, and REST API integrations, and compared Qdrant with FAISS. After studying the full codebase, I designed context-aware chunking and contributed code, query tuning, and testing to the production RAG chatbot.',
  input: '2bhk flat in Gachibowlii',
  challenge: 'A shorthand bedroom count and a misspelled neighborhood make exact matching brittle.',
  change: 'I used regex to extract structured clues from the query and fuzzy matching to find likely matches for misspelled or partial location names.',
  result: 'The chatbot could use the intended neighborhood and bedroom count to retrieve relevant listings even when the search text didn’t match the listing exactly.',
  models: 'I evaluated local LLMs and embedding models for an on-premises deployment, including EmbeddingGemma, BGE, Nomic, MiniLM, and MxBAI. I compared MTEB scores, latency, model size, quantization, and pricing, and supported the move to Azure.',
};
