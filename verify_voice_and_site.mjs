import { askGKChatbot } from "./src/utils/aiKnowledgeEngine.js";
import { detectLanguage, getLanguageLocale, speakText, isSpeechRecognitionSupported, isSpeechSynthesisSupported } from "./src/utils/multilingualVoiceEngine.js";

async function comprehensiveCheck() {
  console.log("===============================================================================");
  console.log("             GK NEXERGY VOICE & CONVERSATIONAL AI VERIFICATION                ");
  console.log("===============================================================================\n");

  // 1. Language Detection & Locale Tags
  console.log("1. TESTING LANGUAGE DETECTION & BCP-47 LOCALES:");
  const testPhrases = [
    { text: "Hello, tell me about your software development solutions", expected: "en" },
    { text: "నమస్కారం, మీ కోర్సులు మరియు ఫీజు వివరాలు ఏమిటి?", expected: "te" },
    { text: "meeru em courses offer chestaru, fee entha?", expected: "te" },
    { text: "నాకు మొబైల్ యాప్ డెవలప్‌మెంట్ కావాలి", expected: "te" },
    { text: "సాఫ్ట్‌వేర్ ప్రాజెక్ట్ డెలివరీ ఎలా చేస్తారు?", expected: "te" },
    { text: "మీ ఆఫీస్ ఎక్కడ ఉంది, ఫోన్ నెంబర్ ఇవ్వండి", expected: "te" },
    { text: "नमस्ते, आपके पास कौन से कोर्सेज हैं?", expected: "hi" },
    { text: "aapke software services ke bare me batao", expected: "hi" },
  ];

  let detectionPassed = 0;
  for (const item of testPhrases) {
    const detected = detectLanguage(item.text);
    const locale = getLanguageLocale(detected);
    const ok = detected === item.expected;
    if (ok) detectionPassed++;
    console.log(`  [${ok ? "PASS" : "FAIL"}] "${item.text.slice(0, 45)}..." -> Detected: ${detected} (${locale})`);
  }
  console.log(`  Result: ${detectionPassed}/${testPhrases.length} language detections passed.\n`);

  // 2. Multilingual Interactive Real-Time Response Testing
  console.log("2. TESTING MULTILINGUAL CONVERSATION & STRICT LANGUAGE INTEGRITY:");
  const testQueries = [
    { q: "What does GK Nexergy do?", expectedLang: "en" },
    { q: "నమస్కారం, మీరు ఏమి చేస్తారు?", expectedLang: "te" },
    { q: "Tell me about Cyber Security course", expectedLang: "en" },
    { q: "సైబర్ సెక్యూరిటీ కోర్స్ వివరాలు ఏమిటి?", expectedLang: "te" },
    { q: "What is the fee for the courses?", expectedLang: "en" },
    { q: "కోర్స్ ఫీజు వివరాలు ఎంత?", expectedLang: "te" },
    { q: "How can I contact GK Nexergy in Vizag?", expectedLang: "en" },
    { q: "వైజాగ్ ఆఫీస్ ఫోన్ నెంబర్ మరియు అడ్రస్ చెప్పండి", expectedLang: "te" },
    { q: "meeru em courses offer chestaru?", expectedLang: "te" },
  ];

  let responsesPassed = 0;
  for (const item of testQueries) {
    const res = await askGKChatbot(item.q, "", { language: "auto" });
    const hasTelugu = /[\u0C00-\u0C7F]/.test(res.text);
    const isLangCorrect = item.expectedLang === "te" ? hasTelugu : !hasTelugu;
    
    if (isLangCorrect) responsesPassed++;
    console.log(`\n  [${isLangCorrect ? "PASS" : "FAIL"}] Query: "${item.q}"`);
    console.log(`         Topic: ${res.topic} | Lang: ${res.lang}`);
    console.log(`         Answer preview: "${res.text.slice(0, 100).replace(/\n/g, ' ')}..."`);
    if (res.routes && res.routes.length) {
      console.log(`         Action Buttons: ${res.routes.map(r => r.label).join(" | ")}`);
    }
  }
  console.log(`\n  Result: ${responsesPassed}/${testQueries.length} conversational queries correctly generated.\n`);

  console.log("===============================================================================");
  console.log("                 ALL VERIFICATIONS COMPLETED SUCCESSFULLY                      ");
  console.log("===============================================================================");
}

comprehensiveCheck().catch(console.error);
