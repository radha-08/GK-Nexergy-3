/**
 * GK Nexergy Intelligent Conversational AI Engine
 * 
 * Provides:
 * 1. Strict language matching: Telugu queries receive 100% Telugu responses; English queries receive English responses.
 * 2. Natural, human-like dialogue with concise, intelligent, and context-aware responses.
 * 3. Multi-turn conversation context tracking across Enterprise Solutions, Academy, Case Studies, and Careers.
 * 4. Accurate GK Nexergy ground-truth facts (Vizag tech hub, 100% IP ownership, autonomous pods, contact channels).
 * 5. Optional OpenAI API integration (GPT-4o) with instant conversational local fallback.
 */

import { FULL_SITE_CORPUS, searchSiteCorpus } from "./fullSiteKnowledgeCorpus.js";
import { detectLanguage, translateText } from "./multilingualVoiceEngine.js";

export const GK_CONTACT_INFO = {
  phone: "+91 9704585960",
  phoneRaw: "+919704585960",
  email: "contact@gknexergy.com",
  whatsappUrl: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
  consultationForm: "https://forms.gle/GCqvWiWqxwvDSzoZ6",
  headquarters: "Visakhapatnam (Vizag), Andhra Pradesh, India",
  hours: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
};

export const GK_SYSTEM_PROMPT = `
You are the intelligent digital assistant for GK Nexergy (www.gknexergy.com), based in Visakhapatnam, India.

Persona:
- You speak naturally, warmly, and intelligently — like an experienced engineering colleague or tech consultant.
- Keep responses concise, clear, and conversational. Avoid walls of text or giant lists of bullet points unless specifically requested.
- Multilingual Rule: If the user writes or speaks in Telugu (including Tanglish transliteration), reply 100% in natural Telugu script. If in English, reply in English. If in Hindi, reply in Hindi.
- Accurate Company Facts: GK Nexergy delivers Enterprise Solutions (Software, Mobile Apps, AI & Automation, Data Analytics, Digital Growth) and Nexergy Academy (Cyber Security, PostgreSQL, Foundation Program, AI Marketing). Contact: +91 9704585960 | contact@gknexergy.com | Visakhapatnam, India.
`;

/**
 * Knowledge Topics with Native Telugu, Hindi, and English Handlers
 */
export const CONVERSATIONAL_TOPICS = [
  // 1. GREETINGS & CASUAL INTROS
  {
    id: "greetings",
    intents: [
      "hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste", "sup", "yo", "hiya", "greetings",
      "నమస్కారం", "నమస్తే", "హలో", "బాగున్నారా", "ఎలా ఉన్నారు", "శుభోదయం", "శుభ సాయంత్రం", "namaskaram", "namaste", "ela unnavu", "ela unnaru", "नमस्ते", "வணக்கம்", "ಹಲೋ"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "greetings",
          text: "నమస్కారం! 👋\n\nనేను **GK Nexergy AI అసిస్టెంట్‌ని**.\n\nమా ఎంటర్‌ప్రైజ్ టెక్నాలజీ సొల్యూషన్స్, అకాడమీ కోర్సులు, ప్రాజెక్ట్‌లు లేదా కంపెనీ గురించిన సమాచారం తెలుసుకోవడానికి నేను మీకు సహాయం చేయగలను.\n\nమీరు దేని గురించి తెలుసుకోవాలనుకుంటున్నారు?",
          routes: [],
          lang: "te",
        };
      }
      if (isHindi) {
        return {
          topic: "greetings",
          text: "नमस्ते! 👋\n\nमैं **GK Nexergy AI सहायक** हूँ।\n\nमैं हमारे सॉफ्टवेयर सॉल्यूशंस, एकेडमी कोर्सेज, प्रोजेक्ट्स या कंपनी की जानकारी में आपकी मदद कर सकता हूँ।\n\nआज आप किस बारे में जानना चाहते हैं?",
          routes: [],
          lang: "hi",
        };
      }
      return {
        topic: "greetings",
        text: "Hi there! 👋\n\nI'm the **GK Nexergy AI assistant**.\n\nI can help you explore our technology solutions, academy courses, client projects, or answer any questions about the company.\n\nWhat are you curious about today?",
        routes: [],
        lang: "en",
      };
    },
  },

  // 2. COMPANY OVERVIEW / WHAT DO YOU DO
  {
    id: "company",
    intents: [
      "what is gk nexergy", "what does gk nexergy do", "what do you do", "about gk nexergy", "about the company", "tell me about gk nexergy", "company", "who are you", "what is this", "overview", "story", "vision", "mission",
      "మీరు ఏం చేస్తారు", "మీరు ఏమి చేస్తారు", "కంపెనీ గురించి చెప్పు", "gk nexergy అంటే ఏమిటి", "కంపెనీ వివరాలు", "మీ సర్వీసులు ఏమిటి", "కంపెనీ ఏమి చేస్తుంది", "meeru em chestaru", "company gurinchi cheppu", "company details", "कंपनी क्या करती है", "कंपनी के बारे में बताओ"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "company",
          text: "GK Nexergy వ్యాపారాల కోసం ఆధునిక సాఫ్ట్‌వేర్, మొబైల్ యాప్‌లు మరియు AI సొల్యూషన్స్‌ను నిర్మిస్తుంది, అలాగే Nexergy Academy ద్వారా తదుపరి తరం ఇంజనీర్లకు ప్రొఫెషనల్ శిక్షణ ఇస్తుంది.\n\nమేము **విశాఖపట్నం (Vizag), ఆంధ్రప్రదేశ్** కేంద్రంగా పనిచేస్తూ, 100% క్లయింట్ కోడ్ యాజమాన్యంతో ప్రాజెక్ట్‌లను డెలివరీ చేస్తున్నాము.\n\nమీరు మీ వ్యాపారం కోసం సాఫ్ట్‌వేర్ నిర్మించాలనుకుంటున్నారా లేదా మా అకాడమీ ట్రైనింగ్ ప్రోగ్రామ్‌లపై ఆసక్తి ఉందా?",
          routes: [
            { label: "సొల్యూషన్స్ చూడండి", to: "/solutions" },
            { label: "Nexergy Academy", to: "/academy" },
          ],
          lang: "te",
        };
      }
      if (isHindi) {
        return {
          topic: "company",
          text: "GK Nexergy व्यवसायों के लिए आधुनिक सॉफ्टवेयर, मोबाइल ऐप्स और AI समाधान बनाती है, साथ ही Nexergy Academy के माध्यम से छात्रों को इंजीनियरिंग ट्रेनिंग देती है।\n\nहम **विशाखापत्तनम (Vizag), भारत** से संचालित होते हैं।\n\nक्या आप अपनी कंपनी के लिए सॉफ्टवेयर बनवाना चाहते हैं या एकेडमी कोर्सेज में रुचि रखते हैं?",
          routes: [
            { label: "समाधान देखें", to: "/solutions" },
            { label: "Nexergy Academy", to: "/academy" },
          ],
          lang: "hi",
        };
      }
      return {
        topic: "company",
        text: "GK Nexergy helps businesses build modern technology and AI solutions, while also training the next generation of engineers through Nexergy Academy.\n\nWe operate from **Visakhapatnam, India**, delivering custom software, mobile apps, AI automation, and cloud systems with 100% client code ownership.\n\nAre you looking to build a tech solution for your business, or interested in our academy training programs?",
        routes: [
          { label: "Explore Solutions", to: "/solutions" },
          { label: "Nexergy Academy", to: "/academy" },
        ],
        lang: "en",
      };
    },
  },

  // 3. AI & AUTOMATION
  {
    id: "solutions-ai",
    intents: [
      "ai", "artificial intelligence", "automation", "automate", "generative ai", "llm", "chatbots", "copilot", "smart workflows", "agent", "agents", "machine learning", "rag",
      "ఏఐ", "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్", "ఆటోమేషన్", "చాట్‌బాట్", "రోబోటిక్స్", "ai సొల్యూషన్స్", "ai tools", "ai services"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "solutions-ai",
          text: "GK Nexergy వ్యాపారాల కోసం ప్రాక్టికల్ AI మరియు ఆటోమేషన్ సొల్యూషన్స్‌ను రూపొందిస్తుంది:\n\n• **ఇంటెలిజెంట్ ఏజెంట్లు & చాట్‌బాట్లు**: 24/7 కస్టమర్ అసిస్టెంట్లు మరియు అంతర్గత నాలెడ్జ్ బాట్లు.\n• **డాక్యుమెంట్ ఇంటెలిజెన్స్**: ఆటోమేటెడ్ PDF ఇన్వాయిస్ ప్రాసెసింగ్ మరియు డేటా వెలికితీత.\n• **వర్క్‌ఫ్లో ఆటోమేషన్**: పునరావృత మాన్యువల్ డేటా ఎంట్రీని తొలగించడం.\n\nమీ నిర్దిష్ట బిజినెస్‌కు AI ఎలా ఉపయోగపడుతుందో తెలుసుకోవాలనుకుంటున్నారా?",
          routes: [{ label: "AI & ఆటోమేషన్ చూడండి", to: "/solutions/ai-automation" }],
          lang: "te",
        };
      }
      return {
        topic: "solutions-ai",
        text: "GK Nexergy builds practical AI and automation solutions to help businesses eliminate repetitive manual work, streamline operations, and build smarter digital products.\n\nWe work with custom Generative AI copilots, intelligent document processing, predictive models, and autonomous workflow bots.\n\nWould you like to see how this can apply to your specific industry?",
        routes: [{ label: "Explore AI & Automation", to: "/solutions/ai-automation" }],
        lang: "en",
      };
    },
  },

  // 4. SOFTWARE & WEB DEVELOPMENT
  {
    id: "solutions-software",
    intents: [
      "software", "software development", "web development", "web app", "custom software", "react", "next.js", "node", "backend", "frontend", "full stack", "api", "microservices", "saas",
      "సాఫ్ట్‌వేర్", "సాఫ్ట్‌వేర్ డెవలప్‌మెంట్", "వెబ్‌సైట్", "వెబ్ డెవలప్‌మెంట్", "రియాక్ట్", "పైథాన్", "సాఫ్ట్‌వేర్ కావాలి", "వెబ్‌సైట్ తయారీ", "software kavali", "website cheyali"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "solutions-software",
          text: "మేము React, Next.js, Node.js, Python మరియు PostgreSQL ఉపయోగించి ఆధునిక వెబ్ అప్లికేషన్‌లు, స్కేలబుల్ SaaS ప్లాట్‌ఫారమ్‌లు మరియు ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్‌లను నిర్మిస్తాము.\n\nప్రతి ప్రాజెక్ట్ విశాఖపట్నంలోని మా డెడికేటెడ్ ఇంజనీరింగ్ పాడ్స్ ద్వారా 100% IP కోడ్ యాజమాన్యంతో డెలివరీ చేయబడుతుంది.\n\nమీ వద్ద ఏదైనా సాఫ్ట్‌వేర్ ప్రాజెక్ట్ లేదా ఐడియా ఉందా?",
          routes: [
            { label: "సాఫ్ట్‌వేర్ సొల్యూషన్స్", to: "/solutions/software-development" },
            { label: "ప్రాజెక్ట్‌లు చూడండి", to: "/projects" },
          ],
          lang: "te",
        };
      }
      return {
        topic: "solutions-software",
        text: "We engineer modern web applications, scalable SaaS platforms, and enterprise backend microservices using React, Next.js, Node.js, Python, and PostgreSQL.\n\nEvery project is delivered by dedicated agile pods in Vizag with full CI/CD automation and 100% IP ownership for you.\n\nDo you have a specific software project or architecture you'd like to discuss?",
        routes: [
          { label: "Software Solutions", to: "/solutions/software-development" },
          { label: "View Projects", to: "/projects" },
        ],
        lang: "en",
      };
    },
  },

  // 5. MOBILE APP DEVELOPMENT
  {
    id: "solutions-mobile",
    intents: [
      "mobile", "mobile app", "app development", "ios", "android", "react native", "flutter", "swift", "kotlin", "smartphone", "iphone app",
      "మొబైల్ యాప్", "మొబైల్ యాప్స్", "ఆండ్రాయిడ్ యాప్", "ఐఓఎస్ యాప్", "యాప్స్ తయారీ", "మొబైల్ అప్లికేషన్", "mobile app kavali"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "solutions-mobile",
          text: "మేము React Native, Flutter, Swift మరియు Kotlin ఉపయోగించి iOS మరియు Android కోసం హై-పెర్ఫార్మెన్స్ మొబైల్ యాప్‌లను నిర్మిస్తాము.\n\nమా యాప్‌లు స్మూత్ 60fps UI, ఆఫ్‌లైన్ డేటా సింక్, బయోమెట్రిక్ సెక్యూరిటీ మరియు ప్లే స్టోర్ / యాప్ స్టోర్ పబ్లిషింగ్‌ను కలిగి ఉంటాయి.\n\nమీరు iOS లేదా Android మొబైల్ యాప్‌ను నిర్మించాలనుకుంటున్నారా?",
          routes: [{ label: "మొబైల్ యాప్ సొల్యూషన్స్", to: "/solutions/mobile-development" }],
          lang: "te",
        };
      }
      return {
        topic: "solutions-mobile",
        text: "We build native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin.\n\nOur apps feature smooth 60fps UI, offline-first data caching, biometric authentication, and seamless App Store / Google Play publishing.\n\nAre you looking to build an iOS, Android, or cross-platform application?",
        routes: [{ label: "Mobile App Solutions", to: "/solutions/mobile-development" }],
        lang: "en",
      };
    },
  },

  // 6. DATA & ANALYTICS
  {
    id: "solutions-data",
    intents: [
      "data", "analytics", "database", "postgres", "sql", "bi", "reporting", "digital transformation", "modernization", "digital growth", "seo", "marketing",
      "డేటా", "డేటాబేస్", "అనలిటిక్స్", "డిజిటల్ గ్రోత్", "మార్కెటింగ్", "data analytics"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "solutions-data",
          text: "మేము లెగసీ సిస్టమ్‌లను ఆధునిక క్లౌడ్ ఆర్కిటెక్చర్‌లుగా మార్చడం, PostgreSQL డేటాబేస్‌లను ఆప్టిమైజ్ చేయడం మరియు రియల్-టైమ్ BI అనలిటిక్స్ డ్యాష్‌బోర్డ్‌లను రూపొందించడంలో కంపెనీలకు సహాయం చేస్తాము.\n\nమీరు డేటా & అనలిటిక్స్ లేదా డిజిటల్ ట్రాన్స్‌ఫర్మేషన్ సొల్యూషన్స్ గురించి తెలుసుకోవాలనుకుంటున్నారా?",
          routes: [
            { label: "డేటా & అనలిటిక్స్", to: "/solutions/data-analytics" },
            { label: "డిజిటల్ ట్రాన్స్‌ఫర్మేషన్", to: "/solutions/digital-transformation" },
          ],
          lang: "te",
        };
      }
      return {
        topic: "solutions-data",
        text: "We help companies modernize legacy systems into cloud-native architectures, optimize PostgreSQL databases, and build real-time BI analytics dashboards.\n\nWe also provide digital growth engineering — combining SEO, conversion architecture, and AI marketing tools.\n\nWould you like to explore our Data & Analytics or Digital Transformation solutions?",
        routes: [
          { label: "Data & Analytics", to: "/solutions/data-analytics" },
          { label: "Digital Transformation", to: "/solutions/digital-transformation" },
        ],
        lang: "en",
      };
    },
  },

  // 7. ALL SOLUTIONS GENERAL
  {
    id: "solutions-general",
    intents: [
      "solutions", "services", "what services", "what solutions", "what can you build", "capabilities", "tech stack",
      "సర్వీసులు", "పరిష్కారాలు", "సొల్యూషన్స్", "మీ సర్వీసులు ఏమిటి", "ఏం చేస్తారు", "services em unnayi"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "solutions-general",
          text: "మేము ఐదు ప్రధాన రంగాలలో ఎండ్-టు-ఎండ్ ఇంజనీరింగ్ సేవలను అందిస్తున్నాము:\n\n1. **సాఫ్ట్‌వేర్ & వెబ్ అప్లికేషన్లు** (React, Next.js, Node.js, Python)\n2. **మొబైల్ యాప్‌లు** (iOS, Android, React Native, Flutter)\n3. **AI & ప్రాసెస్ ఆటోమేషన్** (LLM Copilots, Document AI)\n4. **డేటా & అనలిటిక్స్** (PostgreSQL ఆర్కిటెక్చర్, BI పైప్‌లైన్స్)\n5. **డిజిటల్ గ్రోత్ & ట్రాన్స్‌ఫర్మేషన్**\n\nవీటిలో ఏ విభాగం గురించి మరింత తెలుసుకోవాలనుకుంటున్నారు?",
          routes: [{ label: "అన్ని సొల్యూషన్స్", to: "/solutions" }],
          lang: "te",
        };
      }
      return {
        topic: "solutions-general",
        text: "We offer end-to-end technology engineering across five core domains:\n\n1. **Software & Web Applications** (React, Next.js, Python, Node.js)\n2. **Mobile Apps** (iOS, Android, React Native, Flutter)\n3. **AI & Process Automation** (LLM Copilots, Document Intelligence, RPA)\n4. **Data & Analytics** (PostgreSQL Architecture, BI Pipelines)\n5. **Digital Growth & Transformation**\n\nWhich of these areas interests you most?",
        routes: [{ label: "Browse Solutions", to: "/solutions" }],
        lang: "en",
      };
    },
  },

  // 8. NEXERGY ACADEMY (Overview & Courses)
  {
    id: "academy",
    intents: [
      "academy", "courses", "course", "training", "learn", "study", "bootcamp", "student", "syllabus", "admission", "batches", "classes",
      "కోర్సులు", "కోర్సు", "నేర్చుకోవాలి", "ట్రైనింగ్", "అకాడమీ", "తరగతులు", "క్లాసెస్", "సిలబస్", "అడ్మిషన్లు", "కోర్సులు ఏమున్నాయి", "ఏ కోర్సులు ఉన్నాయి", "ట్రైనింగ్ వివరాలు", "courses em unnayi", "courses cheppu"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "academy",
          text: "Nexergy Academy అనేది విశాఖపట్నంలో మా ఇంజనీరింగ్ టాలెంట్ యాక్సిలరేషన్ ఎకోసిస్టమ్. మేము లైవ్ ప్రాజెక్ట్‌లతో కూడిన మెంటార్-లెడ్ కోర్సులను అందిస్తున్నాము:\n\n• **సైబర్ సెక్యూరిటీ & ఎథికల్ హ్యాకింగ్** (16 వారాలు, ప్రాక్టికల్ CTF ల్యాబ్‌లు)\n• **PostgreSQL డేటాబేస్ మాస్టరీ** (డీప్ SQL & ఇండెక్సింగ్ ఆర్కిటెక్చర్)\n• **ఫౌండేషన్ ప్రోగ్రామ్** (పైథాన్, SQL, క్లౌడ్ & AI బిగినర్స్ కోసం)\n• **AI టూల్స్ & డిజిటల్ మార్కెటింగ్**\n\nమీరు ఏ కోర్సు వివరాలు తెలుసుకోవాలనుకుంటున్నారు?",
          routes: [
            { label: "అన్ని కోర్సులు చూడండి", to: "/academy/courses" },
            { label: "ఫౌండేషన్ ప్రోగ్రామ్", to: "/academy/foundation-program" },
          ],
          lang: "te",
        };
      }
      return {
        topic: "academy",
        text: "Nexergy Academy is our talent acceleration ecosystem in Visakhapatnam. We offer hands-on, mentor-led programs designed by working engineers:\n\n• **Cyber Security & Ethical Hacking** (16 weeks, hands-on CTF labs)\n• **PostgreSQL Database Mastery** (Deep SQL & indexing architecture)\n• **Foundation Program** (Python, SQL, Cloud & AI for beginners)\n• **AI Tools & Digital Marketing**\n\nWhich program would you like to explore?",
        routes: [
          { label: "Explore All Courses", to: "/academy/courses" },
          { label: "Foundation Program", to: "/academy/foundation-program" },
        ],
        lang: "en",
      };
    },
  },

  // 9. CYBER SECURITY COURSE
  {
    id: "academy-cyber",
    intents: [
      "cyber security", "ethical hacking", "hacking", "security course", "pentest", "penetration testing", "wireshark", "burp suite", "metasploit", "infosec", "kali linux",
      "సైబర్ సెక్యూరిటీ", "ఎథికల్ హ్యాకింగ్", "హ్యాకింగ్", "హ్యాకింగ్ కోర్స్", "సైబర్ సెక్యూరిటీ కోర్స్", "సెక్యూరిటీ ట్రైనింగ్"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "academy-cyber",
          text: "మా **సైబర్ సెక్యూరిటీ & ఎథికల్ హ్యాకింగ్** ప్రోగ్రామ్ 16 వారాల ఇంటెన్సివ్ బూట్‌క్యాంప్. ఇందులో రియల్ అటాక్ & డిఫెన్స్ మెథడాలజీలను ప్రాక్టికల్‌గా నేర్పిస్తాము.\n\nLinux హార్డెనింగ్, నెట్‌వర్క్ స్కానింగ్ (Nmap, Wireshark), వెబ్ యాప్ వల్నరబిలిటీస్ (OWASP Top 10), Metasploit మరియు లైవ్ CTF ల్యాబ్‌లలో శిక్షణ ఉంటుంది.\n\nసిలబస్ లేదా రాబోయే బ్యాచ్ తేదీలు చూడాలనుకుంటున్నారా?",
          routes: [{ label: "సైబర్ సెక్యూరిటీ కోర్స్", to: "/academy/cyber-security" }],
          lang: "te",
        };
      }
      return {
        topic: "academy-cyber",
        text: "Our **Cyber Security & Ethical Hacking** program is a 16-week intensive bootcamp where you learn real attack & defense methodologies.\n\nYou'll get hands-on experience with Linux hardening, network scanning (Nmap, Wireshark), web app vulnerabilities (OWASP Top 10), Metasploit, and live CTF labs.\n\nWould you like details on the curriculum or upcoming batch schedule?",
        routes: [{ label: "Cyber Security Course", to: "/academy/cyber-security" }],
        lang: "en",
      };
    },
  },

  // 10. POSTGRESQL COURSE
  {
    id: "academy-postgres",
    intents: [
      "postgresql", "postgres", "sql course", "database course", "query optimization", "indexing", "dba",
      "పోస్ట్‌గ్రెస్‌", "డేటాబేస్ కోర్స్", "sql కోర్స్", "postgres కోర్స్"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "academy-postgres",
          text: "మా **PostgreSQL డేటాబేస్ మాస్టరీ** ప్రోగ్రామ్ ఎంటర్‌ప్రైజ్ డేటాబేస్ ఇంజనీరింగ్‌పై డీప్ ట్రైనింగ్ అందిస్తుంది.\n\nఇందులో స్కీమా డిజైన్, అడ్వాన్స్‌డ్ విండో ఫంక్షన్స్, క్వెరీ ఎగ్జిక్యూషన్ ప్లానింగ్ (EXPLAIN ANALYZE), ఇండెక్స్ ట్యూనింగ్ (B-Tree, GIN, BRIN) మరియు హై-అవైలబిలిటీ రెప్లికేషన్ ఉంటాయి.\n\nకోర్సు సిలబస్ చూడాలనుకుంటున్నారా?",
          routes: [{ label: "PostgreSQL ప్రోగ్రామ్", to: "/academy/postgresql-mastery" }],
          lang: "te",
        };
      }
      return {
        topic: "academy-postgres",
        text: "Our **PostgreSQL Database Mastery** program goes deep into enterprise database engineering.\n\nIt covers schema design, advanced window functions, query execution planning (EXPLAIN ANALYZE), index tuning (B-Tree, GIN, BRIN), MVCC concurrency, and high-availability replication.\n\nWould you like to see the course syllabus?",
        routes: [{ label: "PostgreSQL Program", to: "/academy/postgresql-mastery" }],
        lang: "en",
      };
    },
  },

  // 11. ACADEMY FEES & ADMISSIONS
  {
    id: "academy-fees",
    intents: [
      "fee", "fees", "cost", "price", "pricing", "how much", "batch", "schedule", "placement", "certificate", "duration",
      "ఫీజు", "ఫీజులు", "ఖర్చు", "ధర", "ఫీజు ఎంత", "ఫీజు వివరాలు", "బ్యాచ్ ఎప్పుడు", "సర్టిఫికెట్", "ప్లేస్‌మెంట్", "డ్యూరేషన్ ఎంత", "కోర్స్ ఫీజు ఎంత", "fee entha", "fees details"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "academy-fees",
          text: "మా అకాడమీ ప్రోగ్రామ్‌లు 1-ఆన్-1 ఇంజనీరింగ్ మెంటార్‌షిప్ మరియు GK Nexergy పాడ్స్‌లో డైరెక్ట్ ప్లేస్‌మెంట్ అవకాశాలతో **8 నుండి 16 వారాలు** నడుస్తాయి.\n\nఫీజులు కోర్సును బట్టి అందుబాటులో ఉంటాయి మరియు సులభమైన వాయిదాల (EMI) సదుపాయం ఉంది.\n\nతదుపరి బ్యాచ్ తేదీలు మరియు ఖచ్చితమైన ఫీజు వివరాల కోసం అడ్మిషన్ల టీమ్‌తో WhatsAppలో మాట్లాడాలనుకుంటున్నారా?",
          routes: [
            { label: "💬 WhatsAppలో మాట్లాడండి", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20to%20know%20the%20fee%20structure%20and%20next%20batch%20dates.", external: true },
            { label: "అడ్మిషన్లను సంప్రదించండి", to: "/contact" },
          ],
          lang: "te",
        };
      }
      return {
        topic: "academy-fees",
        text: "Our academy programs run for **8 to 16 weeks** in hybrid and online formats with 1-on-1 engineering mentorship and direct placement opportunities into GK Nexergy pods.\n\nFees are competitive and vary by course with flexible payment options available.\n\nWould you like to connect with admissions on WhatsApp to get the exact fee schedule for the next cohort?",
        routes: [
          { label: "💬 Chat on WhatsApp", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20to%20know%20the%20fee%20structure%20and%20next%20batch%20dates.", external: true },
          { label: "Contact Admissions", to: "/contact" },
        ],
        lang: "en",
      };
    },
  },

  // 12. DELIVERED PROJECTS & CASE STUDIES
  {
    id: "projects",
    intents: [
      "project", "projects", "case study", "case studies", "portfolio", "clients", "work", "examples", "hospital", "real estate", "ecommerce",
      "ప్రాజెక్ట్‌లు", "ప్రాజెక్ట్స్", "కేస్ స్టడీస్", "క్లయింట్లు", "మీ ప్రాజెక్ట్‌లు ఏమిటి", "చేసిన ప్రాజెక్టులు", "projects cheppu"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "projects",
          text: "మేము డెలివరీ చేసిన ప్రముఖ ఎంటర్‌ప్రైజ్ ప్లాట్‌ఫారమ్‌లు:\n\n• **AI హాస్పిటల్ మేనేజ్‌మెంట్**: క్లినికల్ వెయిటింగ్ సమయాన్ని 40% తగ్గించిన HIPAA-కంప్లైంట్ EHR.\n• **AI రియల్ ఎస్టేట్ డిస్కవరీ**: ఆటోమేటెడ్ ప్రాపర్టీ వాల్యుయేషన్ మరియు 3.2x లీడ్ కన్వర్షన్.\n• **NutriBest ఇ-కామర్స్**: 99.98% అప్‌టైమ్‌తో హై-స్పీడ్ గ్లోబల్ స్టోర్.\n\nమా పూర్తి కేస్ స్టడీలను చూడాలనుకుంటున్నారా?",
          routes: [{ label: "కేస్ స్టడీస్ చూడండి", to: "/projects" }],
          lang: "te",
        };
      }
      return {
        topic: "projects",
        text: "We've delivered several notable enterprise platforms, including:\n\n• **AI Hospital Management Platform**: Reduced clinical triage and patient wait times by 40% with HIPAA-compliant EHR.\n• **AI Real Estate Discovery**: Automated property valuation and spatial analytics with 3.2x lead conversion.\n• **NutriBest E-Commerce**: High-throughput global store with 99.98% flash-sale uptime.\n\nWould you like to look at our detailed case studies?",
        routes: [{ label: "View Case Studies", to: "/projects" }],
        lang: "en",
      };
    },
  },

  // 13. CAREERS & HIRING
  {
    id: "careers",
    intents: [
      "career", "careers", "job", "jobs", "hiring", "work with us", "openings", "vizag jobs", "visakhapatnam jobs", "apply", "internship", "internships", "developer job",
      "ఉద్యోగాలు", "జాబ్స్", "హైరింగ్", "కెరీర్స్", "విశాఖపట్నం ఉద్యోగాలు", "ఖాళీలు", "జాబ్ అప్లై", "jobs unnaya"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "careers",
          text: "మేము విశాఖపట్నంలో టాలెంటెడ్ ఇంజనీర్ల కోసం చూస్తున్నాము!\n\nప్రస్తుత ఉద్యోగ అవకాశాలు:\n• Full-Stack Developers (React & Node.js / Python)\n• AI & Machine Learning Engineers\n• PostgreSQL Database Engineers\n• Cyber Security Analysts\n\nవిశాఖపట్నంలోని అటానమస్ పాడ్స్‌లో డైరెక్ట్ ప్రొడక్ట్ ఓనర్‌షిప్‌తో పనిచేయడానికి ఆసక్తి ఉందా?",
          routes: [{ label: "కెరీర్స్ చూడండి & అప్లై చేయండి", to: "/careers" }],
          lang: "te",
        };
      }
      return {
        topic: "careers",
        text: "We're always looking for talented engineers in **Visakhapatnam**!\n\nCurrent active roles include:\n• Full-Stack Developers (React & Node.js / Python)\n• AI & Machine Learning Engineers\n• PostgreSQL Database Engineers\n• Cyber Security Analysts\n\nWe offer direct product ownership in autonomous pods with transparent growth paths.",
        routes: [{ label: "View Careers & Apply", to: "/careers" }],
        lang: "en",
      };
    },
  },

  // 14. CONTACT & LIVE REACH
  {
    id: "contact",
    intents: [
      "contact", "phone", "call", "whatsapp", "email", "reach", "location", "address", "office", "talk to human", "book call", "consultation", "visakhapatnam", "vizag",
      "సంప్రదించండి", "ఫోన్ నెంబర్", "ఫోన్", "వాట్సాప్", "ఈమెయిల్", "ఆఫీస్ ఎక్కడ", "వైజాగ్ ఆఫీస్", "విశాఖపట్నం", "కాంటాక్ట్ నెంబర్", "మాట్లాడాలి", "contact details", "phone number"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "contact",
          text: "మీరు మా ఇంజనీరింగ్ బృందాన్ని ఎప్పుడైనా నేరుగా సంప్రదించవచ్చు:\n\n• **డైరెక్ట్ ఫోన్**: [+91 9704585960](tel:+919704585960)\n• **WhatsApp**: [మాతో WhatsAppలో మాట్లాడండి](https://wa.me/919704585960?text=Hi%20GK%20Nexergy)\n• **ఈమెయిల్**: [contact@gknexergy.com](mailto:contact@gknexergy.com)\n• **ఆఫీస్**: విశాఖపట్నం (వైజాగ్), ఆంధ్రప్రదేశ్, భారతదేశం\n• **పనివేళలు**: సోమ – శని: ఉదయం 9:00 – రాత్రి 7:00 IST\n\nవిచారణలకు **10 నిమిషాల్లో** ప్రతిస్పందన లభిస్తుంది.",
          routes: [
            { label: "💬 WhatsAppలో మాట్లాడండి", to: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy", external: true },
            { label: "కన్సల్టేషన్ బుక్ చేయండి", to: "/contact" },
          ],
          lang: "te",
        };
      }
      return {
        topic: "contact",
        text: "You can reach our team directly at any time:\n\n• **Direct Phone**: [+91 9704585960](tel:+919704585960)\n• **WhatsApp**: [Chat with us directly](https://wa.me/919704585960?text=Hi%20GK%20Nexergy)\n• **Email**: [contact@gknexergy.com](mailto:contact@gknexergy.com)\n• **Office**: Visakhapatnam (Vizag), Andhra Pradesh, India\n• **Hours**: Mon – Sat: 9:00 AM – 7:00 PM IST\n\nInquiries receive an engineering response within **10 minutes**.",
        routes: [
          { label: "💬 Chat on WhatsApp", to: "https://wa.me/919704585960?text=Hi%20GK%20Nexergy", external: true },
          { label: "Book Consultation", to: "/contact" },
        ],
        lang: "en",
      };
    },
  },

  // 15. WHY GK NEXERGY / ADVANTAGES
  {
    id: "why-us",
    intents: [
      "why gk", "why choose", "why nexergy", "differentiators", "advantage", "ip ownership", "why should i hire", "guarantee",
      "ఎందుకు gk nexergy", "ఎందుకు ఎంచుకోవాలి", "లాభాలు ఏమిటి", "enduku gk nexergy"
    ],
    handler: (query, context, isTelugu, isHindi) => {
      if (isTelugu) {
        return {
          topic: "why-us",
          text: "క్లయింట్లు GK Nexergy ని ఎంచుకోవడానికి ప్రధాన కారణాలు:\n\n1. **100% IP & కోడ్ యాజమాన్యం**: మీరు మొదటి రోజు నుండే ప్రతి కోడ్ లైన్ మరియు డేటాబేస్ స్కీమాను పూర్తిగా కలిగి ఉంటారు.\n2. **అటానమస్ ఎజైల్ పాడ్స్**: విశాఖపట్నంలోని డెడికేటెడ్ ఇంజనీరింగ్ బృందాలు వేగంగా డెలివరీ చేస్తాయి.\n3. **టాలెంట్ నాణ్యత**: Nexergy Academy ద్వారా నిరంతరం శిక్షణ పొందిన ఉత్తమ ఇంజనీరింగ్ బెంచ్.\n\nమీరు 30 నిమిషాల ఉచిత కాల్‌ను షెడ్యూల్ చేయాలనుకుంటున్నారా?",
          routes: [{ label: "కన్సల్టేషన్ కాల్ బుక్ చేయండి", to: "/contact" }],
          lang: "te",
        };
      }
      return {
        topic: "why-us",
        text: "Clients partner with GK Nexergy for three core reasons:\n\n1. **100% IP & Code Ownership**: You own every line of code and database schema from day one.\n2. **Autonomous Agile Pods**: Dedicated full-stack teams in Vizag that build fast without agency bureaucracy.\n3. **Talent Quality**: Direct integration with Nexergy Academy gives us a strong, continuously trained engineering bench.\n\nWould you like to schedule a quick 30-minute discovery call?",
        routes: [{ label: "Book Discovery Call", to: "/contact" }],
        lang: "en",
      };
    },
  },
];

/**
 * Intelligent Navigation Intent Detector
 */
export function detectNavigationIntent(query) {
  const q = query.toLowerCase().trim();

  const navPatterns = [
    { match: ["home", "homepage"], to: "/home", label: "Home" },
    { match: ["about", "story", "leadership", "vision", "mission"], to: "/about", label: "About Us" },
    { match: ["why gk", "why nexergy", "why choose"], to: "/why-gk-nexergy", label: "Why GK Nexergy" },
    { match: ["solutions", "all solutions", "services"], to: "/solutions", label: "Enterprise Solutions" },
    { match: ["software development", "web development"], to: "/solutions/software-development", label: "Software Solutions" },
    { match: ["mobile app", "ios", "android"], to: "/solutions/mobile-development", label: "Mobile Solutions" },
    { match: ["ai automation", "ai solutions"], to: "/solutions/ai-automation", label: "AI & Automation" },
    { match: ["data analytics"], to: "/solutions/data-analytics", label: "Data & Analytics" },
    { match: ["digital transformation"], to: "/solutions/digital-transformation", label: "Digital Transformation" },
    { match: ["digital growth"], to: "/solutions/digital-growth", label: "Digital Growth" },
    { match: ["academy", "courses", "all courses"], to: "/academy/courses", label: "Academy Courses" },
    { match: ["cyber security", "ethical hacking"], to: "/academy/cyber-security", label: "Cyber Security Course" },
    { match: ["postgresql", "postgres"], to: "/academy/postgresql-mastery", label: "PostgreSQL Mastery" },
    { match: ["foundation program"], to: "/academy/foundation-program", label: "Foundation Program" },
    { match: ["projects", "case studies", "portfolio"], to: "/projects", label: "Client Projects" },
    { match: ["careers", "jobs", "hiring"], to: "/careers", label: "Careers" },
    { match: ["contact", "book consultation", "consultation"], to: "/contact", label: "Contact Us" },
  ];

  for (const item of navPatterns) {
    for (const kw of item.match) {
      if (q.includes(kw)) {
        if (
          q.startsWith("go to") ||
          q.startsWith("navigate") ||
          q.startsWith("open") ||
          q.startsWith("take me") ||
          q.startsWith("show me") ||
          q === kw
        ) {
          return { isDirectNav: true, ...item };
        }
      }
    }
  }

  return null;
}

/**
 * Advanced Multi-Turn Conversational Intent Matcher with Guaranteed Language Integrity
 */
export function queryLocalKnowledgeBase(query, context = {}) {
  const q = query.toLowerCase().trim();
  const activeTopic = context?.activeTopic || "";
  
  // Strict Language Determination
  const detectedLang = detectLanguage(query);
  const isTelugu = context?.language === "te" || detectedLang === "te";
  const isHindi = context?.language === "hi" || detectedLang === "hi";

  // Unicode-safe word tokenizer (preserves Telugu, Hindi, Tamil, Kannada, etc.)
  const words = q.replace(/[^\p{Letter}\p{Mark}\p{Number}\s]/gu, " ").split(/\s+/).filter(Boolean);

  // 1. Contextual Follow-up Detection
  if (
    q === "yes" ||
    q === "yeah" ||
    q === "sure" ||
    q === "yep" ||
    q.includes("tell me more") ||
    q.includes("more details") ||
    q.includes("explain more") ||
    q.includes("how does it work") ||
    q.includes("ఇంకా చెప్పు") ||
    q.includes("మరిన్ని వివరాలు") ||
    q.includes("inka cheppu")
  ) {
    if (activeTopic === "solutions-ai") {
      return {
        topic: "solutions-ai",
        text: isTelugu
          ? "ఖచ్చితంగా! AI వర్క్‌ఫ్లోల కోసం మీ టీమ్‌కు ఎక్కడ ఎక్కువ సమయం పడుతుందో అర్థం చేసుకోవడానికి 30 నిమిషాల ఉచిత కన్సల్టేషన్ కాల్‌తో ప్రారంభిస్తాము.\n\nమీరు ఉచిత ఆర్కిటెక్చరల్ కన్సల్టేషన్‌ను షెడ్యూల్ చేయాలనుకుంటున్నారా?"
          : "Sure! For AI workflows, we typically start with a 30-minute discovery call to map out where your team spends manual time.\n\nFrom there, we build custom copilots, RAG document search systems, or automated triage bots that connect to your existing tools.\n\nWould you like to schedule a free 30-minute architectural consultation?",
        routes: [{ label: isTelugu ? "ఉచిత కన్సల్టేషన్ బుక్ చేయండి" : "Book Free Consultation", to: "/contact" }],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
    if (activeTopic === "academy" || activeTopic.startsWith("academy-")) {
      return {
        topic: "academy",
        text: isTelugu
          ? "మా అకాడమీ కోర్సులు లైవ్ ప్రాజెక్ట్‌లు మరియు రియల్ కోడ్ రివ్యూలతో ఇంజనీర్ల ద్వారా నడపబడతాయి.\n\nవిద్యార్థులు వాస్తవ ప్రొడక్షన్ దృశ్యాలలో పనిచేస్తారు.\n\nమీరు కోర్సు సిలబస్ చూడాలనుకుంటున్నారా లేదా మా అడ్మిషన్ల టీమ్‌తో WhatsAppలో మాట్లాడాలనుకుంటున్నారా?"
          : "Our academy cohorts are mentor-led with live project sprints and real-world code reviews.\n\nStudents work on actual production scenarios (like writing database migrations or conducting penetration testing in isolated sandbox labs).\n\nWould you like to see all current course syllabi or talk to our admissions team on WhatsApp?",
        routes: [
          { label: isTelugu ? "💬 WhatsAppలో మాట్లాడండి" : "💬 Inquire on WhatsApp", to: "https://wa.me/919704585960?text=Hi%2C%20I%20would%20like%20more%20details%20about%20Nexergy%20Academy", external: true },
          { label: isTelugu ? "అన్ని కోర్సులు" : "View All Courses", to: "/academy/courses" },
        ],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
    if (activeTopic === "solutions-software" || activeTopic === "solutions-mobile") {
      return {
        topic: activeTopic,
        text: isTelugu
          ? "మా డెలివరీ పాడ్స్ 2 వారాల చురుకైన స్ప్రింట్‌లలో పనిచేస్తాయి. ప్రతి స్ప్రింట్ తర్వాత స్టేజింగ్ ప్రివ్యూ లింక్‌లు మరియు గిట్ రిపోజిటరీ యాక్సెస్ అందించబడుతుంది.\n\nమీరు మీ ప్రాజెక్ట్ అవసరాలను ఇంజనీరింగ్ లీడ్‌తో చర్చించాలనుకుంటున్నారా?"
          : "Our delivery pods work in 2-week agile sprints. You receive staging preview links after every sprint with full access to the Git repository.\n\nWe also provide continuous QA testing, automated deployment pipelines, and post-launch SLA support.\n\nWould you like to discuss your project requirements with an engineering lead?",
        routes: [{ label: isTelugu ? "ప్రాజెక్ట్ చర్చించండి" : "Discuss Your Project", to: "/contact" }],
        confidence: "high",
        lang: isTelugu ? "te" : "en",
      };
    }
  }

  // 2. Score Matcher
  let bestMatch = null;
  let highestScore = 0;

  const STOP_WORDS = new Set(["about", "tell", "more", "what", "does", "you", "your", "can", "how", "with", "this", "that", "the", "and", "for", "are", "గురించి", "చెప్పు", "ఏమిటి", "ఎలా", "cheppu", "gurinchi"]);
  const domainWords = words.filter(w => !STOP_WORDS.has(w));

  for (const item of CONVERSATIONAL_TOPICS) {
    let score = 0;

    for (const intent of item.intents) {
      const intentLower = intent.toLowerCase();
      if (q === intentLower) {
        score += 50;
      } else if (q.includes(intentLower) && intentLower.length > 2) {
        score += 30 + Math.min(intentLower.length, 10);
      } else {
        for (const word of domainWords) {
          if (intentLower === word) {
            score += 15;
          } else if (word.length >= 3 && intentLower.includes(word)) {
            score += 10;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 5) {
    const result = bestMatch.handler(query, context, isTelugu, isHindi);
    return {
      ...result,
      confidence: "high",
      lang: isTelugu ? "te" : isHindi ? "hi" : "en",
    };
  }

  // 3. Fallback to Full Site Indexed Corpus
  const corpusMatches = searchSiteCorpus(q, 1);
  if (corpusMatches && corpusMatches.length > 0) {
    const top = corpusMatches[0];
    const corpusContent = top.content.split("\n\n").slice(0, 2).join("\n\n");
    return {
      topic: "corpus",
      text: corpusContent,
      routes: [{ label: `Explore ${top.title.split(":")[0]}`, to: top.route }],
      confidence: "corpus",
      lang: "en",
    };
  }

  // 4. Natural Contextual Fallback
  if (isTelugu) {
    return {
      topic: "fallback",
      text: "నేను మీకు ఖచ్చితమైన సమాధానం ఇవ్వాలనుకుంటున్నాను. GK Nexergy **ఎంటర్‌ప్రైజ్ టెక్నాలజీ సొల్యూషన్స్** (సాఫ్ట్‌వేర్, మొబైల్ యాప్‌లు, AI & ఆటోమేషన్) మరియు **Nexergy Academy** (సైబర్ సెక్యూరిటీ, PostgreSQL, ఫౌండేషన్ ప్రోగ్రామ్) లను అందిస్తుంది.\n\nమీరు సాఫ్ట్‌వేర్ నిర్మించాలనుకుంటున్నారా, అకాడమీ కోర్సులు నేర్చుకోవాలనుకుంటున్నారా లేదా కెరీర్ అవకాశాలు చూడాలనుకుంటున్నారా?",
      routes: [
        { label: "సొల్యూషన్స్ చూడండి", to: "/solutions" },
        { label: "Nexergy Academy", to: "/academy" },
      ],
      confidence: "fallback",
      lang: "te",
    };
  }

  return {
    topic: "fallback",
    text: "I want to make sure I give you the best answer. GK Nexergy specializes in **Enterprise Technology Solutions** (Software, Mobile Apps, AI & Automation, Data) and **Nexergy Academy** (Cyber Security, PostgreSQL, Foundation Program).\n\nCould you clarify if you're interested in building a solution, training at the academy, or exploring careers?",
    routes: [
      { label: "Explore Solutions", to: "/solutions" },
      { label: "Nexergy Academy", to: "/academy" },
    ],
    confidence: "fallback",
    lang: "en",
  };
}

/**
 * Hybrid AI Query Dispatcher with Strict Language Integrity
 */
export async function askGKChatbot(queryText, customApiKey = "", context = {}) {
  const trimmed = queryText.trim();
  if (!trimmed) return null;

  // Strict language detection
  const detectedLang = detectLanguage(trimmed);
  const requestedLang = (context?.language && context.language !== "auto") ? context.language : detectedLang;
  const isTelugu = requestedLang === "te" || detectedLang === "te";
  const isHindi = requestedLang === "hi" || detectedLang === "hi";
  const finalLang = isTelugu ? "te" : isHindi ? "hi" : "en";

  // 1. Direct navigation check
  const navIntent = detectNavigationIntent(trimmed);
  if (navIntent && navIntent.isDirectNav) {
    let navText = isTelugu
      ? `మిమ్మల్ని నేరుగా **${navIntent.label}** పేజీకి తీసుకువెళుతున్నాము...`
      : isHindi
      ? `आपको सीधे **${navIntent.label}** पेज पर ले जा रहे हैं...`
      : `Taking you directly to **${navIntent.label}**...`;

    return {
      topic: "nav",
      text: navText,
      routes: [{ label: isTelugu ? `${navIntent.label} తెరవండి` : `Open ${navIntent.label}`, to: navIntent.to, primary: true }],
      navTarget: navIntent.to,
      isNavigation: true,
      lang: finalLang,
    };
  }

  // 2. OpenAI API Integration (if configured)
  const apiKey = customApiKey || (typeof import.meta !== "undefined" && import.meta.env?.VITE_OPENAI_API_KEY) || "";

  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      const topDocs = searchSiteCorpus(trimmed, 3);
      const corpusContextStr = topDocs.map(d => `[${d.title}]\n${d.content}`).join("\n\n");

      const conversationHistory = (context.history || []).slice(-6).map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const multilingualInstruction = isTelugu
        ? `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in TELUGU. You MUST reply completely and naturally in TELUGU (తెలుగు) script while maintaining all GK Nexergy facts, phone (+91 9704585960), and markdown formatting.`
        : isHindi
        ? `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in HINDI. You MUST reply completely and naturally in HINDI (हिन्दी) script.`
        : `\n\nCRITICAL LANGUAGE INSTRUCTION: The user is speaking in ENGLISH. You MUST reply in English.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `${GK_SYSTEM_PROMPT}\n\nSite Ground Truth:\n${corpusContextStr}${multilingualInstruction}`,
            },
            ...conversationHistory,
            { role: "user", content: trimmed },
          ],
          temperature: 0.5,
          max_tokens: 350,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content || "";
        const localMatch = queryLocalKnowledgeBase(trimmed, { ...context, language: finalLang });

        return {
          topic: localMatch.topic || "general",
          text: aiReply,
          routes: (localMatch.routes || []).slice(0, 2),
          source: "openai",
          lang: finalLang,
        };
      }
    } catch (err) {
      console.warn("OpenAI fallback to local knowledge:", err);
    }
  }

  // 3. Local conversational engine with Guaranteed Exact Language Output
  const localMatch = queryLocalKnowledgeBase(trimmed, {
    ...context,
    language: finalLang,
  });

  let finalResponseText = localMatch.text;

  // If user spoke in Telugu/Hindi, ensure text is in Telugu/Hindi
  if (isTelugu && !/[\u0C00-\u0C7F]/.test(finalResponseText)) {
    try {
      const { translatedText } = await translateText(finalResponseText, "te", "en");
      if (translatedText && translatedText.trim()) {
        finalResponseText = translatedText;
      }
    } catch (e) {}
  } else if (isHindi && !/[\u0900-\u097F]/.test(finalResponseText)) {
    try {
      const { translatedText } = await translateText(finalResponseText, "hi", "en");
      if (translatedText && translatedText.trim()) {
        finalResponseText = translatedText;
      }
    } catch (e) {}
  }

  return {
    ...localMatch,
    text: finalResponseText,
    source: "local-engine",
    lang: finalLang,
  };
}
